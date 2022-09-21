import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GeocoderResponse } from '../../models/geocoder-response.model';
import { ToastrService } from 'ngx-toastr';
import { GeocodingService } from '../../services/geocoding.service';
import { environment_keys } from '../../../environments/environment_keys'

@Component({
  selector: 'app-google-component',
  templateUrl: './googleMap-searchbar.html',
  styleUrls: ['./googleMap-searchbar.scss']
})
export class GoogleMapSeachbar implements OnInit {

  constructor(
    private geocodingService: GeocodingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAddress();
  }

  @ViewChild(GoogleMap, { static: true }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: true }) infoWindow: MapInfoWindow;

  mapZoom = 13;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  geocoderWorking = false;
  geolocationWorking = false;

  address: string= environment_keys.LOCATION;
  formattedAddress?: string | null = null;
  locationCoords?: google.maps.LatLng | null = null;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  getCurrentLocation() {
    this.geolocationWorking = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocationWorking = false;
  
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        this.geocoderWorking = true;
        this.geocodingService
          .geocodeLatLng(point)
          .then((response: GeocoderResponse) => {
            if (response.status === 'OK' && response.results?.length) {
              const value = response.results[0];
  
              this.locationCoords = new google.maps.LatLng(point);
  
              this.mapCenter = new google.maps.LatLng(point);
              this.map.panTo(point);
  
              this.address = value.formatted_address;
              this.formattedAddress = value.formatted_address;
              this.markerInfoContent = value.formatted_address;
  
              this.markerOptions = {
                draggable: true,
                animation: google.maps.Animation.DROP,
              };
            } else {
              this.toastr.error(response.error_message, response.status);
            }
          })
          .finally(() => {
            this.geocoderWorking = false;
          });
      },
      (error) => {
        this.geolocationWorking = false;
  
        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true }
    );
  }

  findAddress() {
    console.log('jajajajajajajajaja')
    if (!this.address || this.address.length === 0) {
      return;
    }
    console.log(this.address)

    this.geocoderWorking = true;
    this.geocodingService
      .getLocation(this.address)
      .subscribe(
        (response: GeocoderResponse) => {
          if (response.status === 'OK' && response.results?.length) {
            const location = response.results[0];
            const loc: any = location.geometry.location;
  
            this.locationCoords = new google.maps.LatLng(loc.lat, loc.lng);
  
            this.mapCenter = location.geometry.location;
  
            setTimeout(() => {
              if (this.map !== undefined) {
                this.map.panTo(location.geometry.location);
              }
            }, 500);
  
            this.address = location.formatted_address;
            this.formattedAddress = location.formatted_address;
            this.markerInfoContent = location.formatted_address;
  
            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };
          } else {
            this.toastr.error(response.error_message, response.status);
          }
        },
        (err: HttpErrorResponse) => {
          console.error('geocoder error', err);
        }
      )
      .add(() => {
        this.geocoderWorking = false;
      });
  }

  onMapDragEnd(event: google.maps.MapMouseEvent) {
    console.log('mapaaaaaa')
      const point: google.maps.LatLngLiteral = {
        lat: event.latLng != null ? event.latLng.lat() : 0,
        lng: event.latLng != null ? event.latLng.lng() : 0,
      };
  
      console.log('point: '),point

    this.geocoderWorking = true;
    this.geocodingService
      .geocodeLatLng(point)
      .then((response: GeocoderResponse) => {
        if (response.status === 'OK') {
          if (response.results.length) {
            const value = response.results[0];
  
            this.locationCoords = new google.maps.LatLng(point);
  
            this.mapCenter = new google.maps.LatLng(point);
            this.map.panTo(point);
  
            this.address = value.formatted_address;
            this.formattedAddress = value.formatted_address;
  
            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };
  
            this.markerInfoContent = value.formatted_address;
          }
        }
      })
      .finally(() => {
        this.geocoderWorking = false;
      });
  }

}