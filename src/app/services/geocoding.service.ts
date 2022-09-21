import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment_keys } from 'src/environments/environment_keys';
import { GeocoderResponse } from '../models/geocoder-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeLatLng(location: google.maps.LatLngLiteral): Promise<GeocoderResponse> {
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': location }, (results, status) => {
        if( results != null){
          const response = new GeocoderResponse(status, results);
          resolve(response);
        }
      });
    });
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment_keys.GOOGLE_API_KEY}`;
    return this.http.get<GeocoderResponse>(url);
  }
}