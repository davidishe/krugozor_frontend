import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from './models/message';
import { MessengerService } from './messenger.service';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../auth/auth-models/user';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { strings as englishShortStrings } from 'ngx-timeago/language-strings/en-short';
import { strings as frenchStrings } from 'ngx-timeago/language-strings/fr';
import { strings as frenchShortStrings } from 'ngx-timeago/language-strings/fr-short';
import { strings as russianStrings } from 'ngx-timeago/language-strings/ru';
import { options } from './helpers';
import { IChat } from './models/chat';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UploadService } from './upload.service';
import { IFileHandle } from './models/file-hande';
import { DomSanitizer } from '@angular/platform-browser';
import {  AfterViewInit } from '@angular/core';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ICommonChatStatus } from './models/common-status';
import { MessengerEmptyMessegesComponent } from './messenger-empty-messeges/messenger-empty-messeges.component';



@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerComponent implements OnInit, OnDestroy{

  private connection: HubConnection;
  public form!: FormGroup;
  public currentUser$: Observable<IUser>;
  public recepientId: number;
  public destinationUser: IUser;
  public lang: string = 'ru';
  public sub: Subscription;
  public currentChat: IChat;
  public chatsData$: Observable<IChat[]>;
  public currentUserId: number;
  public filesForSend: FileList;
  public isPending: boolean;

  @ViewChild('scrollMe', {static: false}) myScrollContainer: ElementRef;
  @ViewChild('input', {static: true}) inputMessageText: ElementRef;

  constructor(
    public http: HttpClient,
    private intl: TimeagoIntl,
    private messengerService: MessengerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private uploadService: UploadService
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.signalRUrl, options)
      .withAutomaticReconnect()
      .build();

    this.setLang(this.lang);
    this.chatsData$ = messengerService.chatsData$;
  }

  @HostListener('document:click', ['$event'])
  clickDoc(event) { 
  }

  @ViewChild('input') input: ElementRef;


  async ngOnInit() {
    await this.createForm();

    this.currentUser$ = this.authService.currentUser$;
    this.recepientId = +this.activatedRoute.snapshot.params['recepientId'];


    try {


      await this.connection.start();
      console.log('Connected to SignalR hub');

      await this.receiveChats();
      await this.receiveSpecificChat();
      await this.receiveConnectionItems();
      await this.receiveNewMessage();
      await this.getChats();
      await this.getConnectionItems();

      this.currentUserId = this.authService.getCurrentUserValue()?.id;
      
      
      if(this.recepientId > 0)
        this.goToUserSection(this.recepientId);
    
      this.cdr.detectChanges();
      


    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }

  }


  
  private async receiveConnectionItems() {
      this.connection.on('ReceiveConnectionItems', (data) => {
        const parsedResult = JSON.parse(data) as ICommonChatStatus[];
        this.messengerService.setCommonChatData(data);
      });
  } 


  private async receiveChats() {
    this.connection.on('ReceiveChats', (items) => {
      const chats = JSON.parse(items) as IChat[];
      this.messengerService.setChats(chats);
    });
  } 

  private async receiveSpecificChat() {
    this.connection.on('ReceiveSpecificChat', (items) => {
      // const chats = JSON.parse(items) as IChat[];
      // this.messengerService.updateSpecificChat(chats[0]);
      this.cdr.detectChanges();
    });
  } 


  private async receiveNewMessage() {
    this.connection.on('ReceiveNewMessage', (message) => {
      console.log(message);
      const newMessageToPush = JSON.parse(message) as IMessage;
      console.log(newMessageToPush);
      this.messengerService.appendNewMessageInChat(newMessageToPush, this.destinationUser);
      this.cdr.detectChanges();
    });
  } 





  
  setLang(lang: string) {
    this.lang = lang;
    switch (lang) {
      case 'en': this.intl.strings = englishStrings; break;
      case 'ru': this.intl.strings = russianStrings; break;
      case 'en-short': this.intl.strings = englishShortStrings; break;
      case 'fr': this.intl.strings = frenchStrings; break;
      case 'fr-short': this.intl.strings = frenchShortStrings; break;
      default: break;
    }
    this.intl.changes.next();
  }


  async getChats() {
    await this.connection.invoke('GetChats');
  }


  async getConnectionItems() {
    await this.connection.invoke('GetConnectionItems');
  }


  async sendMessage() {

    if(this.isPending)
      return;

    this.isPending = true;

  
    let message = this.form.get('messageText').value;

    if(this.filesForSend?.length > 0) {
      console.log('START UPLOAD SCENARIO');
      if(message === null)
        message = " ";
      
      await this.sendFilesWithMessageInServer(message);
      this.form.get('messageText').patchValue("");
      this.readChatAsync(this.currentChat?.id);
      this.cdr.detectChanges();
      return;
    }
    
    if(message === null || message === "")
      return;


    const uuId = uuidv4();
    this.form.get('messageText').patchValue("");
    await this.connection.invoke('SendMessageToUser', message, uuId, this.recepientId);
    await this.getConnectionItems();
    this.readChatAsync(this.currentChat?.id);
    this.isPending = false;
    this.cdr.detectChanges();
    return;
    
  }


  async sendFilesWithMessageInServer(text: string) {
    this.uploadService.sendMessage(this.recepientId, text).subscribe((newMessage: IMessage) => {
      if (newMessage) {
        // console.log(newMessage);
        for (const key in this.filesForSend) {
          if (!isNaN(parseInt(key))) {
            this.uploadService.addToQueue(this.filesForSend[key], newMessage.id);
          }
        }


        this.uploadService.queue.subscribe((res: any[]) => {
          if (res) {
            const result = res.filter(x => x.status === 2).length;
            this.isPending = false;

            if(result === +this.filesForSend.length) {
              this.uploadService.getImages(newMessage.id).subscribe((createdFiles: any[]) => {
                if (createdFiles) {
                  const files = this.getFileHandles(createdFiles);
                  newMessage.images = files;
                  this.messengerService.appendNewMessageInChat(newMessage, this.destinationUser);
                }
              })
            }
          }
        })


      }
    })
  }


  getFileHandles(items: any[]) {
    let result: IFileHandle[] = [];
    items.forEach(item => {
      const fileBlob = this.getImageFromByte(item.docByte, item.fileType);
      const fileData = new File([fileBlob], item.fileName, {type: item.fileType});
      const file: IFileHandle = {
        file: fileData,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileData)),
        docByte: item.docByte,
        fileName: item.fileName,
        fileType: item.fileType,
        fileSize: item.size
      };
      result.push(file);
    });
    return result;


  }

  getImageFromByte(data: any, fileType: string) {
    const byteString = window.atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let index = 0; index < byteString.length; index++) {
      int8Array[index] = byteString.charCodeAt(index);
    }

    const blob = new Blob([int8Array], {type: fileType});
    return blob;
  }
  

  async createForm() {
    this.form = new FormGroup({
          messageText: new FormControl(null, [Validators.required])},
    );
  }


  async goToUserSection(correspondentId: number) {
    this.router.navigateByUrl('/messenger/' + correspondentId);
    this.recepientId = correspondentId;
    const chats = this.messengerService.getChats();
    this.currentChat = chats.filter(x => +x.recepientId === +this.recepientId)[0] || chats.filter(x => +x.authorId === +this.recepientId)[0];
    this.getDestinationUser();
    
    this.cdr.detectChanges();
  }


  getDestinationUser() {
    this.sub = this.authService.getUserById(this.recepientId).subscribe((res: IUser) => {
      if (res) {
        this.destinationUser = res;
      }
    })
  }



  public async readChatAsync(chatId: number) {
    let chats = this.messengerService.getChats();

    if(chats.length === 0)
        return;

    if(!chats)
        return;

    if(+chats[0].messages.length === 0)
        return;

      
    let chat = chats.filter(z => z.id === chatId)[0];
  
    if(!chat)
        return;
  
    chat.messages.forEach(element => {
      element.isReaded = true;
    });
    
    this.connection.invoke('ReadMessagesInChat', chatId);
  }




  @Output() public OnUploadFinished = new EventEmitter();
  public result?: any;
  baseUrl = environment.baseUri;
  progress: any;

  public uploadFile = (files: any) => {
    if (files.length <= 0)
      return;
  else {
    this.filesForSend = files;   
    console.log(files);
  }



  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngAfterViewChecked(): void {       
  }

  
  ngAfterViewInit() {
        if (this.input === undefined)
          return;
        // server-side search
        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(1500),
                distinctUntilChanged(),
                tap((text) => {
                  // console.log(this.input.nativeElement.value)
                  this.sendPrintingStatus()
                })
            )
            .subscribe();
  }

  async sendPrintingStatus() {
    await this.connection.invoke('SendPrintingUserItem');
  }




}