import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class NewsProvider {
  //Our instance variables to help with the getLocalNews method which will retrive data from a http: source
  country: string;
  pageSize: string;
  news_API: string;
  url: string;

  //Our constructor where we have injected as a dependency our HttpClient, which will will use to retrive data from a http source
  constructor(
    public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
  }
  //Our local method which we need to pass in values for country, pageSize, and API, and which returns an Observable to us
  getLocalNews(country: string, pageSize: string, API: string) :Observable<any> {
    //Set our instance variable to the values passed in as parameters to the getLocalNews method
    this.country = country;
    this.pageSize = pageSize;
    this.news_API = API;

    //Construct our url from which we are to retrieve the news data from newsapi.org
    this.url = "https://newsapi.org/v2/top-headlines?country="+ this.country + "&pageSize=" +  this.pageSize + "&apiKey=" + this.news_API;

    //Use our injected HttpClient to fetch the Observable for us
    return this.http.get(this.url);
  }

}
