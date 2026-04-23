import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-range-building-date',
  templateUrl: './range-building-date.component.html',
  styleUrls: ['./range-building-date.component.css']
})
export class RangeBuildingDateComponent implements OnInit {

    form!: FormGroup;
  profileInfo: any;



  constructor(
    private proposalService: ProposalsService
  ) { }

  

  ngOnInit() {
    this.createForm();
    const params = this.proposalService.getQueryParams();

    if(params!.minBuildingYear > 0)
      this.form.get('minBuildingYear')!.patchValue(params!.minBuildingYear);

    if(params!.maxBuildingYear > 0)
      this.form.get('maxBuildingYear')!.patchValue(params!.maxBuildingYear);
  }

  createForm() {
    this.form = new FormGroup({
        minBuildingYear: new FormControl(null, []),
        maxBuildingYear: new FormControl(null, [])
    });    
  }


    setMinimalValue() {
      const params = this.proposalService.getQueryParams();
      if(this.form.value.minBuildingYear > 0)
        params!.minBuildingYear = this.form.value.minBuildingYear;

      if(params)
        this.proposalService.setQueryParams(params);
    }

    setMaximalValue() {
      const params = this.proposalService.getQueryParams();
      if(this.form.value.maxBuildingYear > 0)
        params!.maxBuildingYear = this.form.value.maxBuildingYear;
      
      if(params)
        this.proposalService.setQueryParams(params);
    }

  }