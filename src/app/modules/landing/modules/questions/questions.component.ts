import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  form!: FormGroup;
  title: string = "Остались вопросы?";
  subtitle: string = "Запрос будет отправлен авторам проекта с просьбой перезвонить на указанный номер телефона";
  isSended: boolean = false;

  constructor(
    private questionsService: QuestionsService
  ) { }

  ngOnInit() {
    this.createForm();
  }


  sendFeedbackToServer() {
    this.questionsService.sendFeedbackToServer(this.form.get('phone').value).subscribe((res: any) => {
      if (res) {
        this.title = "Заявка отправлена";
        this.subtitle = "В ближайшее время с тобой свяжется автор проекта :) Ожидай звонка пожалуйста!"
        this.isSended = true;
      }
    })
  }


  createForm() {
    this.form = new FormGroup(
      {
        phone: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
      },
    );
  }

}
