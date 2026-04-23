import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { SettingsService } from 'src/app/modules/dashboard/dashboard-settings/settings.service';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-range-inputs-form',
  templateUrl: './range-inputs-form.component.html',
  styleUrls: ['./range-inputs-form.component.css']
})
export class RangeInputsFormComponent implements OnInit {

  form!: FormGroup;
  profileInfo: any;



  constructor(
    private proposalService: ProposalsService
  ) { }

  

  ngOnInit() {
    this.createForm();
    const params = this.proposalService.getQueryParams();

    if(params!.minimalPrice > 0)
      this.form.get('minimalPrice')!!.patchValue(params!.minimalPrice);

    if(params!.maximalPrice > 0)
      this.form.get('maximalPrice')!!.patchValue(params!.maximalPrice);
  }

  createForm() {
    this.form = new FormGroup({
        minimalPrice: new FormControl(null, []),
        maximalPrice: new FormControl(null, [])
    });    
  }


    setMinimalPrice() {
      console.log(this.form.value.minimalPrice);

      const params = this.proposalService.getQueryParams();
      if(this.form.value.minimalPrice > 0)
        params!.minimalPrice = this.form.value.minimalPrice;
    }

    setMaximalPrice() {
      console.log(this.form.value.maximalPrice);
      
      const params = this.proposalService.getQueryParams();
      if(this.form.value.maximalPrice > 0)
        params!.maximalPrice = this.form.value.maximalPrice;
      
    }









}
