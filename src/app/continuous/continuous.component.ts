import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
 

@Component({
  selector: 'app-continuous',
  templateUrl: './continuous.component.html',
  styleUrls: ['./continuous.component.css'],
})
export class ContinuousComponent implements OnInit {
  map: L.Map | null = null;
  marker: L.Marker | null = null;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    const fixedLocation = L.latLng(42.366028, -71.057584);
    this.initMap(fixedLocation);

    this.getPosition().subscribe(
      (position) => {
        if (this.map && this.marker) {
          this.marker.setLatLng([position.latitude, position.longitude]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markerIcon = L.icon({
    iconUrl: '/assets/circle.png',
    iconSize: [24, 24],
  });

  canopyIcon = L.icon({
    iconUrl: '/assets/stall2.png',
    iconSize: [24, 24],
  });

  canopy2Icon = L.icon({
    iconUrl: '/assets/stall2.png',
    iconSize: [24, 24],
  });

  canopy3Icon = L.icon({
    iconUrl: '/assets/stall3.png',
    iconSize: [24, 24],
  });

  tentIcon = L.icon({
    iconUrl: '/assets/tent.png',
    iconSize: [32, 32],
  });

  stageIcon = L.icon({
    iconUrl: '/assets/stage2.png',
    iconSize: [36, 36],
  });

  canopyLocation = L.latLng(42.36634, -71.05794);
  canopy2Location = L.latLng(42.366335, -71.057815);
  canopy3Location = L.latLng(42.36628, -71.057775);
  tentLocation = L.latLng(42.366, -71.05765);
  stageLocation = L.latLng(42.36595, -71.057405);

  initMap(fixedLocation: L.LatLng) {
    this.map = L.map('map').setView(fixedLocation, 19);
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      {
        minZoom: 18,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);
    this.marker = L.marker([0, 0], { icon: this.markerIcon }).addTo(this.map);
    const tentMarker = L.marker(this.tentLocation, {
      icon: this.tentIcon,
    }).addTo(this.map);
    const stageMarker = L.marker(this.stageLocation, {
      icon: this.stageIcon,
    })
      .bindPopup("I'm a popup too!")
      .addTo(this.map);
    const canopyMarker = L.marker(this.canopyLocation, {
      icon: this.canopyIcon,
    }).addTo(this.map);
    const canopy2Marker = L.marker(this.canopy2Location, {
      icon: this.canopy2Icon,
    }).addTo(this.map);
    const canopy3Marker = L.marker(this.canopy3Location, {
      icon: this.canopy3Icon,
    }).addTo(this.map);

    this.getPosition().subscribe(
      (position) => {
        const latLng = L.latLng(position.latitude, position.longitude);
        if (this.map && this.marker) {
          this.marker.setLatLng(latLng);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPosition(): Observable<{ latitude: number; longitude: number }> {
    return new Observable<{ latitude: number; longitude: number }>(
      (observer) => {
        if (navigator.geolocation) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.locationService.setPosition({ latitude, longitude });
              if (this.map && this.marker) {
                this.marker.setLatLng([latitude, longitude]);
              }
              observer.next({ latitude, longitude });
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('Geolocation is not supported by this browser.');
        }
      }
    );
  }
}
