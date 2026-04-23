import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { IStep, Status } from '../../models';


@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  currentItem: IStep;
  items: IStep[] = [
      {
        id: 1, 
        step: "Шаг 1", 
        name: "Сбор заявок", 
        status: Status.Current, 
        text: "Собираем заявки на необходимую сумму! Каждая заявка подтверждается агентством недвижимости. По мере сбора заявок будущие собственники могут знакомиться друг с другом. По правилам платформы отдельный покупатель не может приобрести контрольный пакет недвижимого имущества."
      },
      {
        id: 2, 
        step: "Шаг 2", 
        name: "Подтверждение сделки", 
        status: Status.Upcoming, 
        text: "Если набрана достаточная сумма происходит проверка юридической правоустанавливающей документации и согласование всех необходимых условий сделки и владения имущества перед выходом на сделку. Если кто-то передумал приобретать недвижимость сделка откатывается на предыдущий шаг."
      },
      {
        id: 3,
        step: "Шаг 3",
        name: "Выход на сделку", 
        status: Status.Upcoming, 
        text: "В этот момент оформляются и согласовываются все необходимые юридические документы и собираются денежные средства на аккредитивном счете, подписывается предварительный договор.  Если кто-то передумал приобретать недвижимость сделка откатывается на предыдущий шаг."
      },
      {
        id: 4, 
        step: "Шаг 4", 
        name: "Подписание договора", 
        status: Status.Upcoming, 
        text: "На этом шаге подписывается договор купли-продажи коммерческой недвижимости, а денежные средства перечисляются продавцу с аккредитива. После регистрации сделки ты вступаешь в законные права собственности вместе с другими собственниками и начинаешь получать доход от аренды!"
      }
    ];


  constructor() { }

  ngOnInit() {
    this.currentItem = this.items.filter(x => x.status === Status.Current)[0];
  }

  setStep(step: IStep) {
    this.items.forEach(z => {
      if(z.id > step.id )
        z.status = Status.Upcoming;
      
      if(z.id === step.id )
        z.status = Status.Current;

      if(z.id < step.id )
        z.status = Status.Completed;
      
    })
    
    this.currentItem = this.items.filter(x => x.status === Status.Current)[0];
  }


  next() {
    if(this.currentItem.id === this.items.length)
      return;

    const nextStep = this.items.filter(x => x.id === this.currentItem.id + 1)[0];
    this.setStep(nextStep);

  }

  previous() {
    if(this.currentItem.id === 1)
      return;

    console.log(123123);
    
    const prevStep = this.items.filter(x => x.id === this.currentItem.id - 1)[0];
    this.setStep(prevStep);
  }


}
