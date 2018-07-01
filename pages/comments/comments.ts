import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
   Review = {};
   Comment:string;
   UserId:number;
   UserName:string;
   comments = [];
   ReviewId: any;
   PlaceId: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: Http, public storage:Storage) {
    this.PlaceId = this.navParams.get('PlaceId');
    this.ReviewId = this.navParams.get('ReviewId');
    this.UserId = this.navParams.get('UserId');

    console.log("Comment Page");
    console.log("Place Id is :"+this.PlaceId);
    console.log("ReviewId is :"+this.ReviewId);
    console.log("UserId is :" +this.UserId);
    this.http.get('http://localhost:3000/RetrieveCommentsOfReview?ReviewId='+this.ReviewId+'&PlaceId='+this.PlaceId).map(res => res.json()).subscribe(data => {
       console.log(data);
       var length2 = 0;
       if(data['Comment'] == undefined)
       { 
         length2 = 0;
       }
       else{
         length2= data['Comment'].length;
       }
        this.Review =
        {
          UserId: data['Review'][0]['UserId'],
          Review: data['Review'][0]['ReviewText'],
          Name: data['Review'][0]['FirstName'] + " " +  data['Review'][0]['LastName'],
          CommentNum:  length2,
          Likes: data['Likes'][0]['Likes']
        }
        for(var i = 0;i < length2;i++)
        {
          this.comments.push({
            CommentId: data['Comment'][i]['CommentId'],
            CommentText: data['Comment'][i]['CommentText'],
            name: data['Comment'][i]['FirstName'] + " " + data['Comment'][i]['LastName']
          })
        }
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  UpdateComments()
  {  
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost:3000/Insert/Comment', 
   { 
       PlaceId: this.PlaceId,
        ReviewId: this.ReviewId,
        UserId: this.UserId,
        Content: this.Comment
    }, 
    options).map(res => res.json()).subscribe(dat2a => {
          this.http.get('http://localhost:3000/RetrieveCommentsOfReview?ReviewId='+this.ReviewId+'&PlaceId='+this.PlaceId).map(res => res.json()).subscribe(data => {
       console.log(data);
       var length2 = 0;
       if(data['Comment'] == undefined)
       { 
         length2 = 0;
       }
       else{
         length2= data['Comment'].length;
       }
       this.comments = [];
       this.Review = {};
        this.Review =
        {
          UserId: data['Review'][0]['UserId'],
          Review: data['Review'][0]['ReviewText'],
          Name: data['Review'][0]['FirstName'] + " " +  data['Review'][0]['LastName'],
          CommentNum:  length2,
          Likes: data['Likes'][0]['Likes']
        }
        for(var i = 0;i < length2;i++)
        {
          this.comments.push({
            CommentId: data['Comment'][i]['CommentId'],
            CommentText: data['Comment'][i]['CommentText'],
            name: data['Comment'][i]['FirstName'] + " " + data['Comment'][i]['LastName']
          })
        }
     });
     this.Comment = "";
    });
          
    
  }
}
