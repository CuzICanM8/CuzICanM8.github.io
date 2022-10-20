var alphabet = ['a','b','c','d','e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
var decValuesForEmojis = ['128000', '128001', '128002', '128003', '128004', '128005', '128006', '128007', '128008', '128009', '128010', '128011', '128012', '128013', '128014', '128015', '128016', '128017', '128018', '128019', '128020', '128021', '128022', '128023', '128024', '128025', ' '];

//variable to store the users emojis.
var emojis = null;
//get the elements from the html document
var clientText = document.getElementById('content');
var submitButton = document.getElementById('submitButton');
var outputText = document.getElementById('output');

var emojiContent = document.getElementById('emojiContent');
var decodeButton = document.getElementById('decodeButton');
var decodedOutput = document.getElementById('decodedOutput');

//function to check for special characters
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

function spamPrompt(msg) {
  //Spam the prompt so that the user can't access the website, I think.
  var password = 'SuperSecretPassword123'
  var userinput = prompt(msg);
  if(userinput != password) {
    spamPrompt('Incorect Password, try again.');
  }
}
spamPrompt("What's the password?");
function stringToEmojis(string) {
  if(!containsSpecialChars(string)) {
    var result = '';
    for(let i = 0; i < string.length; i++) {
      if(string[i] === ' ') {
        result += '_';
      }
      else {
        for(j=0; j < alphabet.length; j++) {
          if(string[i] == alphabet[j]) {
            result += '&#' + decValuesForEmojis[j] + ' '
          }
        }
      }
    }
    return result;
  }
  alert("Please remove all special characters before sending a message.");
  return null;
}

function emojisToString(string) {
  var result = '';
  var tempResult = []
  const splitEmoji = (string) => [...new Intl.Segmenter().segment(string)].map(x => x.segment)
  var stringArr = splitEmoji(string);
  for(var i = 0; i < stringArr.length; i++) {
    if(!(stringArr[i] === ' ')) {
      tempResult.push(stringArr[i].codePointAt(0).toString(10));
    }
    if(stringArr[i] === '_') {
      tempResult.push(' ');
    }
  }
  for(var i = 0; i < tempResult.length; i++) {
    for(var j = 0; j < decValuesForEmojis.length; j++) {
      if(tempResult[i] === decValuesForEmojis[j]) {
        result += alphabet[j]
      }
    }
  }
  return result;
}
submitButton.onclick = function() {
  emojis = stringToEmojis(clientText.value);
  if(emojis != null) {
    outputText.innerHTML = emojis;
  }
}

decodeButton.onclick = function() {
  emojis = (emojiContent.value);
  if(emojis != null) {
    decodedOutput.innerHTML = emojisToString(emojis);

  }
}
