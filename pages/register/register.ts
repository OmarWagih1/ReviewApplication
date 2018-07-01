import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  Email: any;
  Password: any;
  FirstName: any;
  ErrorMessage: any;
  LastName: any;
  SubmitAttempt:any;
  slideOneForm:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public http: Http) {
        this.slideOneForm = formBuilder.group({
       Email: ['', Validators.compose([Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
       Password: ['', Validators.compose([Validators.required])],
       LastName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
       FirstName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  Register()
  {
    this.SubmitAttempt = true;
      //Send to backend API 
      //Set UserID 
      console.log("Stuff");
          if(this.slideOneForm.valid){
                   let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost:3000/Insert/User', 
   { 
        Email:this.Email,
        FirstName: this.FirstName,
        LastName: this.LastName,
        PassWord: this.Password
    }, 
    options).map(res => res.json()).subscribe(data => {
      console.log(data);
       if(data['Code'] == 1)
       {
          //LogIn the user
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
  this.storage.set('UserId',data.Code['UserId']);
       this.storage.set('AdminAccess',data.Code['ClearanceLevel']);
       this.navCtrl.setRoot(HomePage);
       }
    });
           this.navCtrl.setRoot(HomePage);
       }
       else
       {
          this.ErrorMessage = true;
          console.log("Error");
       }
    });
    } 
    else{
      console.log(this.slideOneForm.valid);
    }
  }
}
