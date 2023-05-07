
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

let all_query_true = true;
let id_renderer = 0;

let video_renderers = document.querySelectorAll("ytd-reel-video-renderer");
let render_element = null;

video_renderers.forEach(element => {
    let is_active_render = element.getAttribute('is-active');
    if(typeof(is_active_render) === typeof("string")){
        console.log(is_active_render);
        console.log(element);
        id_renderer = parseInt(element.getAttribute('id'));
        render_element = element;
        return;
    }
});


console.log(id_renderer);
let video_renderer = video_renderers[id_renderer];
let video_rendererss = document.querySelector("ytd-reel-video-renderer");
let player = video_rendererss.querySelector(".html5-video-player");
let video = player.querySelector(".video-stream.html5-main-video");

if(!video){
    console.log("Fail to query select <html5-main-video> class");
    all_query_true = false;
}else if(!player){
    console.log("Fail to query select <html5-video-player> class");
    all_query_true = false;
}else if(!video_rendererss){
    console.log("Fail to query select <reel-video-in-sequence> class");
    all_query_true = false;
}else if(all_query_true){
    console.log("SucceFULL query select");
    var slider = document.createElement("input");
    slider.style.zIndex = "1000000";
    slider.style.alignSelf = "flex-start";
    slider.style.justifySelf = "flex-start";
    slider.style.position = "absolute";
    slider.style.top = "72px";
    slider.style.opacity = "80";
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    if(slider){
        console.log("Slider created");
    }else{console.log("Slider create failed")}

    player.appendChild(slider);
    slider.addEventListener("input", (e) => {
        video.volume = +e.target.value / 100;
        // possible implementetion of memory volume level
        // chrome.storage.local.set({ 'volume': video.volume }).then(() => {
        //     console.log("Default volume updated to " + video.volume);
        //       });
    });
    video.addEventListener("mouseenter", () => (slider.style.opacity = "100"));
    video.addEventListener("mouseleave", () => (slider.style.opacity = "0"));
    slider.addEventListener("mouseenter", () => (slider.style.opacity = "100"));
}else{
    console.log("Eto polniy hai iomy hretz`");
}


