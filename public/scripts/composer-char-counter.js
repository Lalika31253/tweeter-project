$(document).ready(function () {

  $('#tweet-text').on('input', function () {

    // get the current value of the element
    const tweet = $(this).val();
    
    let charectersLeft = 140 - tweet.length;

    //update the tweet counter 
    $('#counter').text(charectersLeft);

    if (charectersLeft < 0) {
      $('#counter').css('color', 'red')
    } else {
      $('#counter').css('color', '#45474B')
    }
  })
});