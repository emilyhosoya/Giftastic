// initial topic list
let topics = [
  "Figure Skating",
  "Bobsleigh",
  "Ski Jump",
  "Biathlon",
  "Alpine Skiing",
  "Freestyle Skiing",
  "Sled Dog Racing",
  "Luge",
  "Curling",
  "Speed Skating",
  "Snowboarding",
  "Hockey",
  "Cross Country Skiing"
];

// render buttons for each topic
function renderButtons() {
  $("#buttons-view").empty();

  topics.forEach(element => {
    let button = $("<button>");
    button.addClass("topic btn btn-primary");
    button.attr("data-name", element);
    button.text(element);
    $("#buttons-view").append(button);
  });
}

// display top 10 gifs
function displayGifs() {
  let topic = $(this).attr("data-name");
  topicQuery = topic.trim();
  console.log(topicQuery, "was picked!");
  topicQuery = topicQuery.replace(/\s/g, "+");
  console.log("Search query:", topicQuery);

  let APIkey = "NFW4pj2TL5I4F9PKHBpx4bG1qYz0G92d";
  let queryURL = `http://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${
    topicQuery
  }`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(data => {
    let topGifs = data.data;
    console.log("Query results:", topGifs);

    $("#gifs").empty();
    $("#topic").html(`
              <h4>${topic}!</h4>
              `);

    let currentGifs = [];

    for (let i = 0; i < 10; i++) {
      currentGifs.push({
        staticImg: topGifs[i].images.fixed_width_still.url,
        animatedImg: topGifs[i].images.fixed_width.url,
        rating: topGifs[i].rating
      });

      $("#gifs").append(`
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <img class="gifs" src="${currentGifs[i].staticImg}"><br>
      <span>Rating: ${currentGifs[i].rating}</span>
      </div>
        `);
    }

    console.log("Top 10 gifs", currentGifs);

    // turn gifs from static to animated
    $("img").click(function() {
      let clicked = $("img").index(this);
      let src = this.currentSrc;
      console.log(`Clicked the image at index ${clicked}: ${src}`);

      // grep, filter, contains?

      // why is this true?
      if (!$.contains(document.body, src)) {
        console.log("The image is static. Animating it...");
        // src.toString().replace("_s.gif", ".gif");
        // console.log(src);
      } else {
        console.log("The image is animated. Turning it static...");
      }

      //   currentGifs.filter(function(obj) {
      //     return obj.staticImg == this.currentSrc;
      //   });

      //   $.grep(currentGifs, function(this) {
      //     if (currentGifs.find(this.currentSrc) === currentGifs.staticImg) {
      //         console.log("The image is static. Changing it to a gif...");
      //         // clicked.attr("src", currentGifs.indexOf(curr));
      //       } else {
      //         console.log("The image is a gif. Turning it static...");
      //       }
      //   });
    });
  });
}

// allow user to input a new topic
$("#add-topic").on("click", event => {
  event.preventDefault();

  let newTopic = $("#topic-input")
    .val()
    .trim();

  topics.push(newTopic);

  renderButtons();
});

// on 'Submit', new topic is added
$(document).on("click", ".topic", displayGifs);

// initial page load function
$(document).ready(function() {
  renderButtons();
});
