/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Wrapping all the code into the $(doc..) func to ensure 
//that JS code won't run until the DOM is fully loaded
$(document).ready(function () {
  console.log("Client works");

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = function (data) {

    const $tweet = $(`
  <div class="tweet-article">

      <div class="tweet-header">
        <i class="fa-solid fa-user-nurse fa-xl"></i>
        <p>${data.user.name}</p>
      </div>

      <div class="tweet-content">
        <h3>${data.content.text}</h3>
        <textarea name="text" id="tweet-text"></textarea>
      </div>

      <div class="tweet-footer">
        <h6>${timeago.format(data.created_at)}</h6>
        <div>
          <i class="fa-solid fa-flag fa-sm"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart fa-sm"></i>
        </div>

      </div>

    </div>
    `);

    return $tweet;
  };

  const $section = $('.all-tweets');

  const renderTweets = function (tweets) {
    //empty the container
    $section.empty();

    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const newTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $section.append(newTweet);
      // $section.append($tweet);
    };
  };


  // grab a form
  const $form = $('#new-tweet-item');
  //listen for the submit event
  $form.on('submit', function (event) {
    //prevent the default behaviour
    event.preventDefault();
    console.log("The form has submitted");

    //grab the data from the form
    //create urlencoded string
    const $formData = $(this).serialize();
    console.log($formData);
    //get tweet value
    const $tweetText = $('#tweet-text').val();

    //send POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $formData,
      // succss: () => {
      //   console.log("Post request resolved successfully");
      //   //make a GET request to retrieve all tweet items
      //   loadTweets();
    }).then(() => {
      $('#tweet-text').val('');
      loadTweets();
    }).catch((error) => {
      console.log(error);
    });


  });

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        console.log(tweets);
        renderTweets(tweets);
      }
    });
  };

  loadTweets();
});

