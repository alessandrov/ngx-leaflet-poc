import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import {circle, icon, latLng, Map, marker, tileLayer} from 'leaflet';

import * as c3 from 'c3';

import {environment} from '../environments/environment';
import {LocationService} from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  map;

  resultsIndicator;

  osmElementsForm: FormGroup;

  lineChart;

  barChart;

  streetMaps = tileLayer(environment.osm_url_template, {
    detectRetina: true,
    attribution: environment.osm_attribution
  });

  leafletOptions = {
    layers: [this.streetMaps],
    zoom: environment.osm_map_startup_zoom_level,
    center: latLng([environment.osm_map_startup_latitude, environment.osm_map_startup_longitude])
  };

  node = new FormControl('', [Validators.required]);
  way = new FormControl('', [Validators.required]);
  relation = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private locationService: LocationService) {
  }

  ngOnInit() {
    this.osmElementsForm = this.formBuilder.group({
      node: [''],
      way: [''],
      relation: [''],
    }, {validator: this.atLeastOne(Validators.required)});
  }

  loadPredefinedLocations() {
    this.locationService.getPredefinedLocationCoordinates().subscribe(
      res => {
        console.log(res);

        if (res.length === 0) {
          console.error('No predefined locations found');
        } else {
          for (let i = 0; i < res.length; i++) {
            // adding circle marker for predefined locations loaded at startup
            circle([res[i].latitude, res[i].longitude], 7000, {})
              .addTo(this.map)
              .bindPopup('latitude: ' + res[i].latitude + ', ' + 'longitude: ' + res[i].longitude);
          }
        }
      },

      error => this.handleError(error)
    );
  }

  locateCoordinates() {
    this.locationService.getLocationCoordinates(this.osmElementsForm.value).subscribe(
      res => {
        console.log(res);

        if (res.length === 0) {
          this.resultsIndicator = 'No results';
        } else {
          this.resultsIndicator = res.length + this.getResultsText(res.length);

          for (let i = 0; i < res.length; i++) {
            // adding marker
            marker([res[i].lat, res[i].lon], {
              icon: icon({
                iconSize: [environment.marker_icon_size_height, environment.marker_icon_size_width],
                iconAnchor: [environment.marker_icon_anchor_height, environment.marker_icon_anchor_width],
                iconUrl: environment.marker_icon_url,
                shadowUrl: environment.marker_shadow_url
              })
            }).addTo(this.map)
            .bindPopup('latitude: ' + res[i].lat + ', ' + 'longitude: ' + res[i].lon);
          }

          // only the first result is drawn
          this.updateCharts(res[0].lat, res[0].lon);
        }
      },
      error => this.handleError(error)
    );
  }

  handleError(error) {
    // minimum error handling
    console.log(error);
  }

  updateCharts(latitude, longitude) {
    // line chart refresh
    this.lineChart = c3.generate({
      bindto: '#lineChart',
      size: {
        height: environment.line_chart_height,
        width: environment.line_chart_width
      },
      data: {
        columns: [
          ['coordinates', latitude, longitude]
        ]
      },
      axis: {
        x: {
          type: 'category',
          categories: ['latitude', 'longitude']
        },
        y: {
          max: environment.line_chart_axis_y_max,
          min: environment.line_chart_axis_y_min
        }
      },
    });

    // bar chart refresh
    this.barChart = c3.generate({
      bindto: '#barChart',
      size: {
        height: environment.bar_chart_height,
        width: environment.bar_chart_width
      },
      data: {
        columns: [
          ['coordinates', latitude, longitude],
        ],
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories: ['latitude', 'longitude']
        },
        y: {
          max: environment.bar_chart_axis_y_max,
          min: environment.bar_chart_axis_y_min
        }
      },
    });
  }

  onMapReady(map: Map) {
    this.map = map;

    this.loadPredefinedLocations();
  }

  private getResultsText(results) {
    return (results === 1 ? ' result' : ' results');
  }

  // validator which checks that at least an input parameter is present
  private atLeastOne = (validator: ValidatorFn) => (
    group: FormGroup,
  ): ValidationErrors | null => {
    const hasAtLeastOne = group && group.controls && Object.keys(group.controls)
      .some(k => !validator(group.controls[k]));

    return hasAtLeastOne ? null : {
      atLeastOne: true,
    };
  }

}
