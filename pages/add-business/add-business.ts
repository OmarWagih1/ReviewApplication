import { Component } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Storage} from '@ionic/storage'
/**
 * Generated class for the AddBusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-business',
  templateUrl: 'add-business.html',
})
export class AddBusinessPage {
  Districts:string[];
   Form1:any;
   SubmitAttempt:any;
   Name: any;
   Telephone:any;
   Website: any;
   Street: any;
   Description: any;
   Request: any;
   District: any;
   PlaceType: any;
   Proof: any;
   UserId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public http: Http, public storage: Storage) {
    this.Districts = ["6th of October","Abbassiya","Agouza","Al Rehab","Desert Road","Dokki","Downtown",'El Azhar','El Sadat City','El Salam City','El Sayeda Zeinab','El Shrouk City','El taggamoa El Khames','Faisal','Garden City','Gesr El Suez','Giza','Hadayek El Ahram','Hadayek El Koba','Haram','Heliopolis','Helwan','Imbaba','Katameya','Maadi','Madinatiy','Manial','Masaken Sheraton','Mohandeseen','Mokattam','Nasr City','New Cairo','Obour','Sheikh Zayed','Shoubra','Smart Village','Zamalek']
this.Form1 = formBuilder.group({
       Name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
       Telephone: ['', Validators.compose([Validators.pattern("^[0-9]+$")])],
       Website: [''],
       Street: [''],
       Description: [''],
        Request: [''],
        Proof: [''],
    });
     storage.get('UserId').then((val)=> 
     {
        this.UserId = val;
     });

 }
Register()
  {
    this.SubmitAttempt = true;
      //Send to backend API 
      //Set UserID
           let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
           this.http.post('http://localhost:3000/Insert/Request', 
   { 
      UserId: this.UserId,
        PlaceName: this.Name,
        Placetype: this.PlaceType,
        DescriptionText: this.Description,
        Telephone:this.Telephone,
        ExternalLinks: this.Website,
        RequestText: this.Request,
        LegalProof: this.Proof,
        StreetAddress: this.Street,
        District:this.District
    }, 
    options).map(res => res.json()).subscribe(data => {
        if(data['Code'] == 1)
         this.navCtrl.pop();
    });
       
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBusinessPage');
  }


}
