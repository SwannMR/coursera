Websites = new Mongo.Collection("websites");

////
// Easy Search Indexes
////

WebsitesIndex = new EasySearch.Index({
	collection: Websites,
	fields: ['title', 'description'],
	engine: new EasySearch.Minimongo({
		sort: function () {
			return { votes: -1 };
		}
	})
});

if (Meteor.isClient) {

	//////
	// Routing
	//////
	Router.configure({
		layoutTemplate: 'ApplicationLayout'
	});

	Router.route('/', function () {
  		this.render('navbar', {
  			to:"navbar"
  		});
  		this.render('website', {
  			to:"main"
  		});
	});

	Router.route('/website/:_id', function () {
	  this.render('navbar', {
	  	to:"navbar"
	  });
	  this.render('website_detail', {
	  	to:"main",
	  	data:function(){
	  		return Websites.findOne({_id:this.params._id});
	  	}
	  });
	});


	//////
	// Allow user to define a username
	//////

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});

	/////
	// Comments
	/////
	Comments.ui.config({
   		template: 'semantic-ui' // or ionic, semantic-ui
	});

	/////
	// template helpers 
	/////
	
	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort: {votes: -1} });
		},
		websitesIndex: () => WebsitesIndex
	});


	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			votes = Websites.findOne({_id:website_id}).votes;
			votes = votes + 1
			console.log(votes)
			Websites.update(website_id, {$set: {votes: votes} });
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);
			votes = Websites.findOne({_id:website_id}).votes;
			votes = votes - 1
			console.log(votes)
			Websites.update(website_id, {$set: {votes: votes} });
			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			var title = event.target.title.value
			var description = event.target.description.value
			console.log("The url they entered is: "+url);
			if (Meteor.user) { 		// if user logged in they can save a new site
				Websites.insert({
					url: url,
					title: title,
					description: description,
					createdOn: new Date(),
					createdBy: Meteor.user()._id,
					votes: 0
				});
			} // end if
			
			//  put your website saving code in here!	

			return false;// stop the form submit from reloading the page

		}
	});

	Template.searchBox.helpers({
		websitesIndex: () => WebsitesIndex
	});
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date(),
    		votes:0
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date(),
    		votes:0
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date(),
    		votes:0
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date(),
    		votes:0
    	});
    }
  });
}
