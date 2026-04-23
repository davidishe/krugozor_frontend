// import { Pipe, PipeTransform } from '@angular/core';
// import { IProfileStatus } from './profile-status';

// @Pipe({
//   name: 'profile_status_progress'
// })

// export class ProfileStatusProgressPipe implements PipeTransform {


//   cltkfn
//   сделать метод getStatus и возвращать с бэка!
//   сделать черную магию чтобы возвращался статус - подготовка к сделке (авоматом туда падет)

//   transform(proposalProfile: any, strapiProposal: any) {
//       let res: IProfileStatus = {}

//     if(strapiProposal === null)
//       return;

//     if(proposalProfile === null || proposalProfile?.proposalProfileStatusId === 1) {
//       res.name = 'Старт проекта';
//       res.icon = 'done'
//       return res;
//     }


//     if(proposalProfile?.proposalProfileStatusId === 5) {
//       res.name = 'Сделка оформлена';
//       res.icon = 'done'
//       return res;   
//     }

//     if(proposalProfile?.proposalProfileStatusId === 6) {
//       res.name = 'Объект отозван';
//       res.icon = 'done'
//       return res;
//     }

//     let currentRequestsSum = 0;
//     proposalProfile?.requests.forEach(req => {
//       if(req.requestStatusId !== 5)
//           currentRequestsSum += req.shareValue;
//     });
    
//     if (currentRequestsSum > strapiProposal?.data?.attributes?.price) {
//       res.name = 'Готова к покупке';
//       res.icon = 'done'
//       return res;
//     }

//     if(proposalProfile?.proposalProfileStatusId === 4) {
//       res.name = 'Идет оформление';
//       res.icon = 'done'
//       return res;
//     }


//     if(proposalProfile?.proposalProfileStatusId === 1)
//       res.name = 'Cбор заявок';
//       res.icon = 'done'
//       return res;
//     }


// }