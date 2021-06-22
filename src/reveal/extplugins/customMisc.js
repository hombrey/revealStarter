
//{{{custom keybindings for slides
let showNote = false;
let style = document.createElement('style');

window.addEventListener("keyup", evalKeyUp, false); 
function evalKeyUp(evnt) {
        let keyPressed = evnt.keyCode;

    switch (keyPressed) {
        case 84 : toggleNotes();break;
        case 37 : //arrow keys
        case 38 :
        case 39 :
        case 40 : onSlideChange(); break;
        default : return;
    } //switch (keyPressed)

} //evalKey(event)


function onSlideChange() {
    if (showNote) {insertCss(".note {display: none;}");showNote=false;}
    closeVidPlayer();
} //onSlideChange()

function toggleNotes() {
    if (showNote) {insertCss(".note {display: none;}");showNote=false;}
    else if (!showNote) {insertCss(".note {display: block;}");showNote=true;}

    //let noteClass = document.getElementsByClassName("note");
    //noteClass.setAttribute ('style', 'display:none');
} //function toggleNotes(){

function insertCss( code ) {
        style.innerHTML = code;
        document.getElementsByTagName("head")[0].appendChild( style );
} //function insertCss( code)
//}}}custom keybindings for slides

//{{{custom keybindings for video player 
let clickedVid;
let osdTimeout = 3000;
let osdTimer;
let vidOSD;
let playRate = 1;
let isVidInitiated=false;

function initVidPlayer(clicked_id) {
    isVidInitiated = true;
    clickedVid = document.getElementById(clicked_id);
    clickedVid.setAttribute("controls","controls") ; 
    //clickedVid.currentTime+=5;
    window.addEventListener("keydown", evalCtrlKey, false);
} //function initVidPlayer(id)

function closeVidPlayer() { 
    if (isVidInitiated) {
        clickedVid.removeAttribute("controls");
        window.removeEventListener("keydown", evalCtrlKey);
        playRate = 1;
        clickedVid.playbackRate = playRate;
    } //if (isVidInitiated)
} //function closeVidPlayer()


function showOSD(rate) {
    if (vidOSD) {
        vidOSD.textContent = rate + "X";
    } else {
        vidOSD = document.createElement("DIV");
        vidOSD.style.cssText = "position:fixed;z-index:999999999;right:5px;bottom:5px;margin:0;padding:5px;width:auto;height:auto;font:bold 10pt/normal monospace;background:#444;color:#fff";
        vidOSD.textContent = rate + "X";
        document.body.appendChild(vidOSD);
    } // if (vidOSD)
    clearTimeout(osdTimer);
    osdTimer = setTimeout(function() {
        vidOSD.remove();
        vidOSD = null;
    }, osdTimeout);
} // function showOSD(rate)


function evalCtrlKey(evnt) {
       let keyPressed = evnt.keyCode;
       let rateIncValue = 0.2;

    //console.log ("Pressed:"+keyPressed);
    switch (keyPressed) {
        case 32 : if(event.ctrlKey) { evnt.preventDefault();
                    if (clickedVid.paused) clickedVid.play();
                    else clickedVid.pause();
                 }; //if (event.ctrlKey)
                 break; //spaebar
        case 72 : if(event.ctrlKey) { evnt.preventDefault();
                    playRate -= rateIncValue;
                    if (playRate < 0.1) playRate = 0.1;
                    playRate = parseFloat(playRate.toFixed(2));
                    clickedVid.playbackRate = playRate;
                    if (osdTimeout > 0) showOSD(clickedVid.playbackRate);
                 }; //if (event.ctrlKey)
                 break; //'h'
        case 76 : if(event.ctrlKey) { evnt.preventDefault();
                    playRate += rateIncValue;
                    if (playRate > 16) playRate = 16;
                    playRate = parseFloat(playRate.toFixed(2));
                    clickedVid.playbackRate = playRate;
                    if (osdTimeout > 0) showOSD(clickedVid.playbackRate);
                 }; //if (event.ctrlKey)
                 break; // 'l'
        case 74 : if(event.ctrlKey) { evnt.preventDefault();
                      clickedVid.currentTime+=5;
                 }; //if (event.ctrlKey)
                 break; // 'j'
        case 75 : if(event.ctrlKey) { evnt.preventDefault();
                      clickedVid.currentTime-=5;
                 }; //if (event.ctrlKey)
                 break // 'k'
        case 70 : if(event.ctrlKey) { evnt.preventDefault();
                    clickedVid.currentTime-=5;
                    //clickedVid.webkitEnterFullScreen();
                    if (clickedVid.requestFullscreen) { clickedVid.requestFullscreen(); }
                        else if (clickedVid.mozRequestFullScreen) { clickedVid.mozRequestFullScreen(); }
                        else if (clickedVid.webkitRequestFullScreen) { clickedVid.webkitRequestFullScreen(); }
                 }; //if (event.ctrlKey)
                 break // 'f'
        default : return;
    } //switch (keyPressed)
} //function evalCtrlKey()

//}}}custom keybindings for video player
