import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddOwnersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-owners',
  templateUrl: 'add-owners.html',
})
export class AddOwnersPage {
  Restaurants = [];
  Users = [];
  RequiredPlace: any;
  UserId: any;
  RequiredUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public storage: Storage) {
  this.storage.get('UserId').then((val)=>{
      this.UserId = val;
    });
    this.http.get('http://localhost:3000/AllUsers').map(res => res.json()).subscribe(data => {
       for(let item of data){

         if(item['ClearanceLevel'] == 'NORMAL')
         {
            this.Users.push(
                        {
                            UserId: item['UserId'],
                            Email: item['Email'],
                        }
                      )
         }
          
       }
      });  
    this.http.get('http://localhost:3000/AllPlaces').map(res => res.json()).subscribe(data => {
       for(let item of data){
         if(item['OwnerId'] == null || item['OwnerId'] == undefined)
            {
                this.Restaurants.push(
                            {
                                PlaceId: item['PlaceId'],
                                Name: item['Name'],
                                District: item['District']
                            }
                          )
            }
         
       }
      });  
      console.log(this.Restaurants);
      console.log(this.Users);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOwnersPage');
  }
  Register()
{
  console.log("OwnerPage");
  console.log("Admin Id"+ this.UserId);
   console.log("Owner Id"+ this.RequiredUser);
    console.log("Place Id"+ this.RequiredPlace) ;
 
    this.http.get('http://localhost:3000/Check/Owner?OwnerId='+this.RequiredUser+'&AdminId='+this.UserId+'&PlaceId='+  this.RequiredPlace).map(res => res.json()).subscribe(data => {});
          console.log("V");
 this.http.get('http://localhost:3000/AllUsers').map(res => res.json()).subscribe(data => {
   this.Users = [];
       for(let item of data){

         if(item['ClearanceLevel'] == 'NORMAL')
         {
            this.Users.push(
                        {
                            UserId: item['UserId'],
                            Email: item['Email'],
                        }
                      )
         }
          
       }
      });  
    this.http.get('http://localhost:3000/AllPlaces').map(res => res.json()).subscribe(data => {
      this.Restaurants = [];
       for(let item of data){
         if(item['OwnerId'] == null || item['OwnerId'] == undefined)
            {
                this.Restaurants.push(
                            {
                                PlaceId: item['PlaceId'],
                                Name: item['Name'],
                                District: item['District']
                            }
                          )
            }
         
       }
      });   
 }
}
