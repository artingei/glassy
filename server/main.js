import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  UserData = new Mongo.Collection('userdata');
});
