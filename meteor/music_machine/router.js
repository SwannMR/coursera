Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', function(){
	this.render('landing');
});

Router.route('/compose', function() {
	this.render('playground');
});
