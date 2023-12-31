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
    
    <div class="upper-row">

     <div class="tweet-header">
       <img src='${data.user.avatars}'></i>
       <p>${data.user.name}</p>
     </div>
    
    <div class="user-handle">${data.user.handle}</div></div>

    <div class="tweet-content">
      <p class="text-content for="all-tweets">${$('<div>').text(data.content.text).html()}</p>
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
      $section.prepend(newTweet);
      // $section.append($tweet);
    };
  };


  // grab a form
  const $form = $('#new-tweet-item');

  //listen for the submit event
  $form.on('submit', function (event) {
    //prevent the default behaviour
    event.preventDefault();

    //grab the data from the form and create urlencoded string
    const $formData = $(this).serialize();
    //get tweet value
    const $tweetText = $('#tweet-text').val();

    //hendle error mesage
    setTimeout(() => {
      $('.error-message').fadeOut('slow');
    }, 2000);

    $('.error-message').empty();

    //check for user input
    if ($tweetText === null || $tweetText === "") {
      // alert("You can not post an empty tweet!");
      $(".error-message").append('<i class="fa-solid fa-triangle-exclamation"></i> You can not post an empty tweet! <i class="fa-solid fa-triangle-exclamation"></i>').slideDown();
    } else if ($tweetText.length > 140) {
      // alert("Your tweet is to big! The text size should't exceed 140 characters");
      $(".error-message").append('<i class="fa-solid fa-triangle-exclamation"></i> Your tweet is to long! The text size should not exceed 140 characters! <i class="fa-solid fa-triangle-exclamation"></i>').slideDown();
    } else {
      //send POST request
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $formData,
      }).then(() => {
        $('#tweet-text').val('');
        $('#counter').val('140');
        loadTweets();
      }).catch((error) => {
        console.log(error);
      });
    }
  });

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log(tweets);
        renderTweets(tweets);
      }
    });
  };

  loadTweets();
});

