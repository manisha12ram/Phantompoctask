import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Service {

  constructor(private http: HttpClient) { }

  API_URI = "https://www.universal-tutorial.com/api"

  headers = {'Authorization': 'Bearer ' + environment.ACCESSTOKEN, 'Accept': 'application/json'}
  getCountries() {
    return this.http.get(this.API_URI + '/countries/', {headers: this.headers});
  }
  getState(country) {
    return this.http.get(this.API_URI + '/states/'+ country, {headers: this.headers});
  }
  getCity(state) {
    return this.http.get(this.API_URI + '/cities/' + state, {headers: this.headers});
  }
}
