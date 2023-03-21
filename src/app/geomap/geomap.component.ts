import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

@Component({
  selector: 'app-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css'],
})
export class GeomapComponent implements OnInit {
  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getPosition().subscribe(
      (position) => {
        const latLng = L.latLng(position.latitude, position.longitude);
        this.initMap(latLng);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markerIcon = L.icon({
    iconUrl: '/assets/pin.png',
    iconSize: [48, 48],
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

  toiletIcon = L.icon({
    iconUrl: '/assets/toilet.png',
    iconSize: [24, 24],
  });

  stageIcon = L.icon({
    iconUrl: '/assets/stage2.png',
    iconSize: [36, 36],
  });

  toiletLocation = L.latLng(42.36634, -71.05755);
  canopyLocation = L.latLng(42.36634, -71.05794);
  canopy2Location = L.latLng(42.366335, -71.057815);
  canopy3Location = L.latLng(42.36628 , -71.057775);
  tentLocation = L.latLng(42.36600, -71.05765);
  stageLocation = L.latLng(42.36595, -71.057405);


  initMap(latLng: L.LatLng) {
    const map = L.map('map').setView(latLng, 10);
    L.tileLayer('https://retina-tiles.p.rapidapi.com/local/osm{r}/v1/{z}/{x}/{y}.png?rapidapi-key=839febf5e9msh4f0bd2b2b0c8404p1587b4jsn4d7cc445eda5', {
      minZoom: 10,
      maxNativeZoom: 20,
      maxZoom: 20,
      crossOrigin: true,
    }).addTo(map);
    const marker = L.marker(latLng, { icon: this.markerIcon }).addTo(map);
    const tentMarker = L.marker(this.tentLocation, { icon: this.tentIcon }).addTo(map);
    const stageMarker = L.marker(this.stageLocation, { icon: this.stageIcon }).addTo(map);
    const toiletMarker = L.marker(this.toiletLocation, { icon: this.toiletIcon }).addTo(map);
    const canopyMarker = L.marker(this.canopyLocation, { icon: this.canopyIcon }).addTo(map);
    const canopy2Marker = L.marker(this.canopy2Location, { icon: this.canopy2Icon }).addTo(map);
    const canopy3Marker = L.marker(this.canopy3Location, { icon: this.canopy3Icon }).addTo(map);
  }

  getPosition(): Observable<{ latitude: number; longitude: number }> {
    return new Observable<{ latitude: number; longitude: number }>(
      (observer) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.locationService.setPosition({ latitude, longitude });
              observer.next({ latitude, longitude });
              observer.complete();
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
