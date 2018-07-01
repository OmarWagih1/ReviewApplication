import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestaurantPage} from '../restaurant/restaurant';
import { ListPage } from '../list/list';
import {AddBusinessPage} from '../add-business/add-business';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AdminPage } from '../admin/admin';
import { AddMenusPage } from '../add-menus/add-menus';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
RestItems: any[];
UserId: any;
AdminAccess: any;
OwnerAccess: any;
  constructor(public navCtrl: NavController, public http: Http,public storage: Storage) {
    storage.get('UserId').then((val)=>
    {
      this.UserId = val;
    });
    storage.get('AdminAccess').then((val) =>
    {
      if(val == 'ADMIN')
      this.AdminAccess = true;
      else if(val== 'OWNER')
      this.OwnerAccess = true;
      else
      {
this.AdminAccess = false;
this.OwnerAccess = false;
      }
      
    });
    console.log(this.UserId);
    console.log(this.AdminAccess)
     this.http.get('http://localhost:3000/').map(res => res.json()).subscribe(data => {
       data['Avatar'] = data['PhotoPath'];
       this.RestItems = data;
       });
  }
 openAddPage(RestId:number) {
   console.log();
    this.navCtrl.push(RestaurantPage,{
      PlaceId: RestId
    })
  }
   openListPage(Type:number) {
     console.log(Type);
    this.navCtrl.push(ListPage,{
      type: Type
    })
  }

  GoToAdmin()
  {
      this.navCtrl.push(AdminPage);
  }
  GoToOwner()
  {
      this.navCtrl.push(AddMenusPage);
  }
  openStuff()
{
  this.navCtrl.push(AddBusinessPage);
}

}
