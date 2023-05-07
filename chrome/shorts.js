// chrome.storage.local.get('volume').then((result) => {
//     console.log("Default volume currently is " + result.key);
//     if(!result){
//         console.log("Default volume is not assigned.");
//         let default_volume = 0.3;
//         chrome.storage.local.set({ 'volume': default_volume }).then(() => {
//         console.log("Default volume was set to " + default_volume);
//           });
//     }else{
//         console.log("Default volume were assigned, and has value: " + result.key);
//         video.volume = result.key;
//     }
//   });

let isInjected = false;
let volume = 0.5; // move to the some kind of storage
let slider = document.createElement("input");
slider.style.zIndex = "1000000";
slider.style.alignSelf = "flex-start";
slider.style.justifySelf = "flex-start";
slider.style.position = "absolute";
slider.style.top = "72px";
slider.style.opacity = "80";
slider.setAttribute("type", "range");
slider.setAttribute("min", "0");
slider.setAttribute("max", "100");
slider.addEventListener("mouseenter", () => (slider.style.opacity = "100"));

function waitForVideo() {
  return new Promise(function (resolve) {
    const intervalID = setInterval(function () {
      const element = document.querySelector("video");
      if (element) {
        element.volume = volume;
        clearInterval(intervalID);
        resolve(element);
      }
    }, 1);
  });
}

function injectSlider() {
  waitForVideo().then(function (v) {
    if (!isInjected) {
      document.querySelector(".html5-video-player").appendChild(slider);
      isInjected = true;
    }

    slider.addEventListener("input", (e) => {
      volume = +e.target.value / 100;
      v.volume = volume;
    });
    v.addEventListener("mouseenter", () => (slider.style.opacity = "100"));
    v.addEventListener("mouseleave", () => (slider.style.opacity = "0"));
  });
}

injectSlider();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  injectSlider();
});
