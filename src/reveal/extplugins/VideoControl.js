// ==UserScript==
// @name        HTML5 Video Playback Speed Control Keyboard Shortcut
// @namespace   HTML5VideoPlaybackSpeedControlKeyboardShortcut
// @description Add keyboard shortcuts to control HTML5 video playback rate. Available keyboard shortcuts are: <CTRL+[> = Decreate playback rate, <CTRL+]> = Increase playback rate, <CTRL+\> = Set playback rate increment/decrement unit, <CTRL+'> = Set playback to specific rate, <CTRL+;> Reset playback rate to default (to 1.0). Default playback rate incement/decrement is configurable via script.
// @version     1.2.7
// @license     AGPLv3
// @author      jcunews
// @website     https://greasyfork.org/en/users/85671-jcunews
// @include     http://*/*
// @include     https://*/*
// @grant       none
// ==/UserScript==
 
(function() {
 
  /*
  Notes:
  1. YouTube's video playback speed menu selection will not be affected.
  2. Web browser playback rates: Firefox = 0.25 to 5.0; Chrome = 0.1 to 16.0.
  3. Modified from original code: add fullscreen and video scrub
  */
 
  //=== CONFIGURATION BEGIN ===
 
  //Playback rate increment/decrement unit
  var rateUnit    = 0.2;
 
  //Duration (in milliseconds) to display On Screen Display (OSD) when changing playback rate. Set to zero or less to disable.
  var osdTimeout  = 3000;
 
  //=== CONFIGURATION END ===
 
  var eleOSD, osdTimer;
  function showOSD(rate) {
    if (eleOSD) {
      eleOSD.textContent = rate + "X";
    } else {
      eleOSD = document.createElement("DIV");
      eleOSD.style.cssText = "position:fixed;z-index:999999999;right:5px;bottom:5px;margin:0;padding:5px;width:auto;height:auto;font:bold 10pt/normal monospace;background:#444;color:#fff";
      eleOSD.textContent = rate + "X";
      document.body.appendChild(eleOSD);
    }
    clearTimeout(osdTimer);
    osdTimer = setTimeout(function() {
      eleOSD.remove();
      eleOSD = null;
    }, osdTimeout);
  }
 
  addEventListener("keydown", function(ev) {
    var ele = document.querySelector("VIDEO"), rate, inp;
    if (ele && ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
      rate = rate = ele.playbackRate;
      switch (ev.key) {
        case "h":
          ev.preventDefault();
          rate -= rateUnit;
          if (rate < 0.1) rate = 0.1;
          break;
        case "l":
          ev.preventDefault();
          rate += rateUnit;
          if (rate > 16) rate = 16;
          break;
        case ";":
          rate = 1;
          break;
        case "k":
          ev.preventDefault();
          ele.currentTime-=5;
          break;
        case "j":
          ev.preventDefault();
          ele.currentTime+=5;
          break;
        default:
          return;
      }
      rate = parseFloat(rate.toFixed(2));
      ele.playbackRate = rate;
      if (osdTimeout > 0) showOSD(ele.playbackRate);
    }
  });
 
})();
