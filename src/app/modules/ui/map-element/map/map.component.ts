import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent  {

  map: any;
  @ViewChild('map', {static: false}) mapElement: any;
  @Input() lng!: number;
  @Input() lat!: number;
  @Input() markerName!: string;
  url!: string;




  constructor(
    private router: Router
  ) {

  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.mapElement);
    this.initMap();
    
  }


  initMap() {
    let coords = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      mapTypeControl: false,
      // clickableIcons: false,
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
      zoom: 18,
      maxZoom: 18,
      minZoom: 18,
      draggable: false,
      clickableIcons: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    let marker = new google.maps.Marker({
      position: coords,
    });

    this.url = 'https://maps.google.com/?q=' + this.lat + ',' + this.lng;

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    marker.setMap(this.map);
    marker.setVisible(true);

    
  }

  goToMap(): void {
    openInNewTab(this.url);
  }

}

function openInNewTab(href: any) {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: href,
  }).click();
}

