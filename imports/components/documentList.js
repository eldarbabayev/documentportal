import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './documentList.html';

class DocumentListCtrl {
  constructor($scope) {

      $scope.pdfs = [{
          title: 'functinal programming 1',
          url: "pdf/1.pdf"
        }, {
          title: 'functinal programming 2',
          url: "pdf/2.pdf"
        }, {
          title: 'functinal programming 3',
          url: "pdf/3.pdf"
        }, {
          title: 'functinal programming 4',
          url: "pdf/4.pdf"
        }, {
          title: 'functinal programming 5',
          url: "pdf/5.pdf"
        }, {
          title: 'functinal programming 6',
          url: "pdf/6.pdf"
        }, {
          title: 'functinal programming 7',
          url: "pdf/7.pdf"
        }];

        var email = Meteor.user().emails[0].address

        $(".email").text(email);
    }

    logOut() {
      Meteor.logout(function(){
      });
    }

    view() {
    }

    closeNav() {
      angular.element("#modal_overlay").css("visibility", "hidden");
      angular.element("#modal_overlay").css("opacity", "0");
    }

};

export default angular.module('documentList', [
  angularMeteor
]).component('documentList', {
  templateUrl: 'imports/components/documentList.html',
  controller: DocumentListCtrl
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('documents', {
      url: '/documents',
      template: '<document-list></document-list>'
    });
}
