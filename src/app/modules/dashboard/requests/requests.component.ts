// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { IRequest, IRequestDto } from './requests.models';
// import { RequestsService } from './requests.service';
// // import { GradeService } from '../dashboard-agent/grade/grade.service';

// @Component({
//   selector: 'app-requests',
//   templateUrl: './requests.component.html',
//   styleUrls: ['./requests.component.css']
// })
// export class RequestsComponent implements OnInit {

//   requestsDto$: Observable<IRequestDto[]>;
//   requests$: Observable<IRequest[]>;
//   scoreForRequest$: Observable<number>;


//   constructor(
//     private requestsService: RequestsService,
//     // private gradeService: GradeService
//   ) { }

//   ngOnInit() {
//     this.requests$ = this.requestsService.requests$;
//     this.requestsDto$ = this.requestsService.requestsDto$;
//     // this.scoreForRequest$ = this.gradeService.scoreForRequest$;
//   }

// }
