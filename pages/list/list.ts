import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantPage} from '../restaurant/restaurant';
import {AddBusinessPage} from '../add-business/add-business';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  // send a request to the API to get type X
    itemsa = [];
    items = [];
    counter: number;
    type: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
      this.counter = 0;
      this.type = navParams.get('type'); 
     this.http.get('http://localhost:3000/searchbytype/' + this.type).map(res => res.json()).subscribe(data => {
       for(let i of data)
       {
          this.itemsa.push({
         id: i['PlaceId'],
        Restaurant: {
          avatar: i['Avatar'],
          name: i['Name']
        },
        Stars: i['Rating'],
        PhoneNumber: i['Telephone'],
        Region: i['District'] + ',' + i['Governorate'],
          })
       }
       var counter = 0;
       if(this.itemsa.length > 10)
       {
         counter = 10;
       }
       else
       {
         counter = this.itemsa.length;
       }
        for (let i = 0; i < counter; i++) {
      this.items.push(this.itemsa[i]);
      this.counter += 1;
    }
     console.log("ListPage");
     console.log(this.items);
    });
  
  
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
       var counter = 0;
       if(this.itemsa.length > this.counter+10)
       {
         counter = 10 + this.counter;
       }
       else
       {
         counter = this.itemsa.length;
       }
      for (let i = this.counter; i < counter; i++) {
       this.items.push(this.itemsa[i]);
       this.counter += 1;
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
    ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
 openAddPage(RestId:number) {
   console.log("Entering Restaurant");
   console.log(RestId);
    this.navCtrl.push(RestaurantPage,{
      PlaceId: RestId
    })
}
openStuff()
{
  this.navCtrl.push(AddBusinessPage);
}
}
