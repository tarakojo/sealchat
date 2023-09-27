
type background_type = "day" | "night";
let currentBackgroundType : background_type = "day";

export function setBackgroundImage(t : background_type){
    if(t == currentBackgroundType){
        return;
    }
    const day = document.getElementById("background_image_day") as HTMLImageElement;
    const night = document.getElementById("background_image_night") as HTMLImageElement;

    const current = currentBackgroundType == "day" ? day : night;
    const next = t == "day" ? day : night;
    
    current.style.opacity = "0";
    next.style.opacity = "1";
    currentBackgroundType = t;
}