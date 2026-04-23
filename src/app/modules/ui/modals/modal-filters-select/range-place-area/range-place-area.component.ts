import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-range-place-area',
  templateUrl: './range-place-area.component.html',
  styleUrls: ['./range-place-area.component.css']
})
export class RangePlaceAreaComponent implements OnInit {

  form!: FormGroup;
  profileInfo: any;



  constructor(
    private proposalService: ProposalsService
  ) { }

  

  ngOnInit() {
    this.createForm();
    const params = this.proposalService.getQueryParams();

    if(params!.minPlaceArea > 0)
      this.form.get('minPlaceArea')!!.patchValue(params!.minPlaceArea);

    if(params!.maxPlaceArea > 0)
      this.form.get('maxPlaceArea')!!.patchValue(params!.maxPlaceArea);
  }

  createForm() {
    this.form = new FormGroup({
        minPlaceArea: new FormControl(null, []),
        maxPlaceArea: new FormControl(null, [])
    });    
  }


    setMinimalValue() {
      const params = this.proposalService.getQueryParams();
      if(this.form.value.minPlaceArea > 0)
        params!.minPlaceArea = this.form.value.minPlaceArea;

      if(params)
        this.proposalService.setQueryParams(params);
    }

    setMaximalValue() {
      const params = this.proposalService.getQueryParams();
      if(this.form.value.maxPlaceArea > 0)
        params!.maxPlaceArea = this.form.value.maxPlaceArea;
      
      if(params)
        this.proposalService.setQueryParams(params);
    }









}
