// SETTINGS
// SETTINGS
// SETTINGS
let WPM = 0
let TargetWPM = 150
let SpeedTransitionIncrement = 50
let Text = 'Palladianism (ja palladionism) ehk Palladio stiil on itaalia arhitekti Andrea Palladio (1508–1580) loomingust mõjutatud klassitsistlik ehituslaad. Palladianismi iseloomustab sammaste rohkus ja sümmeetrilisus, matkides nii antiiktemplite arhitektuuri. Palladianism sai populaarseks Briti saartel 17. sajandi keskel ja Põhja-Ameerikas 18. sajandi keskel. Moest hakkas see minema 19. sajandi algul, ehkki üksikuid palladianistlikke maju ehitati 20. sajandi alguseni. Eriti kasutati seda stiili avalike ja munitsipaalhoonete rajamisel. Kõik Palladio enese projekteeritud hooned asuvad Venetos. Vicenzas on tema losse nii palju, et seda kutsutakse Palladio linnaks. Palladio järgis Vana-Rooma arhitekti Vitruviuse ja 15. sajandi arhitekti Leon Battista Alberti põhimõtteid, mis vastasid klassikalisele Vana-Rooma arhitektuurile. Palladio majad on tüüpiliselt keskelt kolmekorruselised, kummalegi küljele jäävad tiivad võivad olla madalamad. Maale ehitas ta kaheotstarbelisi hooneid: niihästi põllumajanduse otstarbeks kui ka rikastele elamiseks. Põllumajandusele mõeldud tallid ja aidad paiknesid hoone tiibades ja olid ühekorruselised, aga et nad lossi keskosale liiga lähedale ei jääks, olid tiivad väga pikad ja vahel keskse hoonega üksnes kolonnaadi abil ühendatud.'
// i dont think this is gonna work out

// SCRIPT
// SCRIPT
// SCRIPT

let Playing = false
let index = 0

let formattedText = Text.split(" ");
var Length = formattedText.length

//console.log("Word count : " + Length)

let pause = document.getElementById("pause");
let play = document.getElementById("play");

let wordDisplay = document.getElementById("changetext"); // waa waaa, this isnt proper variable naming, waa waa 😭😭

wordDisplay.Content = ""

function UpdateButtonVisuals() {

    if (Playing === false) {
        pause.style.display = "none";
        play.style.display = "contents";
    } else {
        pause.style.display = "contents";
        play.style.display = "none";
    }
}
function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }

function PlayPause(TryToStart) {
    console.log("Index: " + index)
    if (TryToStart === undefined || TryToStart === null) {
        TryToStart = true;
    }

    Playing = !Playing
    UpdateButtonVisuals()
    if (TryToStart && Playing) {
       if (index >= (Length-1)) {
        index = 0
       }
       WPM = 100
       function iterate() {

           if (index < Length && Playing) {

               let wordToDisplay = formattedText[index];
               let wordLength = wordToDisplay.length;

               // Calculate the number of characters to show on the left and right of the optimal recognition point
               let charactersToShow = Math.ceil(wordLength / 2);

               // Extract characters for left and right parts
               let leftPart = wordToDisplay.substring(0, charactersToShow);
               let rightPart = wordToDisplay.substring(charactersToShow + 1); // Exclude the character at the optimal recognition point

               // Extract the character at the optimal recognition point
               let recognitionPoint = wordToDisplay.charAt(charactersToShow);

               // Calculate the total width of the displayed word
               let wordWidth = leftPart.length + rightPart.length + 1; // Adding 1 for the highlighted character

               // Calculate padding for both sides of the highlighted character
               let padding = Math.floor((wordWidth - 1) / 2);

               // Combine left part, optimal recognition point, and right part with padding
               let formattedWord = 
                   "<span style='color: black;'>" + leftPart + "</span>" +
                   "<span style='color: red;'>" + recognitionPoint + "</span>" +
                   "<span style='color: black;'>" + rightPart + "</span>";

               // Apply padding for both sides of the formatted word
               formattedWord = formattedWord.padStart(formattedWord.length + padding, ' ');
               formattedWord = formattedWord.padEnd(formattedWord.length + padding, ' ');

               // Display the word
               wordDisplay.innerHTML = formattedWord;
               
               let OldWPM = WPM
               if (Math.abs(WPM-TargetWPM) > SpeedTransitionIncrement){
                   let Dir = clamp(TargetWPM-WPM,-1,1)
                   WPM = WPM + Dir*SpeedTransitionIncrement
               } else {
                   WPM = TargetWPM
               }
               if (OldWPM != WPM){
                   console.log(WPM)
               }
               
               let element = document.getElementById("progress")
               element.style.width = ((index/(Length-1))*100) + "%";

               // Calculate the duration to display the word based on the number of characters
               
             index++;
             if (index < Length && Playing) {
               setTimeout(iterate, (60/WPM)*1000 + wordLength*10);
             } else {
               if (Playing) {
                   //index = 0
                   PlayPause(false)
               }
           }
           } 
       }
       iterate()
    }
}
function ChangeSpeed(Speed) {
    var buttons = document.querySelectorAll('.button')
    let buttonNumber = (Speed-150)/100
    buttons.forEach(function(button, index) {
        if (index === buttonNumber) {
          button.classList.add('blue');
        } else {
          button.classList.remove('blue');
        }
      });
    
    TargetWPM = Speed
}
function OffsetIndex(Num) {
    index = clamp(index+Num,0,Length)

    let wordToDisplay = formattedText[index];
    let wordLength = wordToDisplay.length;

    // Calculate the number of characters to show on the left and right of the optimal recognition point
    let charactersToShow = Math.ceil(wordLength / 2);

    // Extract characters for left and right parts
    let leftPart = wordToDisplay.substring(0, charactersToShow);
    let rightPart = wordToDisplay.substring(charactersToShow + 1); // Exclude the character at the optimal recognition point

    // Extract the character at the optimal recognition point
    let recognitionPoint = wordToDisplay.charAt(charactersToShow);

    // Calculate the total width of the displayed word
    let wordWidth = leftPart.length + rightPart.length + 1; // Adding 1 for the highlighted character

    // Calculate padding for both sides of the highlighted character
    let padding = Math.floor((wordWidth - 1) / 2);

    // Combine left part, optimal recognition point, and right part with padding
    let formattedWord = 
        "<span style='color: black;'>" + leftPart + "</span>" +
        "<span style='color: red;'>" + recognitionPoint + "</span>" +
        "<span style='color: black;'>" + rightPart + "</span>";

    // Apply padding for both sides of the formatted word
    formattedWord = formattedWord.padStart(formattedWord.length + padding, ' ');
    formattedWord = formattedWord.padEnd(formattedWord.length + padding, ' ');

    // Display the word
    wordDisplay.innerHTML = formattedWord;
    
    let OldWPM = WPM
    if (Math.abs(WPM-TargetWPM) > SpeedTransitionIncrement){
        let Dir = clamp(TargetWPM-WPM,-1,1)
        WPM = WPM + Dir*SpeedTransitionIncrement
    } else {
        WPM = TargetWPM
    }
    if (OldWPM != WPM){
        console.log(WPM)
    }
    let element = document.getElementById("progress")
    element.style.width = ((index/(Length-1))*100) + "%";
}
ChangeSpeed(150);
UpdateButtonVisuals()