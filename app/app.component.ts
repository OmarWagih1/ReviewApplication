import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage'
import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginsPage } from '../pages/logins/logins';
import { AddBusinessPage } from '../pages/add-business/add-business';
import {RestaurantPage} from '../pages/restaurant/restaurant'
import { AddMenusPage } from '../pages/add-menus/add-menus';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginsPage;
  UserId: any;
pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen,public http:Http, public storage: Storage) {

  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        storage.get('UserId').then((val) => {
          this.UserId = val;
      if(val != undefined)
    {
      this.rootPage = HomePage;
    }
  });
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  openPage() {
  this.storage.set('UserId',undefined);
  this.storage.set('AdminAccess',undefined);
      this.http.get('http://localhost:3000/LogOutUser?UserId=' +  this.UserId).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.nav.setRoot(LoginsPage);
      });
}
}
