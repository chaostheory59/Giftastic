
var gifs = ["cats", "dogs", "alligators"];
function displayGifInfo() { 

var giffy = $("#gif-input").attr("data-name");
console.log(giffy);
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ giffy + "&rating=pg&api_key=1FYn9B9YNXnIRP2ks1ThtKVk04FWm7yD&limit=10";



// Creating an AJAX call for the specific gif button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // Creating a div to hold the gif
    
   var i = 0;
    

    for (var i = 0; i < response.data[i].length; i++) 
    {
       
        var gifDiv = $("<div>").addClass("gif-div");
        var tempRating = response.data[i].rating;
        var rating = $("<p>").html(tempRating);
        var still = response.data[i].images.fixed_height_still.url;
        var animate = response.data[i].images.fixed_height.url;
        console.log(rating);
        var gifImg = $("<img>").addClass("gif").attr({"src": still, "data-still": still, "data-animate": animate, "data-state": "still"});
        
        gifDiv.append(gifImg).append(rating);
        $("#add-gif").append(gifDiv);
        console.log(rating);
        console.log(gifImg);
      }
      document.getElementById("#gif-view").append(rating);
      document.getElementById("#gif-view").append(gifImg);
    });
}

 // Function for displaying gif data
 function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

     
      var a = $("<button>");
      // Adding a class of gif-btn to our button
      a.addClass("gif-btn");
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a gif button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();
    var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    // Adding gif from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "gif-btn"
  $(document).on("click", ".gif-btn", displayGifInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
