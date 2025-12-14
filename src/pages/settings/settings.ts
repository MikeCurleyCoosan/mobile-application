import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',

})

export class SettingsPage {
  //Instance variables to help with 
  city: string;
  units: string;
  key:string;
  hidden: boolean = true;

  //Need to change the default for what happens when the backbutton on our Navbar is clicked, therefore we update it via this.
  @ViewChild(Navbar) navbarName: Navbar;

  //Our constructor where we have injected as a dependency our Storage provider, and our navParams 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage) {
  }
  //This method will run when the page is about to enter and become active
  ionViewWillEnter() {
    //Display to the console for troubleshooting purposes
    console.log('IonViewDidEnterLoading');

    //Retrieve value for units from local storage
    this.storage.get('units')
          .then((data) => {
              //if the value in storage is null, then we know a value for units does not exist in local storage.
              if (data == null) {
              //Displaying to console for troubleshooting purposes.
              console.log("myUnits is not in storage");
              //So set the value of our instance variable units to Metric 
              this.units = 'Metric';
              //Otherwise a value does exist in local storage....
              } else {
              console.log("Units are " + data);
              //Set the value of the instance varible units to that in local storage.
              this.units = data;
              }
              })
          //We may not be able to retrieve data from storage, so lets deal with those error here.
          .catch((err) =>{
            console.log("Error = " + err);
          })
    //Retrieve value for city variable from local storage
    this.storage.get('city')
          .then((data) => {
              //if the value in storage is null, then we know a value for city does not exist in local storage.
              if (data == null) {
              //Output to console....for troubleshooting purposes
              console.log("City is not in storage");
              this.city = '';
              //Otherwise a value does exist in local storage....
              } else {
              console.log("City is " + data);
              //So we will set our instance variable city to the value in local storage
              this.city = data;
              }
              })
          //We may not be able to retrieve data from storage, so lets deal with those error here.
          .catch((err) =>{
            console.log("Error = " + err);
          })
  
    //Set units to metric
    if(this.units === null || this.units === '') {
      this.units = 'Metric';
    }
  }
  //This method runs when the page has loaded. This event only happens once per page being created. If a page leaves, but is cached,
  //then this method will not fire again on subsequent viewing.
  ionViewDidLoad() {
    //Display to the console for troubleshooting purposes.
    console.log('ionViewDidLoad SettingsPage');

    //When the back button is clicked and a city has not being selected on savedd, we want to set the city to Galway
    this.navbarName.backButtonClick = () => {
    //As alwasys displaying message to console for troubleshooting purposes
    console.log('Settings Page exiting');
    //If these conditions are met on back button click......
    if(this.city === null || this.city ==='' || this.city === undefined){
      //Set the city to Galway
      this.city = 'Galway';
      //And have the value of galway, as well as the currently selected units sent to local-storage
      this.storage.set("units", this.units);
      this.storage.set("city", this.city);
    }else{
      //We wont be running any code in here.....
    }
    //Pop the settings page off the stack
    this.navCtrl.pop();
  }
}

  //Our saveUnits method saves the values selected for city and units to local Storage.
  //Also saves city to Galway if no city has being saved.
  saveUnits() {
    //If these conditions are met as the save button is pressed
    if(this.city === null || this.city ==='' || this.city === undefined){
      //Set the city to 'Galway', 
      this.city = 'Galway';
      //And save the values in local storage to Galway, and the currently selected units....
      this.storage.set("units", this.units);
      this.storage.set("city", this.city);
      //Otherwise, save the current units and city to local storage......
    }else{
      this.storage.set("units", this.units);
      this.storage.set("city", this.city);
      
    }
    //Pop the settings page of the stack
    this.navCtrl.pop();
    }
  



}


