import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Place} from '../model/place';

@Injectable()
export class PlaceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private placeUrl = 'http://localhost:54042/api/Places';  // URL to web api

  constructor(private http: Http) { }

  getPlaces(): Promise<Place[]> {
    return this.http.get(this.placeUrl)
               .toPromise()
               .then(response => response.json() as Place[])
               .catch(this.handleError);
  }

  getPlace(id: number): Promise<Place> {
    const url = `${this.placeUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Place)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.placeUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(place: Place): Promise<Place> {
    return this.http
      .post(this.placeUrl, JSON.stringify(place), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Place)
      .catch(this.handleError);      
  }

  update(place: Place): Promise<Place> {
    const url = `${this.placeUrl}/${place.Id}`;
    return this.http
      .put(url, JSON.stringify(place), {headers: this.headers})
      .toPromise()
      .then(() => place)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}