import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WeatherProvider {
  //Our local variables to help with the getLocalWeather method which will retrive data from a http: source
  myCity:string;
  myUnits: string;
  myApi: string;
  url:string;

  //Our constructor where we have injected as a dependency our HttpClient, which will will use to retrive data from a http source
  constructor(
    public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }
  //Our local method which we need to pass in values for city, units, and key, and which returns an Observable to us
  getLocalWeather(city:string, units:string, key:string) : Observable<any> {
    //Set our instance variable to the values passed in as parameters to the getLocalWeather method
    this.myCity =city;
    this.myUnits = units;
    this.myApi = key;

    //Construct our url from which we are to retrieve the weather data from openweathermap.org
    this.url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.myCity + '&units=' + this.myUnits + '&appid=' + this.myApi;

    //Use our injected HttpClient to fetch the Observable for us
    return this.http.get(this.url);
    
  }

}
