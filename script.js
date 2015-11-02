$(document).on('ready page:load', function(){
  var score = 0;
  var health = 3;
  var width = screen.width - 100;
  var height = screen.height - 200;
  var timeout;
  var level = 1;

  $("#start").on("click", function(){
    $(this).hide();
    genCircle();
  });


  //using the key code values 65-90, randomly creates an alphabet letter between A-Z
  //randomly creates a location of the circle
  //using the random colour, random alphabet letter, and random position, creates circle on screen
  function genCircle(){
    if($('.circle').size() == 20){
      gameOver();
    }else{
      var colour = randomColour();
      var randCharCode = Math.floor(Math.random() * (90 -65 +1)) + 65;
      var character = String.fromCharCode(randCharCode);
      var top = Math.ceil(Math.random() * height);
      var left = Math.ceil(Math.random() * width);
      $('#gameArea').append('<span class="circle circle' + randCharCode + '" style="left: '+ left + 'px; top: ' + top +'px; background-color: #' + colour +'">' + character + '</span>');
      nextLevel = setInterval(addAnimation, 10000);
      if (level != 1){
        chngeAnmtionTimeout = setInterval(changeAnimation, 30000);
      }
      genTimeout = setTimeout(genCircle, 1500);
    }
  }

  //creates a random hexadecimal value for the circle
  function randomColour(){
    var colour = '';
    var hexavalues = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (var i = 0; i < 6; i++) {
      var index = Math.floor(Math.random() * 15);
      colour += hexavalues[index];
    }
    return colour;
  }

  function gameOver(){
    clearTimeout(genTimeout);
    clearInterval(chngeAnmtionTimeout);
    $(".circle").toggle("explode").remove();
    alert("Your score is: " + score);
    $("#start").show().removeAttr( "display" );

    score = 0;
    $("#score").html(score);
    health = 3;
    $("#health").html(health);

  }

  //Will read a key code upon pressing an alphabet letter on the keyboard
  //destroys all circles on screen with corresponding keycode

    $(document).keydown(function(event){
       if ($('#start').is(":hidden")){
        var keyCode = event.keyCode;
        if($(".circle"+keyCode).length){
          var amount = $(".circle" + keyCode).size();
          $(".circle" + keyCode).toggle("explode").remove();
          score += (amount*20); //give players more points depending on how many letters of the same type are on screen
          $('#score').html(score);
        }else{

          if(health > 0){ //each time a player types a letter that is not on screen, they lose a life
            health -= 1
            $("#health").html(health);
          }else{
            gameOver();
          }
        }
      }
    });


  function addAnimation(){
    level += 1;
  }

  function changeAnimation(){
    var allCircles = $(".circle").toArray();
    var randomCircle = allCircles[Math.floor ( Math.random() * allCircles.length )];
    // if (level == 2){
    //   $(randomCircle).hide().delay(600).show()
    //   changeAnimation();
    // }
    if (level > 1){
    $(randomCircle)
            .animate(
                { "left": "+=200" }, {
                    duration: 'slow',
                    easing: 'easeOutBack'
                })
            .animate(
                { "left": "-=200" }, {

                    duration: 'slow',
                    easing: 'easeOutBack',
                    complete: function(){
                      changeAnimation();
                    }
              });
           }
  }

});



//set lives, set max amount of circles allowed to be on screen, multiply points when key is pressed and multiple circles are destroyed, change circle behaviour through animation as time goes by



