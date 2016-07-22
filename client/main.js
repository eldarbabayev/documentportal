import angular from 'angular';
import angularMeteor from 'angular-meteor';
import signUp from '../imports/components/auth/signUp';
import logIn from '../imports/components/auth/logIn';
import documentList from '../imports/components/documentList';

//export const Documents = new Mongo.Collection("documents");

angular.module('documentportal', [
  angularMeteor,
  require('angular-animate'),
  'ui.router',
  signUp.name,
  logIn.name,
  documentList.name
]).config(config);

angular.module('documentportal').directive('x', function() {
  return {
    scope: {},
    restrict: 'AE',
    link: function(scope, element, attribute) {
      element.css({"background-color": "yellow"});
    }
   };
});

angular.module('documentportal').directive('fadeIn', function() {
  return {
    scope: {},
    restrict: 'AE',
    link: function(scope, element, attribute) {
      $(document).ready(function () {
          element.fadeIn(300);
      });
    }
   };
});



angular.module('documentportal').directive('pdfIcons', function($timeout) {
  return {
    scope: {
      model: '='
      },
    restrict: 'AE',
    link: function(scope, element, attribute) {

      // set the pdfjs worker source. not sure if PDFjs uses 'webworkers' API of HTML5
      PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
        // check for necessary features
        var PDF_FILES_DIRECTORY = "/pdf/", // this demo is currenlty put as gist which does not support directories
            // these files should exist in the given path to display correctly
            PDF_FILES = [{file_name: '1603.00748v1.pdf', title: 'Continuous Deep Q-Learning with Model-based Acceleration', url: '/pdf/1603.00748v1.pdf'} , {file_name: '1511.01844v2.pdf', title: 'A Note On The Evaluation Of Generative Models', url: '/pdf/1511.01844v2.pdf'}, {file_name: '1606.03401v1.pdf', title: 'Memory-Efficient Backpropagation Through Time', url: '/pdf/1606.03401v1.pdf'}, {file_name: '1606.04080v1.pdf', title: 'Matching Networks for One Shot Learning', url: '/pdf/1606.04080v1.pdf'}, {file_name: '1606.04460v1.pdf', title: 'Model-Free Episodic Control', url: '/pdf/1606.04460v1.pdf'}];

        $.each( PDF_FILES, function (index, pdf_file) {

            PDFJS.getDocument( PDF_FILES_DIRECTORY + pdf_file.file_name ).then( function (pdf) {

                pdf.getPage(1).then( function (page) {

                    var viewport = page.getViewport(0.5);
                    // PDF.js returns a promise when it gets a particular page from the pdf object
                    // A canvas element is used to render the page and convert into an image thumbnail
                    // if single canvas is used, the content gets overridden when PDF.js promises resolve for subsequent files
                    // so a dedicated canvas element is created for rendering a thumbnail for each pdf
                    // the canvas element is discarded once the thumbnail is created.
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };

                    page.render(renderContext).then( function() {

                        //set to draw behind current content
                        ctx.globalCompositeOperation = "destination-over";
                        //set background color
                        ctx.fillStyle = "#fff";
                        //draw on entire canvas
                        ctx.fillRect( 0, 0, canvas.width, canvas.height );
                        // create an img from the canvas which contains the page contents
                        var img_src = canvas.toDataURL();
                        var $img = $("<img>")
                                        .attr("src", img_src);

                        var file_details = {
                            "name": pdf_file,
                            "pages": pdf.pdfInfo.numPages
                        };

                        var $description = $("<div>")
                                            .attr("class", "descr");

                        var txt;

                        if (pdf_file.title.length > 25) {
                          txt = pdf_file.title.slice(0, 25) + "..";
                        } else {
                          txt = pdf_file.title;
                        }

                        var $title = $("<p>")
                                        .attr("class", "title").text(txt);


                        $description.append($title);



                        var $thumb = $("<div>")
                                        .attr("class", "thumb" + " a" + index)
                                        .attr("data-pdf-details", JSON.stringify(file_details))
                                        .append($img).append($description).on("click", function() {

                                          var myClass = $(this).attr("class");
                                          var indx = myClass.slice(-1);
                                          console.log(indx);
                                          console.log(PDF_FILES[indx].url);
                                          var old_embed = angular.element('#file');
                                          var new_embed = old_embed.clone();
                                          new_embed.attr("src", PDF_FILES[indx].url);
                                          old_embed.replaceWith(new_embed);
                                          angular.element('#modal_overlay').css("visibility", "visible");
                                          angular.element("#modal_overlay").css("opacity", "1");
                                        });





                        $thumb.appendTo(".thumbnail");

                        // Overlay
                        var $overlay = $("<div>")
                                          .attr("class", "thumb_overlay");


                        var $img_eye = $("<img>")
                                        .attr("class", "eye")
                                        .attr("src", "/img/eye-3-xxl.png");

                        $overlay.append($img_eye);
                        $thumb.append($overlay);

                        // we have created a thumbnail and rendered the img from the canvas
                        // discard the temporary canvas created for rendering this thumbnail
                        canvas.remove();
                    });
              }); // end of getPage
            }); // end of getDocument
        }); // end of each
        }
      };
    });





// Router
function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/signup');
}
