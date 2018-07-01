import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddMenusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-menus',
  templateUrl: 'add-menus.html',
})
export class AddMenusPage {
    Item1: any;
    Item2: any;
    Item3: any;
    Item4: any;
    SubTitle: any;
    Item5: any;
    PriceItem1: any;
    PriceItem2: any;
    PriceItem3: any;
    PriceItem4: any;
    PriceItem5: any;
    UserId: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public storage: Storage) {
      this.storage.get('UserId').then((val)=>{
      this.UserId = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMenusPage');
  }
  DoIt()
  {
    console.log(this.UserId);
     let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     this.http.get('http://localhost:3000/OwnedBy/'+this.UserId).map(res => res.json()).subscribe(data => {
       console.log(data[0].PlaceId);
          var Menu = [{
      ItemType: this.SubTitle,
      ItemPrice: this.PriceItem1,
      ItemName: this.Item1,
      PlaceId: data[0].PlaceId
    },  {
      ItemType: this.SubTitle,
      ItemPrice: this.PriceItem2,
      ItemName: this.Item2,
      PlaceId: data[0].PlaceId
    }, {
      ItemType: this.SubTitle,
      ItemPrice: this.PriceItem3,
      ItemName: this.Item3,
      PlaceId: data[0].PlaceId
    }, {
      ItemType: this.SubTitle,
      ItemPrice: this.PriceItem4,
      ItemName: this.Item4,
      PlaceId: data[0].PlaceId
    }, {
      ItemType: this.SubTitle,
      ItemPrice: this.PriceItem5,
      ItemName: this.Item5,
      PlaceId: data[0].PlaceId
    }];
    console.log(Menu);
    this.http.post('http://localhost:3000/Insert/Menu', 
   { Menu
    }, 
    options).map(res => res.json()).subscribe(data => {
       console.log(data);
       this.navCtrl.pop();
    });
     });
  }
}
