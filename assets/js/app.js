$(document).ready(function () {
    //topics variable with an array of family guy characters
    var topics = ["Peter Griffin", "Lois Griffin", "Stewie Griffin", "Meg Griffin", "Chris Griffin", "Brian Griffin"];

    //render all the buttons w/ the array
    function renderButtons() {
        //will loop through the topics array
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            // Adding a class
            a.addClass("topics-btn");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the movie at index
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#images").append(a);
        }
    }
    renderButtons()

    // This function handles events where one button is clicked
    // $("add-character").on("click", function (event) {
    //     event.preventDefault();
    //     var char = $("#characterButtons").val().trim();
    //     char.push(char);
    //     renderButtons();
    // });


    //search giph function pulling up family guy characters
    function displayCharacters() {
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=familyguy&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var imageUrl = response.data.image_original_url;

            // Creating and storing an image tag
            var famImage = $("<img>");

            // Setting the images src attribute to imageUrl
            famImage.attr("src", imageUrl);
            famImage.attr("alt", "fam image");

            // Prepending the images to the images div
            $("#images").prepend(famImage);
        });
    };
    displayCharacters()

    //submit button function
    $("#addCharacter").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);

        renderButtons();

        return false;
    });
    //need a var userInput

    //display gif function - refer to assignment 14
    function gifDisplay() {
        //need rating diplayed
        //need images displayed
    };
    gifDisplay()

    
    //on click function to pause and unpause gif
    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".topics-btn", displayCharacters);

    //function for the user input - NYT search
});



