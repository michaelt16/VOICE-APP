document.addEventListener("DOMContentLoaded", ()=>{
    runScript();
})

function runScript (){
 let speech = new webkitSpeechRecognition() || new SpeechRecognition();
 speech.addEventListener("audioend", ()=>{

    console.log("Test")


 })

 document.querySelector (".fa-microphone").addEventListener("click", micOn)
 
}


function micOn (){
//  document.querySelector (".mic").style.color = "red";
let diagnostic = document.querySelector('.output');
diagnostic.textContent = "Ready to receive a color command..."
 var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = [ 'red', ' blue' , 'white' , 'green', 'yellow' , 'purple', 'pink' , 'orange' ];

 // this grammar format i got online its called JSpeech Grammer Format
// var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

//addFromString Documentation https://developer.mozilla.org/en-US/docs/Web/API/SpeechGrammarList/addFromString
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;



let bg = document.querySelector('html');
let hints = document.querySelector('.hints');

let colorHTML= '';
colors.forEach(function(value, index){
  console.log(value, index);
  colorHTML += '<span style="background-color:' + value + ';"> ' + value + ' </span>';
});
// hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onnomatch = function(event) {
    diagnostic.textContent = 'I didn\'t recognize that color.';
  }
recognition.onresult = function(event) {
    var color = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + color + '.  ' + 'Confidence: ' + Math.round(event.results[0][0].confidence * 100) +"%";
    bg.style.backgroundColor = color;
    console.log('Confidence: ' + event.results[0][0].confidence);
  }
 
  recognition.onspeechend = function() {
    recognition.stop();
  }
 
  recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  }
  


}
