import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  Places = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public storage: Storage) {
     this.http.get('http://localhost:3000/Requests').map(res => res.json()).subscribe(data => {
       for(let item of data){
          if(item['Placetype'] == 1)
          {
              item['Placetype'] = "Restaurant"
          }
          else if( item['Placetype'] == 2)
          {
                item['Placetype'] = "Cinema"
          }
          else
          {
              item['Placetype'] = "Space"
          }
          this.Places.push({
              RequestID: item['RequestID'],
              District: item['District'],
              Governorate:item['Governorate'],
              RequestText:item['RequestText'],
              LegalProof:item['LegalProof'],
              UserID:item['UserID'],
              StreetAddress:item['StreetAddress'],
              ExternalLinks:item['ExternalLinks'],
              PlaceName:item['PlaceName'],
              Telephone:item['Telephone'],
              Placetype:item['Placetype'],
              DescriptionText:item['DescriptionText'],
          })
          
       }
      });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
  }
  AcceptOrDeny(num:number, ReqId:number)
  {
    if(num == 1)
     this.http.get('http://localhost:3000/Respond/Request/Approve?RequestId='+ReqId).map(res => res.json()).subscribe(data => {});
    else
     this.http.get('http://localhost:3000/Respond/Request/Disapprove?RequestId='+ReqId).map(res => res.json()).subscribe(data => {});

          this.http.get('http://localhost:3000/Requests').map(res => res.json()).subscribe(data => {
            this.Places = [];
       for(let item of data){
          if(item['Placetype'] == 1)
          {
              item['Placetype'] = "Restaurant"
          }
          else if( item['Placetype'] == 2)
          {
                item['Placetype'] = "Cinema"
          }
          else
          {
              item['Placetype'] = "Space"
          }
          this.Places.push({
              RequestID: item['RequestID'],
              District: item['District'],
              Governorate:item['Governorate'],
              RequestText:item['RequestText'],
              LegalProof:item['LegalProof'],
              UserID:item['UserID'],
              StreetAddress:item['StreetAddress'],
              ExternalLinks:item['ExternalLinks'],
              PlaceName:item['PlaceName'],
              Telephone:item['Telephone'],
              Placetype:item['Placetype'],
              DescriptionText:item['DescriptionText'],
          })
          
       }
      }); 
   }

}
