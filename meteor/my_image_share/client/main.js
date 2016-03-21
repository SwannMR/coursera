//Client code

// ######## Routing #################

Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
  	to:"main"
  });
});

Router.route('/images', function () {
  this.render('navbar', {
  	to:"navbar"
  });
  this.render('images', {
  	to:"main"
  });
});

//specifies a dynamic variable in _id
Router.route('/image/:_id', function () {
  this.render('navbar', {
  	to:"navbar"
  });
  this.render('image', {
  	to:"main",
  	data:function(){
  		return Images.findOne({_id:this.params._id});
  	}
  });
});


// ######### Infinite Scroll ################
Session.set("imageLimit", 8);
lastScrollTop = 0;

$(window).scroll(function(event){
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	  	// where are we in the page? 
  		var scrollTop = $(this).scrollTop();
  		// test if we are going down
  		if (scrollTop > lastScrollTop){
   			// yes we are heading down...
   			console.log('we are going down');
   			// updates the limit of the images
   			Session.set("imageLimit", Session.get("imageLimit") + 4);
  		}

  		lastScrollTop = scrollTop;
	}

});

// Allow user to define a username when creating an account
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

//	Template.images.helpers({images:img_data});
Template.images.helpers({
	images:function(){
		if (Session.get("userFilter")){ //they have set a filter!
			return Images.find({createBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating: -1}})
		} 
		else {
			return Images.find({}, {sort:{createdOn: -1, rating: -1}, limit:Session.get("imageLimit")})
		}
	},
	filtering_images:function(){
		if (Session.get("userFilter")){
			return true;
		}
		else{
			return false;
		}

	},
	getFilterUser:function(){
		if (Session.get("userFilter")){
			var user = Meteor.users.findOne({_id: Session.get("userFilter")});
			return user.username;
		}
		else {
			return false;
		}
	},
	getUser:function(user_id){
		var user = Meteor.users.findOne({_id: user_id});
		if (user){
			return user.username;
		}
		else{
			return "anon";
		}
	}
});

Template.body.helpers({username:function(){
	//check if data is available to use
	if (Meteor.user()){
		return Meteor.user().username;
	}
	else {
		return "anonymous internet user";
	}
}
});	

Template.images.events({
	'click .js-image':function(event){ 
		$(event.target).css("width", "2500px");
		},
	'click .js-del-image': function(event){
		var image_id = this._id;
		console.log(image_id);
		$("#"+image_id).hide('slow', function(){
			Images.remove({"_id":image_id});
			});
		},
	'click .js-show-image-form':function(event){
		$("#image_modal_form").modal('show');
		},
	'click .js-set-user-filter': function(event){
		Session.set("userFilter", this.createBy);
	},
	'click .js-unset-user-filter': function(event){
		Session.set("userFilter", undefined);
	}
});

Template.image_add_form.events({
	'submit .js-add-image':function(event){
		var img_src, img_alt;
		img_src = event.target.img_src.value;
		img_alt = event.target.img_alt.value;
		console.log("src: "+img_src+" alt: "+img_alt);
		// Insert into database
		if (Meteor.user){
			Images.insert({
				img_src: img_src,
				img_alt: img_alt,
				createdOn: new Date(),
				createBy:Meteor.user()._id
			});
		} //end if

		$("#image_modal_form").modal('show');
		return false;
	}
});
