function randomUserName(){

  //var numUsed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  //var letterUsed = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  var formerUsed = ['cool', 'good', 'plain', 'kind', 'badass']
  var latterUsed = ['people', 'AI', 'alien', 'android', 'wanderer']

  var realFormerUsed = formerUsed[Math.floor(Math.random() * 5)];//generate random number between 0 to 4
  var realLatterUsed = latterUsed[Math.floor(Math.random() * 5)];

  document.write(realFormerUsed  + " " + realLatterUsed + " joined chatting.");
}

//window.onload = randomUserName();
