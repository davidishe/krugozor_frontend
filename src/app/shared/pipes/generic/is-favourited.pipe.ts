import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'is_favourited',
  pure: false
})
export class IsFavouritedPipe implements PipeTransform {

  transform(favours: any[], strapiProposalId: any): any {
    let data = favours?.filter(z => +z.proposalProfile?.strapiProposalId === +strapiProposalId);

    let res = data.length > 0;
    return res;

  }

}
