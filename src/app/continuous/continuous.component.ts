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
    const fixedLocation = L.latLng(42.36578, -71.0575);
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

  feastZone: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0583944, 42.3668472, 0.0],
          [-71.0582174, 42.3652618, 0.0],
          [-71.0581369, 42.3644294, 0.0],
          [-71.0566242, 42.3645048, 0.0],
          [-71.0566778, 42.3650874, 0.0],
          [-71.0567207, 42.3653014, 0.0],
          [-71.05671, 42.3653847, 0.0],
          [-71.0566671, 42.3654521, 0.0],
          [-71.0563345, 42.3656859, 0.0],
          [-71.0568173, 42.3659634, 0.0],
          [-71.057107, 42.3661298, 0.0],
          [-71.0572035, 42.3662289, 0.0],
          [-71.0577292, 42.3668195, 0.0],
          [-71.058035, 42.3671722, 0.0],
          [-71.0583944, 42.3668472, 0.0],
        ],
      ],
    },
  };

  markerIcon = L.icon({
    iconUrl: '/assets/circle.png',
    iconSize: [24, 24],
  });

  initMap(fixedLocation: L.LatLng) {
    this.map = L.map('map').setView(fixedLocation, 18);
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      {
        minZoom: 14,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);
    L.geoJSON(this.feastZone).addTo(this.map);
    this.marker = L.marker([0, 0], { icon: this.markerIcon }).addTo(this.map);

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
