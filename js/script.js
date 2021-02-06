var synth = window.speechSynthesis || speechSynthesis;

// var inputForm = document.querySelector('form');
// var inputTxt = document.querySelector('.txt');
// var voiceSelect = document.querySelector('select');
var listend = document.getElementById("listend");


var SpeachData = {
    STOP: 'stop it',
    HEY: 'hey bro',
    GM: 'good morning',
    GA: 'good afternoon',
    GE: 'good evening',
    GN: 'good night',
    TIME: 'what is time',
    HRW: 'how are you',
    FOF: 'f*** off',
    FOF1: 'f*** you',
    YOUTUBE: 'YouTube',
    SONG: 'play music',
    SONG1: 'play song'
}

var AboutToSpeak = {
    STOP: 'stop it',
    HEY: 'Yo man...! How are you...?!',
    GM: 'Very good morning. Have a nice day :)',
    GA: "Good Afternoon. :)",
    GE: 'Good evening...',
    GN: 'Good night.. Sweet dreams.......',
    TIME: 'what is time',
    HRW: "I'm very cool.. Thank you",
    FOF: 'you toooo..... and You are a bitch',
    YOUTUBE: 'YouTube',
    SONG: 'play music',
    SONG1: 'play song'
}

const checkSpechData = (txt) => {
    console.log("switch", txt);
    switch (txt) {
        case SpeachData.HEY:
            speachText(AboutToSpeak.HEY);
        case SpeachData.GM:
            speachText(AboutToSpeak.GM);
        case SpeachData.GE:
            speachText(AboutToSpeak.GE);
        case SpeachData.GA:
            speachText(AboutToSpeak.GA);
        case SpeachData.GN:
            speachText(AboutToSpeak.GN);
        case SpeachData.TIME:
            speachText("Now time is: " + new Date());
        case SpeachData.HRW:
            speachText(AboutToSpeak.HRW);
        case SpeachData.FOF:
        case SpeachData.FOF1:
            speachText(AboutToSpeak.FOF);
        case SpeachData.YOUTUBE:
            window.open('https://www.youtube.com/', '_blank');
        case SpeachData.SONG:
        case SpeachData.SONG1:
            window.open('https://www.youtube.com/watch?v=6GUm5g8SG4o', '_blank');

        default:
            speachText(SpeachData.STOP);
        // recognition.stop();
    }
}

// let stop = interimTransripts.includes("stop it");
// let wish = interimTransripts.includes("hey bro");
// let gm = interimTransripts.includes("good morning");
// let ga = interimTransripts.includes("good afternoon");
// let ge = interimTransripts.includes("good evening");
// let gn = interimTransripts.includes("good night");
// let time = interimTransripts.includes("what is time");
// let hru = interimTransripts.includes("how are you");
// let fof = interimTransripts.includes("f*** you");
// let fof1 = interimTransripts.includes("f*** off");
// let youtube = interimTransripts.includes("YouTube");
// let song = interimTransripts.includes("play music");
// let song1 = interimTransripts.includes("play song");

// DEFAULT VALUES
const rateVoice = 1.2;
const pitchVoice = 1.5;

var voices = [];



// var textOutput = document.getElementById("output");
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

var recognition = new webkitSpeechRecognition() ||
    root.mozSpeechRecognition ||
    root.msSpeechRecognition ||
    root.oSpeechRecognition ||
    root.SpeechRecognition;
recognition.continuous = true;
recognition.interimResults = true;

// function populateVoiceList() {
//     voices = synth.getVoices();
//     for (i = 0; i < voices.length; i++) {
//         var option = document.createElement('option');
//         option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
//         if (voices[i].default) {
//             option.textContent += ' -- DEFAULT';
//         }
//         option.setAttribute('data-lang', voices[i].lang);
//         option.setAttribute('data-name', voices[i].name);
//         voiceSelect.appendChild(option);
//     }
// }

// populateVoiceList();
// if (speechSynthesis.onvoiceschanged !== undefined) {
//     speechSynthesis.onvoiceschanged = populateVoiceList;
// }

function speachText(text) {
    // speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    const inpVal = text;
    let synth = window.speechSynthesis || speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(inpVal);
    utterThis.voice = voices[1];
    utterThis.pitch = pitchVoice;
    utterThis.rate = rateVoice;
    synth.speak(utterThis);
    utterThis.onpause = function (event) {
        // console.log(event);
        // var char = event.utterance.text.charAt(event.charIndex);
        // console.log('Speech paused at character ' + event.charIndex + ' of "' +
        //     event.utterance.text + '", which is "' + char + '".');
    }
}

window.onload = (event) => {
    setTimeout(() => {
        speachText("Welcome to the world. Try Say Something");
    });

    if ('speechSynthesis' in window) {
        startRecording();
        // recognition.start();
    } else {
    }
}



function startRecording() {
    recognition.onstart = function () {
        setTimeout(() => {
            document.getElementById('listend').innerHTML = "Try Say Something 🔊";
        }, 1000);
    }
    console.log(recognition);
    recognition.onresult = function (event) {
        listend.innerHTML = "";
        let textData = "";
        let textData1 = "";
        let length = event.results.length;
        // console.log("----11", event);

        for (var i = 0; i < length; i++) {
            if (event.results[i].isFinal) {
                textData1 += event.results[i][0].transcript;
                console.log("----", event.results);
            } else {
                textData = event.results[i][0].transcript;
                checkSpechData(textData);
                checkSpechData(textData);
                console.log("----****", textData);
            }
            // output.innerHTML = output.innerHTML + event.results[i][0].transcript;
            listend.innerHTML = textData1 + '<span style="color: #c6c2c2;">' + textData + '</span>'
        }
        // speachText(textData)
        // checkSpechData(textData);
        // populateVoiceList();
    }
    recognition.start();

    recognition.onend = function () {
        setTimeout(() => {
            document.getElementById('listend').innerHTML = "Recording Has Stopped 👏";
        }, 1000);
    }
}