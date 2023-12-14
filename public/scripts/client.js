/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Wrapping all the code into the $(doc..) func to ensure 
//that JS code won't run until the DOM is fully loaded
$(document).ready(function() {
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const newTweet = createTweetElement(tweet); 
    // takes return value and appends it to the tweets container
    $('.all-tweets').append(newTweet);
  };
  
};

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
        <h6>${data.created_at}</h6>
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
  
  renderTweets(data);

});
