import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LocationService {

  private readonly platformUrl;

  private readonly predefinedLocationUrl;

  constructor(private httpClient: HttpClient) {
    this.platformUrl = environment.platformUrl;
    this.predefinedLocationUrl = environment.predefinedLocationUrl;
  }

  getLocationCoordinates(osmElements): Observable<any> {
    const node = osmElements.node === '' ? 0 : osmElements.node;
    const way = osmElements.way === '' ? 0 : osmElements.way;
    const relation = osmElements.relation === '' ? 0 : osmElements.relation;

    return this.httpClient.get<any>(`${this.platformUrl}/${node}/${way}/${relation}`);
  }

  getPredefinedLocationCoordinates(): Observable<any> {
    return this.httpClient.get<any>(`${this.predefinedLocationUrl}/`);
  }

}
