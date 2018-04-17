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

  /*showMap() {
    const location = new google.maps.LatLng(-17.802272, -50.912305);
    const location2 = new google.maps.LatLng(-17.789182, -50.879812);
    
   

    // map options
    const options = {
      center: location,
      zoom: 14,
      mapTypeId: 'hybrid'
    }

    const map = new google.maps.Map(this.mapRef.nativeElement, options);


      this.addMarker(location, map);
      this.addMarker(location2, map);


  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }

  */

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

 /* addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Aqui é onde eu estou agora!</h4>";

    this.addInfoWindow(marker, content);

  } */

  addMarker2(position, map) {
    return new google.maps.Marker({ position, map});
  }




}
