import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReviewPage } from '../review/review';
import { CommentsPage } from '../comments/comments';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage'
 
/**
 * Generated class for the RestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {
    Reviews: any[];
    Restaurant = {};
    MenuTypes: string[];
    Stuff: string;
    UserId: number;
    PlaceId: number;
    NameSt: string;
    MenuName: string;
    Popped: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    try{
    storage.get('UserId').then((val) => {
      this.UserId = val;
  });
      console.log("Restaurant Page")
      this.PlaceId = navParams.get('PlaceId');
      console.log(this.PlaceId);
       
    }
      catch(err) 
  {
      console.log(err);
  }  
    console.log(this.PlaceId);
    this.Stuff = "Reviews";
    this.http.get('http://localhost:3000/Places/' + this.PlaceId).map(res => res.json()).subscribe(data => {
       console.log(data);
        this.Restaurant  = data;
        this.Reviews = this.Restaurant['Reviews'];
        if(data['PhotoPath'].length == 0)
        this.Restaurant['Image'] = "https://i.imgur.com/ZukEaGi.jpg"
        else
                this.Restaurant['Image'] = data['PhotoPath'][0]['PhotoPath']
        if(this.Restaurant['Menu'] != undefined)
        {
          this.MenuName = "Menu";
        this.MenuTypes = Object.keys(this.Restaurant['Menu']);
        }
        else if(this.Restaurant['Cinema'] != undefined)
        {this.MenuName = "Schedule";
        this.MenuTypes = Object.keys(this.Restaurant['Cinema']);
      }
      else
      {
        this.MenuName = "Rooms";
        this.MenuTypes = Object.keys(this.Restaurant['Rooms']);
      }
       
    });
     
  }


  ionViewDidEnter() {
   this.http.get('http://localhost:3000/Places/' + this.PlaceId).map(res => res.json()).subscribe(data => {
       console.log(data);
        this.Restaurant  = data;
        this.Reviews = this.Restaurant['Reviews'];
        this.Restaurant['Image'] = "https://i.imgur.com/ZukEaGi.jpg"
        if(this.Restaurant['Menu'] != undefined)
        {
          this.MenuName = "Menu";
        this.MenuTypes = Object.keys(this.Restaurant['Menu']);
        }
        else if(this.Restaurant['Cinema'] != undefined)
        {this.MenuName = "Schedule";
        this.MenuTypes = Object.keys(this.Restaurant['Cinema']);
      }
      else
      {
        this.MenuName = "Rooms";
        this.MenuTypes = Object.keys(this.Restaurant['Rooms']);
      }
       
    });
  }
openAddPager(){
    this.navCtrl.push(ReviewPage,{
      PlaceId: this.PlaceId,
      UserId: this.UserId,
      Name: this.Restaurant['Name'],
      Image: this.Restaurant['Image']
    })
}

LikeThis(UserId: number, ReviewId: number, PlaceId: number)
{

 this.http.get('http://localhost:3000/Insert/Like/?UserId='+UserId+'&ReviewId='+ReviewId+'&PlaceId='+PlaceId).map(res => res.json()).subscribe(data => {
      for (var i =0; i< this.Reviews.length; i++)
      {

        if(this.Reviews[i]['ReviewId'] == ReviewId)
        {
          console.log("FOunded");
          console.log(data);
          if(data[0]['NumberOfLikes'] == null)
          data[0]['NumberOfLikes'] =0;
          console.log(data[0]['NumberOfLikes'])
          this.Reviews[i]['likes'] = data[0]['NumberOfLikes'];
          console.log(this.Reviews[i]);
        }
      }
       
    });
}
calc(Str:string)
{
  return parseInt(Str)+1;
}
GoComment(item:number)
{
  this.navCtrl.push(CommentsPage,{
      ReviewId: item,
      PlaceId: this.PlaceId,
      UserId: this.UserId
    });
}

}
