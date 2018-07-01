


  // Places
  module.exports.RetrieveTop10 = function (){ return "SELECT * FROM Places ORDER BY Rating DESC"};

  module.exports.RetrieveWithId = function(){return "Select * From Places where PlaceId=?"};

  module.exports.RetrieveCinema = function(){return "Select * From Cinema where PlaceId=?"};

  module.exports.RetrieveMovies= function(){return "Select * From Movies Where PlaceId=?"};

  module.exports.RetrieveCoworkingArtSpace= function(){return "Select * from coworkingartspaces where PlaceId=?"};// the name of the table is wrong

  module.exports.RetrieveRooms = function(){return "Select * from Rooms Where PlaceId=?"};

  module.exports.RetrieveWithname = function(){return "Select* From Places Where Name=?"};

  module.exports.RetrieveLastId= function(){return "Select Max(PlaceId) as Max from Places "};

  module.exports.RetrieveByAddress = function(name){return "Select* From Places Where StreetAddress Like '%"+name+"%'"};

  module.exports.RetrievePhotos = function(){return "Select *  from Photos where PlaceId =?" };

  module.exports.RetrieveMenu = function(){return "Select ItemName,ItemType,ItemPrice From Menu where PlaceID=? Order By ItemType "}
  
   module.exports.RetrieveReviews = function(){ return "Select * From(Select users.FirstName,users.LastName, users.UserId, Reviews.ReviewId,reviews.Content,reviews.Rating from Reviews JOIN users on Reviews.UserID = users.UserId where PlaceId= ?) as t1 Left Join (SELECT SUM(Helpful) as likes, reviewId from likes group by reviewId) as t2 on t1.reviewId = t2.reviewId"};
  //module.exports.RetrieveReviewsWithComments = function(){return " Select t1.ReviewId,t1.PlaceId,t1.ReviewText as ReviewText,t1.Rating,t1.UserId,t2.CommentId,t2.CommentText,t3.Likes as Likes From (Select ReviewId,PlaceId,Content as ReviewText,Rating,UserId from Reviews) as t1 left join (Select commentId,ContentText as CommentText,ReviewId From Comments) as t2 on  t1.ReviewId=t2.ReviewId  left join (Select Sum(Helpful) as Likes ,ReviewId from Likes L Where ReviewId=1) as t3 On  t2.ReviewId=t3.ReviewId where t1.ReviewId=2 and t2.ReviewId=2 and t3.ReviewId=2"};
  module.exports.RetrieveUsers = function(){return "Select * From Users "};
module.exports.RetrieveReviewInfo= function(){return "Select Reviews.UserId,Content as ReviewText,Rating,FirstName,LastName from Reviews,Users where Reviews.UserId=Users.UserId and ReviewId=? and PlaceId=?"};
module.exports.RetrieveCommentsOfReview = function(){return "Select CommentId,ContentText as CommentText,Comments.UserId,FirstName,LastName From Comments,Users where Users.UserId=Comments.UserId and ReviewId=? and PlaceId=?"};
 
  module.exports.RetrieveLikesOfReview = function(){return"Select sum(Helpful) as Likes from Likes where ReviewId=? and PlaceId=?"};

    module.exports.Stats  = function(){return"Select Count(UserId) as TotalUsers from Users"};

  module.exports.Stats1 = function(){return " Select Count(UserId) as LoggedInUsers from Users where isLogged=1"};

  module.exports.Stats2 = function(){return " SELECT Placetype, AVG(Rating)  as AVGRating FROM Places Group By Placetype"};

  module.exports.Stats3 = function(){return " Select Count(PlaceId) as NumOfPlaces from Places"};

  module.exports.Stats4  = function(){return " Select Count(ReviewId) as NumOfReviews from Reviews"};

  module.exports.RetrievePassWord= function(){return "Select ClearanceLevel, PassWord,UserId,isLogged From Users where Email=? "};

  module.exports.IfLoggedIn = function(){return "Select isLogged From Users where UserId=?"};

  module.exports.RetrievePlaceByType = function(){return " Select t1.PlaceId, t1.Name,t1.Rating,t1.District,t1.Governorate,t1.Telephone,t2.Photopath From(Select PlaceId,Name,Rating,District,Governorate,Telephone,DescriptionText,Links,OwnerId from Places where Placetype =?) as t1 LEFT JOIN (Select Distinct Photopath, placeid from photos group by placeid) as t2 on t1.PlaceId = t2.placeid "};//Avatar should be added in database

  module.exports.RetrieveComments = function(){return "Select * From Comments where PlaceId=? Review Id=?"};

  module.exports.InsertLike = function(){return "Insert into Likes (UserId,PlaceId,ReviewId,Helpful) values (?,?,?,1) "};

  module.exports.NegateLike = function(){return "Update Likes set Helpful = !Helpful where UserId=? and PlaceId=? and ReviewId=?"};

  module.exports.ReturnNumberOfLikes = function(){return "Select Sum(Helpful) as NumberOfLikes from Likes where ReviewId=?"};

  module.exports.InsertComment = function(){return "Insert Into comments set ?"};

  module.exports.CheckLike  = function(){return "Select * From Likes where UserId=? and ReviewId=? and PlaceId=? "};

  module.exports.InsertReview= function(){return "Insert into Reviews set ?"};


  module.exports.CheckAdmin=function(){return " Select ClearanceLevel from Users where  UserId= ? "};// Update Users U1 Join Users U2 ON U1.UserId=2 and U2.UserId IN (Select UserId From U2 where U2.ClearanceLevel="ADMIN") Set U1.ClearanceLevel="ADMIN"

  module.exports.RevokeAdmin=function(){return "Update Users set ClearanceLevel='NORMAL' where UserId=?"};

  module.exports.InsertAdmin = function(){return " Update users set ClearanceLevel='ADMIN' where UserId=? "};

  module.exports.InsertUser  = function(){return "Insert Into Users set ?"};

module.exports.InsertOwner = function(){return "Update Places set OwnerId=? where PlaceId=?" };
 module.exports.ModifyOwner = function(){return "Update Users set ClearanceLevel='OWNER' where UserId=? "};
  module.exports.InsertRequest = function() {return "Insert Into Requests set ? "};

  module.exports.InsertPlace = function(){return "Insert Into Places set ?"};

  module.exports.RetrieveRequest = function(){return "Select* from Requests where RequestId=?"};

  module.exports.LogUser= function(){return "Update Users set isLogged = !isLogged where UserId=? "};

  module.exports.RetrieveAllRequests = function(){return "Select * from Requests"};

  module.exports.InsertPlace = function(){ return " Insert Into Places set ? "};

  module.exports.InsertIntoRooms = function(){return "Insert Into Rooms set ?"};

  module.exports.DeleteRequest = function(){return "DELETE FROM Requests WHERE RequestId = ?"};

  module.exports.InsertIntoMenu = function(){return " Insert Into Menu set ? "};

  module.exports.InsertRooms = function(){return " Insert Into Rooms set ?"};

  module.exports.InsertEvents = function(){return "Insert Into Events set ?"};

  module.exports.InsertMovies = function(){return "Insert Into Movies set ?"};

  module.exports.ConnectionTest= function(){return " show status where variable_name ='Threads_running'"};



  //module.exports.InsertPlace = function( Name, Placetype, Rating=null, StreetAddress=null, DescriptionText=null, Links = null,  District=null,
  //Governorate=null,  NumberOfReviews=null,  Telephone=null,  OwnerId=null){return "Insert into Places values("+Name+","+PlaceType+","+Rating+","
  //+StreetAddress+","+DescriptionText+","+Links+","+District+","+Governorate+","+NumberOfReviews+","+Telephone+","+OwnerId+")"};










  //module.exports.RetrieveComments = function(Id){return "Select* from Comments,Places Where PlaceId="+Id };
