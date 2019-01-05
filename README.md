## Sample application based on the [ngx-leaflet Angular CLI tutorial](https://github.com/Asymmetrik/ngx-leaflet-tutorial-ngcli), it was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.

### Prerequisites

Make sure the TypeScript version on your local machine is between 3.1.1 and 3.2.0.
Make sure the [backend](https://github.com/alessandrov/ngrx-leaflet-poc-backend) is up and running.


### How to install the needed libraries

Navigate to the project folder and run:
```
$ npm i
```


### How to run the application

In order to start the application locally, navigate to the project folder and run:
```
$ ng serve
```
and visit http://localhost:4200/


### Usage

There's a form below the map, it can be filled with Node, Way and Relation values (at least one of those), clicking submit will result in one or more markers being set for each corresponding location retrieved (if any). 
Latitude and longitude of the first location returned are drawn within a line chart and a bar chart. Charts were handled using C3.js.
At application startup 20 circle markers are retrieved from the H2 embedded database, through the [backend](https://github.com/alessandrov/ngrx-leaflet-poc-backend), and set on the map.


### Notes

The application is based over a single component, if you're planning to use it I would recommend creating additional components (such as MapComponent, ChartComponent and so on).


