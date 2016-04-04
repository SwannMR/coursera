
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");


if (Meteor.isClient) {

  Meteor.startup(function () {
    Session.set('startdac', 0)

});


  Template.playground.helpers({

    "startdac": function () {

      var starter = MusicMachine.findOne();
      if (starter) { 
        if (starter.start==1) { //If set start playing music
          playAll();

        }
        else if (starter.start==0) {
          stopAll();
        }
      }

      return Session.get('startdac');
    },

    "drums": function () {

      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drums==1) {
          playDrums();

        } else if (starter.drums==0) {

          stopDrums();

        }
      }

      return Session.get('drums');
    },

    "bass": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassline==1) {
          playBass();

        } else if (starter.bassline==0) {

          stopBass();

        }
      }
      return Session.get('bass');
    },

    "arp": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.arp==1) {
          playArp();

        } else if (starter.arp==0) {

          stopArp();

        }
      }
      return Session.get('arp');
    },

    "chords": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.chords==1) {
          playChords();

        } else if (starter.chords==0) {

          stopChords();

        }
      }
      return Session.get('chord');
    },
   

    //don't forget the commas between each function
//the last one doesn't have to have one!


  "sliderVal1":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
        setSpeed(slider.slide/50);
        return slider.slide;
      }
    },

  "sliderVal2":  function() { 
    var slider = MusicMachine.findOne();
    if (slider2) { 
        Template.instance().$('#slider2').data('uiSlider').value(slider.slide2);
        setSpeed(slider.slide2/50);
        return slider.slide2;
      }
    },

  });


  Template.playground.events({

     "click button.startButton": function () { //get data from class=startButton
      if (Session.get('startdac') === 0) {
        Session.set('startdac', 1);
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {start: 1}});
      }
      else {
        Session.set('startdac', 0);
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {start: 0}})
      }
    },

     "click button.myButton1": function () {
      Session.set('drums', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 1}});

    },
      "click button.myButton2": function () {
      Session.set('drums', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 0}});
    },

      "click button.myButton3": function () {
      Session.set('bass', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 1}});

    },

      "click button.myButton4": function () {
      Session.set('bass', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 0}});

    },
      "click button.myButton5": function () {
      Session.set('arp', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 1}});

    },

      "click button.myButton6": function () {
      Session.set('arp', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 0}});

    },

      "click button.myButton7": function () {
      Session.set('chords', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {chords: 1}});

    },

      "click button.myButton8": function () {
      Session.set('chords', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {chords: 0}});

    }

  });

  Template.playground.onRendered(function() {
    $('h2').hide();
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider1').data('uiSlider')) {
        $("#slider1").slider({
            slide: handler,
            min: 0,
            max: 100
        });
    }
  });

    Template.playground.onRendered(function() {
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide2: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider2').data('uiSlider')) {
        $("#slider2").slider({
            slide: handler,
            min: 0,
            max: 10
        });
    }
  });

}





if (Meteor.isServer) {
//      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
      MusicMachine.insert({slide: 50});

    }

}