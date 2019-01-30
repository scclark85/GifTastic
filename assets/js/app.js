$(document).ready(function () {
    //topics variable with an array of shows
    var topics = ["Modern Family", "Friends", "Seinfeld", "This Is Us", "Game of Thrones", "Manifest", "Sesame Street"];
    // var cutOffRating = "PG-13";

    function renderButtons() {
        //will loop through the topics array
        $("#characterButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            
            a.addClass("topics-btn");
            a.attr("data-show", topics[i]);
            a.text(topics[i]);
            $("#characterButtons").append(a);
        }
    }
    renderButtons()

    function displayGif() {
        // Grabbing and storing the data-show property value from the button
        var show = $(this).attr("data-show");

        // Constructing a queryURL using the show name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            show + "&api_key=dc6zaTOxFJmzC&limit=10&rating=";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class=gifs>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var images = $("<img>");
                    
                    images.attr("src", results[i].images.fixed_height_still.url);
                    images.attr("data-still", results[i].images.fixed_height_still.url);
                    images.attr("data-state", "still");
                    images.addClass("gif");
                    images.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the gifDiv
                    gifDiv.append(p);
                    gifDiv.append(images);


                    // Prependng the giflDiv to the HTML page
                    $("#gifsView").prepend(gifDiv);
                }
            });

    };

    $("#addShow").on("click", function (event) {
        event.preventDefault();
        var newButton = $("#show-input").val().trim();

        console.log(newButton);
        topics.push(newButton);

        renderButtons();
    });

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".topics-btn", displayGif);
});  //page closing brackets




