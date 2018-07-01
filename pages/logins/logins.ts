import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Http , Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
/*
 * Generated class for the LoginsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logins',
  templateUrl: 'logins.html',
})
export class LoginsPage {
  Email:any;
  Password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginsPage');
  }
  GoToHome()
  {
    this.storage.set('UserId',undefined); 
    this.storage.set('AdminAccess',undefined);
    this.navCtrl.setRoot(HomePage);
  }
  LogIn()
  {
    
    // send to API email and Password
     let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost:3000/LogInUser', 
   { 
     Email: this.Email,
      PassWord: this.Password
    }, 
    options).map(res => res.json()).subscribe(data => {
       console.log(data);
       console.log("LoggedIn");
       if(data['Code'] != 0)
       {
       this.storage.set('UserId',data['Code']);
       this.storage.set('AdminAccess',data['ClearanceLevel']);
       console.log(data['Code']);
       console.log(data['ClearaneLevel']);
       this.navCtrl.setRoot(HomePage);
       }
    });
    // set local storage to userId
  }
  RegisterPage()
  {
    this.navCtrl.push(RegisterPage);
  }
}
