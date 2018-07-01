import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})

export class ReviewPage {
  
UserId: number;
    PlaceId: number;
    Stars: number;
    Name:string;
    Description: string;
    Image:string;
    Review: string;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.UserId = navParams.get('UserId'); ;
      this.PlaceId = navParams.get('PlaceId');
      this.Name = navParams.get('Name');
      this.Image = navParams.get('Image');
     

  }
  AddRatings(Stars:number)
  {
      console.log(Stars);
      this.Stars= Stars;
     (<HTMLInputElement> document.getElementById("tick")).disabled = false;
  }
  Submit()
  {
    this.Description = this.Review;
    console.log(this.UserId);
    console.log(this.Description);
    console.log(this.Stars);
    console.log(this.PlaceId);
    console.log(this.Name);
    // send to API here
     let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost:3000/Insert/Review', 
   { 
    'UserId' : this.UserId,
    'Content': this.Description,
     'PlaceId': this.PlaceId,
     'Rating': this.Stars
    }, 
    options).map(res => res.json()).subscribe(data => {
       console.log(data);

    });
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

}
