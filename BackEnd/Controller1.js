var express = require('express');
var mysql = require('mysql');
var app= express();
var Model  = require('./model');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var connection= mysql.createConnection({

  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'kritik'

});

connection.connect(function(error){

  if(error)
  {
    console.log(error.stack);
  }
  else
  {
    console.log('succeded');
  }
});



//completed and tested
app.get('/Places/:Id',function(req,res){
  if(!isNaN(req.params.Id) &&  req.params.Id % 1 === 0 )

  {
    var Id = parseInt(req.params.Id);
    var SentPlace;
    connection.query(Model.RetrieveWithId(),Id,function(error,rows,field){
      if(error)
      {
        console.log("error reteriving data");
      }
      else
      {

          var Place={};
          Place=rows[0];
        //  Id=rows[0].PlaceID;  was used when we retrieve by names
          if(rows[0].Placetype === "1")
        {
          connection.query(Model.RetrieveMenu(),Id,function(error,rows,field){
            if(error)
            {
              console.log("error reteriving data");
            }
            else
            {
              var Key = Object.keys(rows);
              var Num = Key.length;//no. of Item
              var Menu={}
              Place.Menu=Menu;
              for (var counter=0 ; counter < Num ; counter++)// this loop to dynamically a make array of distinct Keys of the menu
              {
                var ItemType = rows[counter].ItemType;
                if(Menu[ItemType])
                  continue;
                else
                  Menu[ItemType]=[];
              }
              for (var counter=0 ; counter < Num ; counter++)// this loop to dynamically put each row with its ItemType in the Meny's ItemType
              {
                  var ItemType = rows[counter].ItemType;
                  delete rows[counter].ItemType;
                  Menu[ItemType].push(rows[counter]);
              }
            }

          });
        }
        else if (rows[0].Placetype === "2")
        {
          connection.query(Model.RetrieveCinema(),Id,function(error,rows,field){
            if(error)
            {
              console.log("error reteriving data");
            }
            else
            {
              var Cinema={};
              Place.Cinema=Cinema;


              connection.query(Model.RetrieveMovies(),Id,function(error,Movierows,MovieField){
                  if(error)
                  {
                    console.log("error reteriving data");
                  }
                  else
                  {
                    for (var i = 0; i < 7; i++) {
                      Cinema[i]=[];
                  }
                    var arr= ["10->12","12->14","14->16","16->18","18->20","20->22","22->00"]
                    var MovieKey= Object.keys(Movierows);
                    var Num = MovieKey.length;
                    for (var i = 0; i <Num; i++) {
                      for (var j = 0; j < Movierows.length; j++) {
                        if(Movierows[i].ShowTimeNumber === arr[j])
                            Cinema[j].push(Movierows[i]);
                      }
                    }
                  }

              });

            }

          });
        }
        else // rows[0].placetype===3
        {
          connection.query(Model.RetrieveCoworkingArtSpace(),Id,function(error,rows,field){
            if(error)
            {
              console.log("error reteriving data ");
            }
            else
            {
              delete rows[0].PlaceId;
              Place.CowrkingArtSpace=rows[0];
              var Rooms=[];
              Place.Rooms=Rooms;
              connection.query(Model.RetrieveRooms(),Id,function(error,Roomsrows,Roomsfield){
                if(error)
                {
                  console.log("error reteriving data");
                }
                else
                {
                  var Keys = Object.keys(Roomsrows);
                  var Num = Keys.length;
                  for (var i = 0; i < Num; i++) {
                      delete Roomsrows[i].PlaceId;
                      Place.Rooms.push(Roomsrows[i]);
                   }

               }
             });
            }
          });
        }


        connection.query(Model.RetrievePhotos(),Id,function(error,rows,field){
          if(error)
          {
            console.log("error reteriving data");
          }
          else
          {
             Place.PhotoPath=rows;

            connection.query(Model.RetrieveReviews(),Id,function(error,rows,field){
              if(error)
              {
                  console.log("error reteriving data");
              }
              else
              {
                for (var i = 0; i < rows.length; i++) {
                  delete rows[i].PlaceId;
                  delete rows[i].reviewId;
              }
                Place.Reviews=rows;
                res.send(Place);

              }

            });

          }

        });

      }
    });
  }
  else
    console.log("Send me a vaild Id");
});
//NEW 
app.get('/OwnedBy/:id',function(req,res)
{
    var query = "SELECT PlaceId from places where OwnerId =" + req.params.id;
     connection.query(query,function(error,rows,field){
      if(error)
      {
        console.log("error reteriving data");
      }
      else
      {
        res.send(rows);
      }
});
});

//complete and tested
app.get('/SearchBytype/:Type',function(req,res){

    if(!isNaN(req.params.Type) &&  req.params.Type % 1 === 0 )

  {
    var Id = parseInt(req.params.Type);
    connection.query(Model.RetrievePlaceByType(),Id,function(error,rows,field){
    if(error)
    {
      console.log("error retrieving Place By Type");
    }
    else
    {
        res.send(rows);
    }
    });
  }
  else
  console.log("Insert an appropriate");
});
//completed and tested

app.get('/',function(req,res){
  connection.query(Model.RetrieveTop10(),function(error,rows,field){
  if(error)
  {
    console.log("error reteriving data");
  }
  else
  {
		res.send(rows);
  }
});
});

// working with sql injection :S // poorly tested
app.get('/Places/Address/:address',function(req,res){
  connection.query(Model.RetrieveByAddress(req.params.address),function(error,rows,field){
  if(error)
  {
    console.log("error reteriving data");
  }
  else
  {
    var Places = [];
      for(var i=0;i<rows.length;i++)
      {
        Places.push(rows[i]);
      }
      res.send(Places);
  }
    });

});
//completed
app.get('/Insert/Like',function(req,res){
  //var Inserted = {PlaceId:req.query.PlaceId,ReviewId:req.params.ReviewId,UserId:req.params.UserId,Helpful:1};
  //var Negate   = {PlaceId:req.params.PlaceId,ReviewId:req.params.ReviewId,UserId:req.params.UserId};
  // i sent Negate here as i only needs place id review id and userid as i am only checking if there is a like inserted in the table
  connection.query(Model.CheckLike(),[req.query.UserId,req.query.ReviewId,req.query.PlaceId],function(Likeserror,Likesrows,Likesfield)
  {
    if(Likeserror)
    {
      console.log("Couldnt Check Likes");
      res.end();
    }
    else
    {
      console.log("Likes Retrieved");
      var ifLikeExist = Likesrows;
      var keys = Object.keys(Likesrows);
      var Num  = keys.length ;
      if(Num === 0)
      {
        //console.log(Inserted);
        connection.query(Model.InsertLike(),[req.query.UserId,req.query.PlaceId,req.query.ReviewId],function(error,rows,fields){
          if(error)
          {
            console.log("Couldnt Insert a Like");
             res.end();
          }
          else
          {
            console.log("Like Has been Inserted");
          }

        });
      }
      else
      {
        connection.query(Model.NegateLike(),[req.query.UserId,req.query.PlaceId,req.query.ReviewId],function(Negateerror,Negaterows,Negatefields)
        {
          if(Negateerror)
          {
            console.log("Couldnt Negate Like");
            res.end();
          }
          else
          {
            console.log("Like has been Negated");
            connection.query(Model.ReturnNumberOfLikes(),req.query.ReviewId,function(NumberofLikeserror,NumberofLikesrows,NumberofLikesfield){
                if(NumberofLikeserror)
                {
                  console.log("Couldnt Retrieve The Number Of Likes");
                  res.end();
                }
                else
                {
                  res.send(NumberofLikesrows);
                //  res.send(NumberofLikesrows.NumberofLikes);
                }
            });
         }
        });
      }
    }
  });
});
//not working at all with its query
/*app.get('/RetrieveCommentsOfReview',function(req,res){
  var Respond={};
  connection.query(Model.RetrieveReviewsWithComments(),[req.query.ReviewId,req.query.PlaceId],function(error,rows,field){
    if(error)
    {
      console.log("Couldnt Retrive CommentsWithReview");
    }
    else
    {
      res.send(rows);
    }
  });
});*/

app.get('/RetrieveCommentsOfReview',function(req,res){
  var Respond={};
  connection.query(Model.RetrieveReviewInfo(),[req.query.ReviewId,req.query.PlaceId],function(Reviewerror,Reviewrows,Reviewres){
    if(Reviewerror)
    {
      console.log("couldnt Retrieve ReviewInfo");
    }
    else
    {
      console.log("ReviewInfo Retrieved");
      Respond.Review=Reviewrows;
      connection.query(Model.RetrieveCommentsOfReview(),[req.query.ReviewId,req.query.PlaceId],function(Commentserror,Commentsrows,Commentsfield){
        if(Commentserror)
        {
          console.log("Couldnt Retrieve Comments");
        }
        else
        {
          var keys = Object.keys(Commentsrows);
          var Num  = keys.length;
          if(Num === 0 )
          {
            console.log("No Commentsinfo Attached to this Review");
          }
          else
          {
            console.log("Commentsinfo of this review is Returned");
            Respond.Comment=Commentsrows;
          }
        }
      });
      connection.query(Model.RetrieveLikesOfReview(),[req.query.ReviewId,req.query.PlaceId],function(Likeserror,Likesrows,Likesfield)
      {
        if(Likeserror)
        {
          console.log("Couldnt Retrieve Likesinfo");
        }
        else
        {
          console.log("Likesinfo of this review is returned");
          Respond.Likes=Likesrows;
          res.send(Respond);
        }
      });
    }
  });
});

//completed//tested by front end
app.post('/Insert/Comment',function(req,res){

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	//QUERY -> BODY
  var Inserted={PlaceId:req.body.PlaceId,ReviewId:req.body.ReviewId,UserId:req.body.UserId,ContentText:req.body.Content,DateTime:date};

  
  connection.query(Model.InsertComment(),Inserted,function(error,rows,field){
    if(error)
    {
      console.log("error u idiot");
      res.send({
        'Code':0
      });
    }
    else
    {
      console.log("Don't return me JSONs in a post request");
      res.send({
        'Code':1
      });
    }
  });
});
//completed and tested by front end
app.post('/Insert/Review',function(req,res){

	// When sending stuff with post request its in the BODY not the QUERY

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	//QUERY -> BODY
  var Inserted={PlaceId:req.body.PlaceId,UserId:req.body.UserId,Content:req.body.Content,DateTime:date,Rating:req.body.Rating};

  connection.query(Model.InsertReview(),Inserted,function(error,rows,field){
    if(error)
    {
      console.log("error u idiot");
      res.send({
      'Code':0
    })
    }
    else
    {
		console.log("Don't return me JSONs in a post request");
    res.send({
      'Code':1
    })
    }
  });
});
//completed and tested by front end
app.post('/Insert/User',function(req,res){
  var Inserted = {Email:req.body.Email,FirstName:req.body.FirstName,LastName:req.body.LastName,PassWord:req.body.PassWord};
  var Code = {Code:0};
  connection.query(Model.RetrievePassWord(),req.body.Email,function(Emailerror,Emailrows,Emailfield){
    if(Emailerror)
    {
      console.log("Couldnt Retrieve Email and Password");
    }
    else
    {
      console.log("Retrieved Email and Password if exists");
      var keys = Object.keys(Emailrows);
      var Num = keys.length;
      if(Num===0)
      {
        connection.query(Model.InsertUser(),Inserted,function(error,rows,field){
          if(error)
          {
            res.send(Code);
          }
          else
          {
            Code.Code =1;
            res.send(Code);
          }
          });
      }
      else
        {
          console.log("User Already Exists");
          Code.Code=-1;
          res.send(Code);
        }
    }
  });

});
//tested by back  and front, leave it as it is
app.get('/Check/Admin',function(req,res){
  if(!isNaN(req.query.UserId) &&  req.query.UserId % 1 === 0 && !isNaN(req.query.AdminId) &&  req.query.AdminId % 1 === 0 )
  {
  connection.query(Model.CheckAdmin(),req.query.AdminId,function(error,rows,field){
    var  UserId= req.query.UserId
    if(error)
    {
      console.log("Couldnt Retrieve a Admin");
    }
    else
    {
      console.log("Our Family Will Be Bigger yay");
    // i could get rid of rows[0].ClearanceLevel as the query will only return value if he is admin
      var keys = Object.keys(rows);
      var num  = keys.length;
      if(!(num ===0))
      {
        if(rows[0].ClearanceLevel === "ADMIN")
        {
               connection.query(Model.InsertAdmin(),UserId,function(errors,rows,field){
                if(error)
                {
                  console.log("Couldnt Insert Admin");
                }
                else
                 {
                  console.log("Out Family Has Gotten Bigger");
                }
            });
        }
      }
        else
      {
        console.log("There is not User with that ID");
      }

    }

  });
  }
  else
  {
      console.log("Give me valid IDs")
  }
});
//tested by back  and front, leave it as it is
app.get('/Revoke/Admin',function(req,res){
  if(!isNaN(req.query.UserId) &&  req.query.UserId % 1 === 0 && !isNaN(req.query.AdminId) &&  req.query.AdminId % 1 === 0 )
  {
    connection.query(Model.CheckAdmin(),req.query.AdminId,function(error,rows,field){
    var  UserId= req.query.UserId
    if(error)
    {
      console.log("Couldnt Retrieve a Admin");
    }
    else
    {
    // i could get rid of rows[0].ClearanceLevel as the query will only return value if he is admin
    var keys = Object.keys(rows);
    var num  = keys.length;
    if(!(num ===0))
    {
      if(rows[0].ClearanceLevel ==="ADMIN")
      {
           connection.query(Model.RevokeAdmin(),UserId,function(errors,rows,field){
              if(error)
              {
                console.log("Couldnt Revoke Admin");
              }
              else
               {
                console.log("bang bang he hit the ground ");
              }
          });
      }
      else
      {
        console.log("The User isnt Admin")
      }
    }
    else
    {
      console.log("There is no user with that ID");
    }
  }

  });
  }
  else
  {
      console.log("Give Me A Valid IDs")
  }
});
//tested by back only should be post
app.get('/Check/Owner',function(req,res){
  if(!isNaN(req.query.OwnerId) &&  req.query.OwnerId % 1 === 0 && !isNaN(req.query.AdminId) &&  req.query.AdminId % 1 === 0 &&!isNaN(req.query.PlaceId) &&  req.query.PlaceId % 1 === 0 )
  {
    var OwnerId = req.query.OwnerId;
    var AdminId = req.query.AdminId;
    var PlaceId = req.query.PlaceId;
    connection.query(Model.CheckAdmin(),AdminId,function(error,rows,field)
    {
      if(error)
      {
        console.log("Couldnt Retrieve the Admin");
      }
      else
      {
        var keys = Object.keys(rows);
        var num  = keys.length;
        if(!(num ===0))
        {
          if(rows[0].ClearanceLevel ==="ADMIN")
          {
            connection.query(Model.InsertOwner(),[OwnerId,PlaceId],function(error,rows,filed)
            {
              if(error)
              {
                console.log("Couldnt Inser Owner");
              }
              else
              {
                connection.query(Model.ModifyOwner(),[OwnerId],function(error,rows,filed)
            {
              if(error)
              {
                console.log("Couldnt Inser Owner");
              }
              else
              {
                console.log("The Owner Has been Inserted");
              }
            });
              }
            });
          }
          else
            {
              console.log("The User Is not Admin");
            }
          }
          else
          {
            console.log("There is no User ")
          }
      }
    });
  }
  else
  {
    console.log("Give Me A Valid IDs");
  }


});
//tested by back and front end
app.post('/LoginUser',function(req,res){
  var PassWord = req.body.PassWord;
  var Email = req.body.Email;
  var Code ={Code:0};
    connection.query(Model.RetrievePassWord(),req.body.Email,function(error,rows,field){
      if(error)
      {
        console.log("User Doesnt Exist");
      }
      else
      {
        var keys = Object.keys(rows)
        var Num  = keys.length;
        if(Num===0)
        {
          console.log("User Doesnt Exist");
          res.send(Code);
        }
        else
        {
          console.log("User Exist");
          if(rows[0].isLogged === 0)
          {
            if(rows[0].PassWord === PassWord)
            {
              Code.Code=rows[0].UserId;
              Code.ClearanceLevel = rows[0].ClearanceLevel;
              connection.query(Model.LogUser(),rows[0].UserId,function(Logerror,Logrows,Logfield){
                if(Logerror)
                {
                  console.log("Couldnt Log User");
                }
                else
                {
                  console.log("User LoggedIn");
                }
              });
              res.send(Code);
            }
            else
            {
              console.log("Wrong Password");
              res.send(Code);
            }
          }
          else
          {
            console.log("User is Already LoggedIn");
            res.send(Code);
          }
        }
      }
    });

});
//tested by back only should be post
app.get('/LogOutUser',function(req,res){
  var Code ={Code:0};
  var UserId=req.query.UserId;
  var isLogged= 0;
  if(!isNaN(UserId) &&  UserId % 1 === 0)
  {
   connection.query(Model.IfLoggedIn(),UserId,function(Logerror,Logrows,Logfield){
    if(Logerror)
    {
      console.log("Error In Checking wether he is Logged or not");
    }
    else
    {
      console.log("Retrieved wether he is Logged or not");
      isLogged=Logrows[0].isLogged;
      if(isLogged ===1 )
      {
        connection.query(Model.LogUser(),UserId,function(error,rows,field){
          if(error)
          {
            console.log("Couldnt LogOutUser");
            res.send(Code);
          }
          else
          {
            console.log("User is LoggedOut");
            Code.Code=1;
            res.send(Code);
          }
        });
      }
      else
      {
        console.log("User is already LoggedOut");
        res.send(Code);
      }
    }
  });
  }
});
// tested by front end 
app.get('/AllUsers',function(req,res){
  connection.query(Model.RetrieveUsers(),function(error,rows,fields){
    if(error)
    {
      console.log("Couldnt Retrieve Users");
    }
    else
    {
      console.log("Users Has Been Retrieved");
      res.send(rows);
    }



  });

});



app.get('/Stats',function(req,res){
  var Respond = {};
    connection.query(Model.Stats(),function(error,rows,fields)
    {
      if(error)
      {
        console.log("Couldnt Retrieve stats");
      }
      else
      {
        console.log("Stats are Retrieved ");
        Respond.TotalUsers = rows[0].TotalUsers;
        connection.query(Model.Stats1(),function(error,rows,fields){
          if(error)
          {
            console.log("Couldnt Retrieve Stats1");
          }
          else
          {
            Respond.LoggedIUsers = rows[0].LoggedInUsers;
            connection.query(Model.Stats2(),function(error,rows,fields){
              if(error)
              {
                console.log("Couldnt Retrieve stats2");
              }
              else
              {
                Respond.Type=rows;
                connection.query(Model.ConnectionTest(),function(error,rows,field){
                  if(error)
                  {
                    console.log("Crashing the app by walid");
                  }
                  else
                  {
                    Respond.ActiveConnections = rows;
                    connection.query(Model.Stats3(),function(error,rows,fields){
                      if(error)
                      {
                        console.log("Couldnt Retrieve Stats3");
                      }
                      else
                      {
                        Respond.NumOfPlaces = rows[0].NumOfPlaces;
                        connection.query(Model.Stats4(),function(error,rows,fields){
                          if(error)
                          {
                            console.log("Couldnt Retrieve Stats4");
                          }
                          else
                          {
                            Respond.NumOfReviews = rows[0].NumOfReviews;
                            res.send(Respond);
                          }
                        });
                      }

                    });
                  }
                });
              }
            });
          }
        });
      }
    });
});


app.get('/testing',function(req,res){
  var Request  = {};
  connection.query(Model.RetrieveRequest(),req.query.RequestId,function(error,rows,fields){
    if(error)
    {
      console.log("blabla");
    }
    else
    {
      console.log(rows[0].DateTime);
      res.send(rows[0].DateTime);
    }
  });
});
//WAGIH UPDATE tested by front end 
app.post('/Insert/Request',function(req,res){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var Inserted = {District:req.body.District,Governorate:req.body.Governorate,RequestText:req.body.RequestText,LegalProof:req.body.LegalProof,UserID:req.body.UserId,DateTime:today,StreetAddress:req.body.StreetAddress,ExternalLinks:req.body.ExternalLinks,PlaceName:req.body.PlaceName,Telephone:req.body.Telephone,Placetype:req.body.Placetype,DescriptionText:req.body.DescriptionText};

  connection.query(Model.InsertRequest(),Inserted,function(error,rows,field){
    if(error)
    {
      console.log("Failed to Insert a Request");
      res.send({'Code':0})
    }
    else
    {
      console.log("Request Has Been Inserted");
      res.send({'Code':1});
    }
    });
});

//Not complete 12/17/2017 Tested by front end
app.get('/Respond/Request/Approve',function(req,res){
  var Place={};
  connection.query(Model.RetrieveRequest(),req.query.RequestId,function(error,rows,filed){
    if(error)
    {
      res.send("Failed  to Retrieve Request");
    }
    else
    {
      console.log("Succeded in sending RequestText");

      var keys = Object.keys(rows);
      var Num  = keys.length;
      if(Num!=0)
      {
        delete rows[0].RequestId;
        delete rows[0].RequestText;
        delete rows[0].LegalProof;

        Place.Name = rows[0].PlaceName;
        Place.Placetype = rows[0].Placetype;
        Place.StreetAddress = rows[0].StreetAddress;
        Place.DescriptionText = rows[0].DescriptionText;
        Place.Links = rows[0].ExternalLinks;
        Place.District = rows[0].District;
        Place.Governorate = rows[0].Governorate;
        Place.Telephone = rows[0].Telephone;
        Place.OwnerId = rows[0].UserId;
        Place.Rating = null;
        Place.NumberOfReviews = 0;
        console.log(Place);
        connection.query(Model.InsertPlace(),Place,function(Inserterror,Insertrows,Insertfiled){
          if(Inserterror)
          {
            console.log("Failed to Insert Places");
          }
          else
          {
            console.log("Place Has Been Inserted");
          }

        });
        connection.query(Model.DeleteRequest(),req.query.RequestId,function(Deleteerror,Deleterows,DeleteField){
            if(Deleteerror)
            {
              console.log("Couldnt Delete Errors");
            }
            else
            {
              console.log("Request Has Been Deleted");
            }
        });
      }
    }
  });
});
// its console.log not res.send

//tested by front end
app.get('/Respond/Request/Disapprove',function(req,res){

    connection.query(Model.DeleteRequest(),req.query.RequestId,function(error,rows,filed){
      if(error)
      {
        console.log("Failed to Delete Request");
      }
      else
      {
        console.log("Request Has Been Deleted");
      }
    });
});
//Tested by front end
app.get('/Requests',function(req,res){
  connection.query(Model.RetrieveAllRequests(),function(error,rows,filed){
    if(error)
    {
      console.log("Failed to Retrieve ALL Requests");
    }
    else
    {
        res.send(rows);
    }
    });
});
//tested by front end 
app.get('/AllPlaces',function(req,res){
  var query = "Select PlaceId,OwnerId, Name, District from Places";
    connection.query(query,function(error,rows,field){
      if(error)
      {
        console.log("error reteriving data");
      }
      else
      {
        res.send(rows);
      }

      });
});
app.post('/Insert/Menu',function(req,res){
    console.log(Menu);
    if(req.body.Menu != null)
    {
      var Menuvar = req.body.Menu;
      var Key = Object.keys(req.body.Menu);
      var Num = Key.length;//no. of Item
      for (var i = 0; i < Num; i++)
      {
        var Menu={};
        Menu.ItemPrice = Menuvar[i].ItemPrice;
        Menu.ItemName  = Menuvar[i].ItemName;
        Menu.ItemType  = Menuvar[i].ItemType;
        Menu.PlaceId   = Menuvar[i].PlaceId;
        connection.query(Model.InsertIntoMenu(),Menu,function(error,rows,field)
          {
            if(error)
            {
              console.log("Failed to Insert Menu Item");
              res.send({'Code':0})
            }
            else
            {
              console.log("Menu Item Inserted");
              res.send({'Code':1})
            }
          });
      }

    }

});

app.get('Insert/Rooms',function(req,res){
  if(req.query.Rooms != null)
  {
    var Key = Object.keys(req.query.Rooms);
    var Num = Key.length;//no. of Item
    var Roomvar  = req.query.Rooms;
    for (var i = 0; i < Num; i++)
    {
      var Rooms={};
      Rooms.PlaceId = Roomvar[i].PlaceId;
      Rooms.PerHour = Roomvar[i].PerHour;
      Rooms.PerPerson = Roomvar[i].PerPerson;
      Rooms.Ac = Roomvar[i].Ac;
      Rooms.PeopletoFit = Room[i].PeopletoFit;
      connection.query(Model.InsertIntoRooms(),Rooms,function(error,rows,field)
        {
          if(error)
          {
            console.log("Failed to Insert Rooms Item");
          }
          else
          {
            console.log("Room Item Has Been   Inserted");
          }
      });
    }

  }
});

app.get('Insert/Events',function(req,res){
  if(req.query.Events != null)
  {
    var Eventsvar = req.query.Events;
    var Key = Object.keys(req.query.Events);
    var Num = Key.length;//no. of Item
    for (var i = 0; i < Num; i++)
    {
      var Events={};
      Events.PlaceId = Eventsvar[i].PlaceId;
      Events.DateOfEvent = Eventsvar[i].Date;
      Events.StartFrom = Eventsvar[i].From;
      Events.EndAt = Eventsvar[i].To;
      Events.Description = Eventsvar[i].Description;
      connection.query(Model.InsertEvents(),Events,function(error,rows,field)
      {
        if(error)
        {
          console.log("Failed to Insert Event Item ");
        }
        else
        {
          console.log("Event Item Has been Inserted");
        }
      });
    }
  }
});

app.get('Insert/CinemaTable',function(req,res){

  connection.query(Model.InsertCinemaTable,req.query.Cinema,function(error,rows,field){
    if(error)
    {
      res.send("Failed To Insert The table");
    }
    else
    {
      res.send("Table Has Been Insertede");
    }
  });
});

app.get('Insert/Movies',function(req,res){

    if(req.query.Movies != null)
    {
       var Moviesvar = req.query.Movies;
       var Key = Object.keys(req.query.Movies);
       var Num = Key.length;//no. of Item
       for (var i = 0; i < Num; i++)
       {
         var Movie ={};
         Movie.FilmName = Moviesvar[i].FilmName;
         Movie.Price = Moviesvar[i].Price;
         Movie.ThreeD = Moviesvar[i].ThreeD;
         Movie.ShowTimeNumber = Moviesvar[i].ShowTimeNumber;
         Movie.PlaceId=Moviesvar[i].PlaceId;
         connection.query(Model.InsertMovies(),Movie,function(error,rows,filed)
         {
           if(error)
           {
             console.log("Failed to Insert Movie Item ");
           }
           else
           {
             console.log("Movie Item Has been Inserted");
           }
         });

       }
    }

});
//process.setMaxListeners(0);
//var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_port =process.env.PORT || 3000;
//var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port,function() {
    console.log('Listening on port %d', server_port);
});
