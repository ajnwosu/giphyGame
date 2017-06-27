
var topics = [ "Mercedes Benz", "BMW", "Toyota", "Lexus", "Meserati", "Ferrari", "cobra", "Aston Martin" , "Acura", "Audi" , "Bentley" , "Bugatti" ]



// displayMovieInfo function re-renders the HTML to display the appropriate content


function displayGif() {

  var topic = $( this ).attr( "data-name" );

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax( {
    method: "GET",
    url: queryURL,
  } ).done( function( response ) {

    console.log( response )

    var carDiv = $( "<div class='car'>" );

    // Storing the rating data
    var results = response.data;

    // Looping over every result item
    for ( var i = 0; i < results.length; i++ ) {

      // Only taking action if the photo has an appropriate rating
      if ( results[ i ].rating !== "r" && results[ i ].rating !== "pg-13" ) {
        // Creating a div with the class "item"
        var gifDiv = $( "<div class='item'>" );

        // Storing the result item's rating
        var rating = results[ i ].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $( "<p>" ).text( "Rating: " + rating );

        // Creating an image tag
        var carImage = $( "<img>" );
       

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
       carImage.attr( "src", results[ i ].images.fixed_height.url );
       carImage.attr("data-still", results[i].images.fixed_height_still.url);
       carImage.attr("data-animate", results[i].images.fixed_height.url);
       carImage.attr("data-state", "still");

        // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append( p );
        gifDiv.append( carImage );

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $( "#car-here" ).prepend( gifDiv );

      }

    }
  } )

}

function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $( "#car-here" ).empty();

  // Looping through the array of movies
  for ( var i = 0; i < topics.length; i++ ) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $( "<button>" );
    // Adding a class
    a.addClass( "car" );
    // Adding a data-attribute with a value of the movie at index i
    a.attr( "data-name", topics[ i ] );
    // Providing the button's text with a value of the movie at index i
    a.text( topics[ i ] );
    // Adding the button to the HTML
    $( "#buttons-view" ).append( a );
  }
}

// This function handles events where one button is clicked
$( "#add-car" ).on( "click", function( event ) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var topic = $( "#car-input" ).val().trim();
  // The movie from the textbox is then added to our array
  topics.push( topic );
  $("#car-input").val("");
  // calling renderButtons which handles the processing of our movie array
  renderButtons();
} );


function animateGif() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $( this ).attr( "data-state" );

  
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  renderButtons();
});

$( document ).on( "click", ".car", displayGif );

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".item", animateGif);

