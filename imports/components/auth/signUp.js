import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './signUp.html';

class SignUpCtrl {

  constructor($state) {
    this.state = $state;
  }

  signUp(email, password) {

    if (!email && !password) {
      $(".email-error").css("visibility", "visible");
      $(".email-error").css("opacity", "1");
      $(".email-error").css("height", "30px");
      $("#email").css("border-color", "red");
      $("#email").css("margin-bottom", "0");
      $(".email-error").text("please enter email");
      var elem = $("#email");
      elem.on( "focus", function () {
        elem.css("box-shadow", "0 0 0 1px red");
        } );

      elem.on( "focusout", function () {
        elem.css("box-shadow", "0 0 0 0 red");
        }  );

        $(".password-error").css("visibility", "visible");
        $(".password-error").css("opacity", "1");
        $(".password-error").css("height", "30px");
        var elem1 = $("#password");
        elem1.on( "focus", function () {
          elem1.css("box-shadow", "0 0 0 1px red");
          } );

        elem1.on( "focusout", function () {
          elem1.css("box-shadow", "0 0 0 0 red");
          }  );
        $("#password").css("border-color", "red");
        $("#password").css("margin-bottom", "0");
        $(".password-error").text("please enter password");

    }


    else if (!email) {
        $(".email-error").css("visibility", "visible");
        $(".email-error").css("opacity", "1");
        $(".email-error").css("height", "30px");
        $("#email").css("border-color", "red");
        $("#email").css("margin-bottom", "0");
        $(".email-error").text("please enter email");
        var elem = $("#email");
        elem.on( "focus", function () {
          elem.css("box-shadow", "0 0 0 1px red");
          } );

        elem.on( "focusout", function () {
          elem.css("box-shadow", "0 0 0 0 red");
          }  );


    }

    else if (!password) {

      $(".password-error").css("visibility", "visible");
      $(".password-error").css("opacity", "1");
      $(".password-error").css("height", "30px");
      var elem = $("#password");
      elem.on( "focus", function () {
        elem.css("box-shadow", "0 0 0 1px red");
        } );

      elem.on( "focusout", function () {
        elem.css("box-shadow", "0 0 0 0 red");
        }  );
      $("#password").css("border-color", "red");
      $("#password").css("margin-bottom", "0");
      $(".password-error").text("please enter password");

    }



    else {



    Accounts.createUser({
      email: email,
      password: password
    }, function(error) {
      if (error) {
        // TODO: add error
      }
    });

    Meteor.loginWithPassword(email, password, function(error) {
    if (error) {
      console.log("error while log in");
    }

    // clear form
    this.email = '';
    this.password = '';


    this.state.go('documents');

    }.bind(this));
  }



    }
  }



export default angular.module('signUp', [
  angularMeteor
]).component('signUp', {
  templateUrl: 'imports/components/auth/signUp.html',
  controller: SignUpCtrl
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('signup', {
      url: '/signup',
      template: '<sign-up></sign-up>'
    });
}
