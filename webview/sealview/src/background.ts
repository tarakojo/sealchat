
type background_type = "hiru" | "yoru";
let currentBackgroundType : background_type | null = null;

const backgroundImageWidth = 1920;
const backgroundImageHeight = 1080;
const backgroundAspect = backgroundImageWidth / backgroundImageHeight;

//昼ならtrue夜ならfalseを返す
function isDaytime() {
    const now = new Date();
    const hours = now.getHours();

    const startOfDaytime = 6;
    const endOfDaytime = 18;

    return hours >= startOfDaytime && hours < endOfDaytime;
}

function setBackground(t : background_type){
    if(t == currentBackgroundType){
        return;
    }
    const hiru = document.getElementById("background_hiru") as HTMLVideoElement;
    const yoru = document.getElementById("background_yoru") as HTMLVideoElement;

    const show = t == "hiru" ? hiru : yoru;
    const hide = t == "hiru" ? yoru : hiru;
    
    hide.style.opacity = "0";
    hide.pause();
    show.style.opacity = "1";
    show.play();
    currentBackgroundType = t;
}

export function updateBackground(){
    const t = isDaytime() ? "hiru" : "yoru";
    setBackground(t);
}

//背景画像のリサイズ
export function backgroundOnResize(){
    const aspect = window.innerWidth / window.innerHeight;
    const hiru = document.getElementById("background_hiru") as HTMLVideoElement;
    const yoru = document.getElementById("background_yoru") as HTMLVideoElement;
    let width, height;
    if(aspect > backgroundAspect){ 
        width = window.innerWidth;
        height = width / backgroundAspect;
    }
    else {
        height = window.innerHeight;
        width = height * backgroundAspect;
    }
    const widthString = width.toString() + "px";
    const heightString = height.toString() + "px";
    hiru.style.width = widthString;
    hiru.style.height = heightString;
    yoru.style.width = widthString;
    yoru.style.height = heightString;
    return { width : width, height : height };
}