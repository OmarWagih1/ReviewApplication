import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddAdminsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-admins',
  templateUrl: 'add-admins.html',
})
export class AddAdminsPage {
  items = [];
  UserId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.storage.get('UserId').then((val)=>{
      this.UserId = val;
    })
      this.http.get('http://localhost:3000/AllUsers').map(res => res.json()).subscribe(data => {
       for(let item of data){
           if(item.UserId != this.UserId)
         {
          this.items.push(
            {
                UserId: item['UserId'],
                Email: item['Email'],
                Name: item['FirstName'] + " " + item['LastName'],
                ClearanceLevel: item['ClearanceLevel'],
                NumberofReports: item['NumberofReports'],
            }
          )
         }
       }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdminsPage');
  }
  Submit(GoTo: number,UserId:number)
  {
    if(GoTo == 1)
    {
        this.http.get('http://localhost:3000/Check/Admin?UserId='+UserId+'&AdminId='+this.UserId).map(res => res.json()).subscribe(data => {
          
        });
    }
    else
    {
      this.http.get('http://localhost:3000/Revoke/Admin?UserId='+UserId+'&AdminId='+this.UserId).map(res => res.json()).subscribe(data => {
      });
    }
     this.http.get('http://localhost:3000/AllUsers').map(res => res.json()).subscribe(data => {
              this.items = [];
       for(let item of data){
         if(item.UserId != this.UserId)
         {
          this.items.push(
            {
                UserId: item['UserId'],
                Email: item['Email'],
                Name: item['FirstName'] + " " + item['LastName'],
                ClearanceLevel: item['ClearanceLevel'],
                NumberofReports: item['NumberofReports'],
            }
          )
         }
       }
      }); 
  }

}