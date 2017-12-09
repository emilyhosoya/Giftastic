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
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${
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
        id: "gif-" + [i],
        isStatic: true,
        staticImg: topGifs[i].images.fixed_width_still.url,
        animatedImg: topGifs[i].images.fixed_width.url,
        rating: topGifs[i].rating,
        currentSrc: function() {
          if (this.isStatic) {
            return this.staticImg;
          } else {
            return this.animatedImg;
          }
        }
      });

      $("#gifs").append(`
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <img 
        class="gifs" 
        id="${currentGifs[i].id}" 
        data-isStatic="${currentGifs[i].isStatic}"
        data-staticSrc="${currentGifs[i].staticImg}"
        data-animatedSrc="${currentGifs[i].animatedImg}"
        src="${currentGifs[i].currentSrc()}"
        /><br>
      <span>Rating: ${currentGifs[i].rating}</span>
      </div>
        `);
    }

    console.log("Top 10 gifs", currentGifs);
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

// changing gifs from static to animated and vice versa
$(document).on("click", ".gifs", function() {
  let clicked = $(this).attr("id");
  // this is not accessing the currentGifs array:
  let isStatic = $(this).attr("data-isStatic");
  let src = $(this).attr("src");
  console.log(`Clicked ${clicked} (is static: ${isStatic}): ${src}`);

  if (isStatic === "true") {
    console.log("The image is static. Animating it...");
    $(this).attr("src", $(this).attr("data-animatedSrc"));
    $(this).attr("data-isStatic", false);
  } else if (isStatic === "false") {
    console.log("The image is animated. Turning it static...");
    $(this).attr("src", $(this).attr("data-staticSrc"));
    $(this).attr("data-isStatic", true);
  }
});

// initial page load function
$(document).ready(function() {
  renderButtons();
});
