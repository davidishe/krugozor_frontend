import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MapService {


  constructor(
    private http: HttpClient
  ) {}

  getMapUrl(lat: number, lng: number, size: string): string {
    return 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&zoom=12&size=' + size + '&key=AIzaSyDfNApIIi3OQ_B7BNpCVzOKBbbHOEPEuOY&maptype=satellite&zoom=10';
  }


  // TODO: прикруить к статик картам компоненту
  getStaticMapUrlWithMarker(lat: number, lng: number, size: string): string {
    return 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&zoom=12&size=' + size + '&key=AIzaSyDfNApIIi3OQ_B7BNpCVzOKBbbHOEPEuOY&roadmap=satellite&zoom=22';
  }


  getPlaceDetails(place_id: string) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?place_id=' + place_id + '&key=AIzaSyBdgRR2-M7yPQGRgEZfovRrwBq9CYO5VnU');
  }

  



  

}
