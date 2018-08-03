import { horario } from './../index';

import { SedesProvider } from '../../providers';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { assert } from 'ionic-angular/umd/util/util';
import { ReturnStatement } from '@angular/compiler';
//import { google } from '@agm/core/services/google-maps-types';
 declare var google:any;

@IonicPage()
@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})


export class UbicacionPage {
  @ViewChild('map') mapref :ElementRef;
  sedes = [];
  constructor(public googleMaps:GoogleMaps,sedesProvider:SedesProvider) {
    this.sedes = sedesProvider.query();
  }

  ionViewDidLoad() {
   this.showMap();
    //this.loadMap();
    // let location = {lat:4.600018,lng:-74.074696,zoom:12}
  }
  



  showMap(){
    const infoWindow = new google.maps.InfoWindow;
    const location = new google.maps.LatLng(4.600638,-74.074987 )
    const options = {
      center:location,
      zoom:15,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    }

   

    const map = new google.maps.Map(this.mapref.nativeElement,options);

    if(navigator.geolocation){
      navigator.geolocation.watchPosition((position)=>{
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location Found');
        infoWindow.open(map);
        map.setCenter(pos);
      },err =>{
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }else{
      handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
     
      this.sedes.forEach(element => {
        
        let locationSede =  new google.maps.LatLng(element.lat,element.lng)
        let marker = this.addMarker(locationSede,element,map)
      
      });
    
  }

  addMarker(locationSede,sedeInfo,map){

    let marker = new google.maps.Marker({
  
      position:locationSede,
      map:map,
      title:sedeInfo.nombre,
      label:sedeInfo.label
    })
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  
    var infowindow = new google.maps.InfoWindow({
      content:  '<div id="content" >'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+sedeInfo.nombre+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Direccion: </b>'+sedeInfo.direccion+'</p><br>'+
      '<p><b>Telefono:</b> '+sedeInfo.telefono+'</p><br>'+
      '<p><b>Horario:</b> '+sedeInfo.horario+'</p><br>'+    
      '</div>'+
      '</div>',
      maxWidth: 200
    });
return marker;
  }
  // loadMap(){

  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: 43.0741904, // default location
  //         lng: -89.3809802 // default location
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   };
  
  //   this.map = this.googleMaps.create('map_canvas', mapOptions);
  
  //   // Wait the MAP_READY before using any methods.
  //   this.map.one(GoogleMapsEvent.MAP_READY)
  //   .then(() => {
  //     // Now you can use all methods safely.
  //     this.getPosition();
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   });
  
  // }

  // getPosition(): void{
  //   this.map.getMyLocation()
  //   .then(response => {
  //     this.map.moveCamera({
        
  //       target: response.latLng
  //     });
  //     this.map.addMarker({
  //       title: 'My Position',
  //       icon: 'blue',
  //       animation: 'DROP',
  //       position: response.latLng
  //     });
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   });
  // }

}
