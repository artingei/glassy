import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

UserData = new Mongo.Collection(null);

Router.route('/', {
    name: 'home',
    template: 'one'
});

Router.route('/two', {
    template: 'two'
});

Router.route('/three', {
    template: 'three'
});

Router.route('/final', {
    template: 'final'
});

Router.configure({
    layoutTemplate: 'main'
});

Template.one.events({
    'submit form': function(){
      event.preventDefault();

      var vorname = event.target.first_name.value;
      var nachname = event.target.last_name.value;
      var job = event.target.job.value;
      var email = event.target.email.value;
      var twitter = event.target.twitter.value;
      UserData.insert({
        vorname: vorname,
        nachname: nachname,
        job: job,
        email: email,
        twitter: twitter
      });

      Router.go('/two');
    }
});

Template.final.events({
  "click .collapsible-header":function(event, template){
    template.$('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }
});

Template.final.onRendered(function() {
    var clipboard = new Clipboard('.copy');
});


//Template.one.events({
//  'keyup input':function(event) {
//    alert('a');
//  }
//});

Template.final.helpers({
  'show': function(){
      return UserData.find({});
      UserData.remove({});
  }
});

// async loader for fonts
// https://github.com/typekit/webfontloader

Meteor.startup(function() {

  WebFontConfig = {
    google: { families: [ 'Fira+Sans:400,700:latin', 'Fira+Mono:400' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    console.log("async fonts loaded", WebFontConfig);
  })();

})
