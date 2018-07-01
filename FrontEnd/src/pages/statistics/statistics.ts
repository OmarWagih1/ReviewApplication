import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  items = [];
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
     this.http.get('http://localhost:3000/Stats/').map(res => res.json()).subscribe(data => {
      this.items.push({
          Name:"Total Users",
          Value: data['TotalUsers']
      },
      {
          Name:"Logged in Users",
          Value: data['LoggedIUsers']
      },
      {
          Name: "Active Threads",
          Value: data['ActiveConnections'][0]['Value']
      },
      {
          Name:"Number Of Places",
          Value: data['NumOfPlaces']
      },
      {
          Name:"Number Of Reviews",
          Value: data['NumOfReviews']
      },
      {
          Name:"Rests Average Rating",
          Value: data['Type'][0]['AVGRating']
      },
      {
         Name:"Cinemas Average Rating",
          Value: data['Type'][1]['AVGRating']
      },
      {
          Name:"Spaces Average Rating",
          Value: data['Type'][2]['AVGRating']
      });
      
       
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

}
