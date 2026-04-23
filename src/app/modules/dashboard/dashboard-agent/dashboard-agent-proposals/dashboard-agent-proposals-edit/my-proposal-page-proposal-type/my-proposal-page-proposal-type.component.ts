import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-my-proposal-page-proposal-type',
  templateUrl: './my-proposal-page-proposal-type.component.html',
  styleUrls: ['./my-proposal-page-proposal-type.component.css']
})
export class MyProposalPageProposalTypeComponent implements OnInit {

  form!: FormGroup;
  isPending: boolean;
  
  @Input() currentProposal: any;

  constructor(
    private proposalService: ProposalsService
  ) { }

  ngOnInit() {
    this.createForm();
    const proposalTypeId = this.currentProposal.data.attributes.proposal_type.data.id;
    if(+proposalTypeId > 0)
      this.form.get('proposalTypeControl').setValue(proposalTypeId.toString());
    

    
  }

  createForm() {
    this.form = new FormGroup({
      proposalTypeControl: new FormControl(),
    });
  }



  updateProposalTypeData() {
    if(this.isPending) return;
    
    this.isPending = true;
    const proposalId = (this.currentProposal.data.id);
    const proposalTypeId = (this.form.get('proposalTypeControl').value);
    this.proposalService.setProposalType(proposalId, proposalTypeId).subscribe((res: any) => {
      if (res) {
        
        this.isPending = false;
      }
    })
    
  }


}
