import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TwAlertService } from './tw-alert.service';
import { IAlertSettings } from './tw-alert';
 



@Component({
  selector: 'app-tw-alert',
  templateUrl: './tw-alert.component.html',
  styleUrls: ['./tw-alert.component.css']
})

export class TwAlertComponent implements OnInit {
 
  alertSettings$: Observable<IAlertSettings>;

	constructor( 
		public alertService: TwAlertService
	) {}

	ngOnInit(): void {
		this.alertSettings$ = this.alertService.alertSettings$;
	}

	close() {
		this.alertService.disApearAlert();
	}



}