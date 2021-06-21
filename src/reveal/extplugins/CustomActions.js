let showNote = false;
let style = document.createElement('style');

window.addEventListener("keyup", evalKeyUp, false); 
function evalKeyUp(evnt) {
        let keyPressed = evnt.keyCode;
        console.log("keyUp:"+keyPressed);
        if (keyPressed==84) toggleNotes(); //key: spacebar
        if (keyPressed==37) onSlideChange(); //key: arrow Key
        if (keyPressed==38) onSlideChange(); //key: arrow Key
        if (keyPressed==39) onSlideChange(); //key: arrow Key
        if (keyPressed==40) onSlideChange(); //key: arrow Key
} //evalKey(event)


function onSlideChange() {
    if (showNote) {insertCss(".note {display: none;}");showNote=false;}
} //onSlideChange()

function toggleNotes() {
    if (showNote) {insertCss(".note {display: none;}");showNote=false;}
    else if (!showNote) {insertCss(".note {display: block;}");showNote=true;}
} //function toggleNotes(){

function insertCss( code ) {
        style.innerHTML = code;
        document.getElementsByTagName("head")[0].appendChild( style );
} //function insertCss( code)
