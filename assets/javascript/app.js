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

function displayGifs() {
  let topic = $(this).attr("data-name");
  topicQuery = topic.trim();
  console.log(topicQuery);
  topicQuery = topicQuery.replace(/\s/g, "+");
  console.log(topicQuery);

  let APIkey = "NFW4pj2TL5I4F9PKHBpx4bG1qYz0G92d";
  let queryURL = `http://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${
    topicQuery
  }`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(data => {
    let topGifs = data.data;
    console.log(topGifs);

    $("#gifs").empty();
    $("#topic").html(`
              <h4>${topic}!</h4>
              `);

    for (let i = 0; i < 10; i++) {
      $("#gifs").append(`
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <img class="gifs" src="${topGifs[i].images.fixed_width_still.url}"><br>
      <span>Rating: ${topGifs[i].rating}</span>
      </div>
        `);
    }

    // $(document).on("click", ".gifs", function() {
    //   $(this).attr("src", `${topGifs[this].images.fixed_width.url}`);
    // });
  });
}

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

$("#add-topic").on("click", event => {
  event.preventDefault();

  let newTopic = $("#topic-input")
    .val()
    .trim();

  topics.push(newTopic);

  renderButtons();
});

$(document).on("click", ".topic", displayGifs);

$(document).ready(function() {
  renderButtons();
});
