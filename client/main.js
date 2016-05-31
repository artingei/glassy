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

// Camera stuff is obsolete for the moment

/*Template.one.events({
  'click #photo': function () {
      var cameraOptions = {
        width: 800,
        height: 600
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
});*/

Template.one.events({
  'submit form': function(event, template) {
    event.preventDefault();

    /*const vorname = event.target.first_name.value;
    const nachname = event.target.last_name.value;
    const job = event.target.job.value;
    const email = event.target.email.value;
    const twitter = event.target.twitter.value;
    UserData.insert({
      vorname: vorname,
      nachname: nachname,
      job: job,
      email: email,
      twitter: twitter
    });*/
    Router.go('/two');
  }
});

Template.one.helpers({
  photo: function () {
    return Session.get("photo");
  }
});

Template.two.events({
  "click .add":function(event, template){
    template.$('.add').remove()
    template.$('.add_content').append( $( "<div class='spacer-top row animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <input id='connection_name' type='text' class='validate'> <label for='connection_name'>Name of connection</label> </div> </div> <div class='row small animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <input id='connection_type' type='text' class='validate'> <label for='connection_type'>Type of connection</label> </div> </div> <div class='row small animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <input id='connection_website' type='url' class='validate'><label for='connection_website'>Link</label></div></div><div class='row small animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <a class='btn-floating grey add'><i class='material-icons'>add another connection</i></a> </div> </div>" ) )
    window.scrollBy(0, 261)
  }
});

Template.three.events({
  "click .add":function(event, template){
    template.$('.add').remove()
    template.$('.add_content').append( $( "<div class='spacer-top row animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <input id='publication_name' type='text' class='validate'> <label for='publication_name'>Name of publication</label> </div> </div> <div class='row small animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <input id='publication_website' type='url' class='validate'><label for='publication_website'>Link</label></div></div><div class='row small animated fadeInDown'> <div class='input-field col s12 m12 l10 offset-l1 left-align'> <a class='btn-floating grey add'><i class='material-icons'>add another publication</i></a> </div> </div>" ) )
    window.scrollBy(0, 261)
  }
});

Template.final.events({
  "click #publish":function(event, template){
      template.$( ".link-inputs" ).toggle( 250 );
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
    $('ul.tabs').tabs();
    this.$( ".link-inputs" ).hide( 250 );
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

  RouterAutoscroll.animationDuration = 600;

})

ShareIt.configure({
    sites: {                // nested object for extra configurations
        'facebook': {
            'appId': null	// use sharer.php when it's null, otherwise use share dialog
        },
        'twitter': {},
        'googleplus': {},
        'pinterest': {}
    },
    classes: "btn-floating grey", // string (default: 'large btn')
                          // The classes that will be placed on the sharing buttons, bootstrap by default.
    iconOnly: true,      // boolean (default: false)
                          // Don't put text on the sharing buttons
    applyColors: false,     // boolean (default: true)
                          // apply classes to inherit each social networks background color
    faSize: '',            // font awesome size
    faClass: ''		  // font awesome classes like square
  });
