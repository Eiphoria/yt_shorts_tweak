let video_renderer = document.querySelector(".reel-video-in-sequence");
let player = video_renderer.querySelector(".html5-video-player");
let video = player.querySelector(".html5-main-video");
let vol_ctrl = video_renderer.querySelector(".video-stream.html5-main-video");
// console.log(video, player, video_renderer);
console.log((video && player && video_renderer) === true);
if (video && player && video_renderer) {
  console.log("Succefull query select");
} else {
  console.log("Failed query select");
}

let slider = document.createElement("input");
slider.style.zIndex = "1000000";
slider.style.position = "absolute";
slider.style.opacity = "80";
slider.style.right = "18px";
slider.style.top = "40px";
slider.style.height = "80px";
slider.setAttribute("type", "range");
slider.setAttribute("orient", "vertical");
slider.setAttribute("min", "0");
slider.setAttribute("max", "100");
if (slider) {
  console.log("Slider created");
} else {
  console.log("Slider create failed");
}

player.appendChild(slider);
slider.addEventListener("input", (e) => (video.volume = +e.target.value / 100));
vol_ctrl.addEventListener("mouseenter", () => (slider.style.opacity = "100"));
vol_ctrl.addEventListener("mouseleave", () => (slider.style.opacity = "0"));
slider.addEventListener("mouseenter", () => (slider.style.opacity = "100"));
