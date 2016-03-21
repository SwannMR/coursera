Images = new Mongo.Collection("images");

//security
Images.allow({
	insert:function(userId, doc){
		console.log("testing security on an image insert");
		if (Meteor.user()) { // they are logged in
			//force image to be owned by user
			doc.createBy = userId;
			if (userId != doc.createBy) { //user is messing about
				return false;
			}
			else { // user is logged in and the image has correct userId
				return true;
			}
		}
		else { // user not logged in
			return false;
			}
	},
	remove:function(userId, doc){
		return true;
	}

});