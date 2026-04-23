import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IRequest, IRequestDto } from '../modules/dashboard/requests/requests.models';


@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  newBaseUrl = environment.baseUri;

  private ordersDatasetSource = new BehaviorSubject<IRequest[]>([]);
  ordersDataset$ = this.ordersDatasetSource.asObservable();

  constructor(
      public http: HttpClient,
  ) { }


  setOrdersDataset(orders: IRequest[]) {
    this.ordersDatasetSource.next(orders);
  }

  updateSpecificOrder(order: IRequest) {
    let orders = this.ordersDatasetSource.value;
    let index = orders.findIndex(z => z.id === order.id);
    orders[index] = order;
    this.ordersDatasetSource.next(orders);
  }

  getAllOrders(proposalId: number) {
    return this.http.get<any>(this.newBaseUrl + 'orders/all?proposalId=' + proposalId);
  }

  getAllOrdersForPartner(partnerId: number) {
    return this.http.get<any>(this.newBaseUrl + 'orders/all/partner?partnerId=' + partnerId);
  }

  getById(id: number) {
    return this.http.get<any>(this.newBaseUrl + 'requests/getbyid?id=' + id);
  }

  changeOrderStatusById(orderId: number, statusId: number) {
    return this.http.post<any>(this.newBaseUrl + 'requests/change/request?orderId=' + orderId + '&statusId=' + statusId, null);
  }

  moveAllToSpecificStatys(proposalId: number, statusId: number) {
    return this.http.post<any>(this.newBaseUrl + 'orders/change/proposal?proposalId=' + proposalId + '&statusId=' + statusId, null);
  }

  createOrder(orderDto: IRequestDto) {
    return this.http.post<any>(this.newBaseUrl + 'orders/create', orderDto);
  }

  getOrderStatus(proposalId: number) {
    return this.http.get<any>(this.newBaseUrl + 'orders/check?proposalId=' + proposalId);
  }


}
