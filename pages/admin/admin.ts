import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestsPage } from '../requests/requests';
import { StatisticsPage } from '../statistics/statistics';
import { AddOwnersPage } from '../add-owners/add-owners';
import { AddAdminsPage } from '../add-admins/add-admins';
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  openAddPage(Page:number)
  {
    console.log(Page);
    console.log(this.navCtrl);
      if(Page == 1)
      {
          this.navCtrl.push(RequestsPage);
      }
      else if(Page == 2)
      {
          this.navCtrl.push(AddAdminsPage);
      }
      else if(Page == 3)
      {
          this.navCtrl.push(AddOwnersPage);
      }
      else if(Page == 4)
      {
          this.navCtrl.push(StatisticsPage);
      }
  }
}
