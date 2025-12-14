//Our imported components, pages, providers etc 
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
import { NewsProvider } from '../../providers/news/news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Instance variables for setting up weather provider
  myCity:string;
  myUnits:string;
  myApi:string ;

  //Instance variables for setting up news provider
  size: string ='5';
  newsApi: string;
  
  // Variables to retrieve useful values from imported weather provider
  country: string;
  weather: string[];
  name: string;
  temp: string;
  feelsLike: string;
  iconCode: string;
  iconUrl: string;
  cod: number;

  //Variables to retrieve useful values from imported news provider
  totalResults: string;
  news: string[];

  //Variable to Show/Hide aspects of our application
  hidden: boolean = true;
  hiddenNews: boolean = true;
  buttonDisabled: boolean = true;

  //Our constructor where we have injected as a dependency our weather provider, our Storage provider, and our news provider
  constructor(
    public navCtrl: NavController, 
    private weatherProvider: WeatherProvider, 
    private storage: Storage, 
    private NewsProvider: NewsProvider ) {
  }
  
  //This method will run when the page is about to enter and become active
  ionViewWillEnter() {
    //Print out to the console. We can then see when this method is loading.
    console.log('IonViewWillEnterLoading');

    //Retrive value from Local storage for units.
    this.storage.get('units')
          .then((data) => {
              //if the value in storage is null, then we know a value for units does not exist in local storage.
              if (data == null) {
                console.log("myUnits is not in storage");
                this.myUnits = 'Metric';
              } else {
                //Otherwise a value for units does exist, so set the local variable myUnit to the value of unit in local storage.
                console.log("Units are " + data);
                this.myUnits = data;
              }
          })
          //We may not be able to retrieve data from storage, so lets deal with those error here.
          .catch((err) =>{
              console.log("Error = " + err);
          })

    //Retrieve value from local storage for city
    this.storage.get('city')
          .then((data) => {
              //if the value in storage in null, the we know a value for city does not exist in local storage
              if (data == null) {
                console.log("City is not in storage");
              } else {
                //Otherwise a value for city does exist, so set the local variable myCity to the the value of city in local storage.
                console.log("City is " + data);
                this.myCity = data;
              }
          })
          //We may not be able to retrieve data from storage, so lets deal with those error here.
          .catch((err) =>{
             console.log("Error = " + err);
          })
  }
  //This method will run when the page has fully entered and is now the active page
  ionViewDidEnter() {
    //Print to console. We can then see when this method is loading
    console.log("IonViewDidEnterLoading");
    //Print out the current values of myCity and myUnits local variables, we can then see if any values do exist in storage.
    console.log(this.myCity);
    console.log(this.myUnits);
    
    //We can hard-code the Api codes for weather and news providers as these wont be changing
    this.myApi = '8b5f94dc7ad8729fd30806fbb0f7a84b';
    this.newsApi = 'a5bd0315dd2b4e4eb7218591108bf53e';

    //If myCity is not in storage or myUnits are not in storage or have not being set
    if (this.myCity === undefined || this.myUnits === undefined) {
      //The news should be hidden.
      this.hiddenNews = true;
    //Otherwise if we have values for myCity and myUnits
    }else{
      //Retrieve the getLocalWeather Method from the weather provider, by passing it in the local variables myCity, myunits, and myApi
      this.weatherProvider.getLocalWeather(this.myCity, this.myUnits, this.myApi).subscribe(data => {
        //Use the data returned from this Observable to set values for the other local variables as follows
        this.name = data.name; //Set up local variable name
        this.weather = data.weather; //Set up local variable weather
        this.temp = data.main.temp; // Set up local variable temp
        this.feelsLike = data.main.feels_like; // Set up local variable feelsLike
        this.iconCode = data.weather[0].icon; // Set up local variable iconCode
        this.hidden = false;
        this.buttonDisabled = false; //Enable the News button, so we can retrieve local News
        this.iconUrl = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
        this.cod = data.cod; // Set up the value for local variable cod
        //if the value for cod is 200 we know that the city entered exits 
        if(this.cod === 200) {
          //Therefore we can set our local variable to the value of country based on this city
          this.country = data.sys.country;
          //And set this to local storage
          this.storage.set("country", this.country);
        //Otherwise the value for cod is not 200, and therefore the city does not exist 
        }else {
          //So, lets output this information to the console
          console.log("This city does not exist");
        }       
      },
      //Our weather Provider may not be available, or we may have some errors retrieving information from the Observable, for 
      //example if we enter a city thad does not exist.
      onerror => {
             //In that case do the following.....
             this.name = this.myCity; // Set name variable to myCity varialbe
             this.temp = ' '; //Set the temp variable to display nothing
             this.hidden = true; //Elements to be hidden, are hidden
             this.buttonDisabled = true; //News button is disabled
             this.feelsLike = ' '; //feelsLike variable set to blank
             this.country = ''; //country variable set to blank
              
          }
          ) 
      }
    } 
      
  //Method is used when the settings Page cog-wheel is selected to open the settings page
  openSettingsPage() {
    this.navCtrl.push(SettingsPage);
    //We also want to hide the news again when this button is pressed.
    this.hiddenNews = true;
  }
  //Method is used when the news button is selected to open the news stories. The news button only becomes
  //available for selecion if a vaild city has being entered
  loadLocalNews() {
    //Retrieve the getLocalNews Method from the News provider, by passing it in the local variables country, size, and newsApi
    this.NewsProvider.getLocalNews(this.country, this.size, this.newsApi).subscribe(data => {
      //Retrieve the value for total News stories available in this country from our Observable
      this.totalResults = data.totalResults;
      //Retrieve the news articles from our Observable
      this.news = data.articles;
      //Show the news stories on our home page
      this.hiddenNews = false;

  }) 
  }
}
