import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  lat: any = -17.789182;
  lon: any = -50.879812;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidLoad() {
    this.showMap();

  }
  
  showMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let location2 = new google.maps.LatLng(this.lat, this.lon);

      this.addMarker2(location2, this.map);
      this.addMarker2(latLng, this.map);

    }, (err) => {
      console.log(err);
    });



  }
  addMarker2(position, map) {
    return new google.maps.Marker({ position, map});
  }




}
