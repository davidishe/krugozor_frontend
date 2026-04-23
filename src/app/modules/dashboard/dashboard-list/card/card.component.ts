import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/models/main/response';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() item: IItem;
  constructor() { }

  ngOnInit() {
  }

}
