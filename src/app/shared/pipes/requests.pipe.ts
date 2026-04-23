import { Pipe, PipeTransform } from '@angular/core';
import { IRequestDto } from 'src/app/modules/dashboard/requests/requests.models';
import { IStrapiData } from 'src/app/models/main/proposal';

@Pipe({
  name: 'request'
})
export class RequestsPipe implements PipeTransform {

  constructor() { }

  transform(proposal: IStrapiData, requestsDto: IRequestDto[]) {
  
    if(proposal === null || requestsDto === null)
      return;

    const mappedRequest: IRequestDto = requestsDto.filter(x => x.strapiProposalNumber === proposal.id)[0];
    return mappedRequest;
  }


}