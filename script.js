// function Circle(element){
//   this.diameter = 40;
//   this.x = Math.ceil(Math.random() * 500 - 40));
//   this.y = Math.ceil(Math.random() * 500 - 40));

//   this.element = $(element);

//   this.element.css({
//     top: this.x,
//     left: this.y
//     width: this.diameter
//     height: this.diameter
//   });


// }
$(document).on('ready page:load', function(){
  var score = 0;
  var health = 3;
  var width = screen.width - 100;
  var height = screen.height - 200;
  var timeout;
  genCircle();

  //using the key code values 65-90, randomly creates an alphabet letter between A-Z
  //randomly creates a location of the circle
  //using the random colour, random alphabet letter, and random position, creates circle on screen
  function genCircle(){
    var colour = randomColour();
    var randCharCode = Math.floor(Math.random() * (90 -65 +1)) + 65;
    var character = String.fromCharCode(randCharCode);
    var top = Math.ceil(Math.random() * height);
    var left = Math.ceil(Math.random() * width);
    $('body').append('<span class="circle circle' + randCharCode + '" style="left: '+ left + 'px; top: ' + top +'px; background-color: #' + colour +'">' + character + '</span>');
    timeout = setTimeout(genCircle, 1000);
  }

  //creates a random hexadecimal value for the circle
  function randomColour(){
    var colour = '';
    var hexavalues = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (var i = 0; i < 6; i++) {
      index = Math.floor(Math.random() * 15);
      colour += hexavalues[index];
    }
    return colour;
  }

  //Will read a key code upon pressing an alphabet letter on the keyboard
  //destroys all circles on screen with corresponding keycode
  $(document).keydown(function(event){
    var keyCode = event.keyCode;
    if($(".circle"+keyCode).length){
      var amount = $(".circle" + keyCode).size();
      $(".circle" + keyCode).remove();
      score += (amount*20);
      $('#score').html(score);
    }else{

      if(health > 0){
        health -= 1
        $("#health").html(health);
      }else{
        clearTimeout(timeout);
        $(".circle").remove();
      }
    }
  });
});



//set lives, set max amount of circles allowed to be on screen, multiply points when key is pressed and multiple circles are destroyed, change circle behaviour through animation as time goes by



