import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, IUserProfileDto } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.css']
})
export class FormContactsComponent implements OnInit {

  form!: FormGroup;
  profileInfo: IUser;
  isPending: boolean = false;



  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  

  ngOnInit() {
    
    this.createForm();
    this.authService.currentUser$.subscribe((res: IUser) => {
      if (res) {
        
        this.profileInfo = res;
        this.form.get('instagram')!.patchValue(this.profileInfo.instagramUserName);
        this.form.get('telegram')!.patchValue(this.profileInfo.telegramUserName);
        this.form.get('facebook')!.patchValue(this.profileInfo.facebookUserName);
        this.form.get('phoneNumber')!.patchValue(this.profileInfo.phoneNumber);
      }
    })
  }

  createForm() {
    this.form = new FormGroup(
        {
          instagram: new FormControl(null, []),
          telegram: new FormControl(null, []),
          facebook: new FormControl(null, []),
          phoneNumber: new FormControl(null, []),
        },
    );
  }






  updateData() {
    if(this.isPending)
      return;

    this.isPending = true;
    console.log(this.form.value);
    let contacts: IUser = {};
    contacts.instagramUserName = this.form.get('instagram').value;
    contacts.facebookUserName = this.form.get('facebook').value;
    contacts.telegramUserName = this.form.get('telegram').value;
    contacts.phoneNumber = this.form.get('phoneNumber').value;


    this.authService.updateContacts(contacts).subscribe((res: IUser) => {
      if (res) {
        setTimeout(() => {
          
          this.isPending = false;
        }, 1000);
        
      }
    })
  }









}
