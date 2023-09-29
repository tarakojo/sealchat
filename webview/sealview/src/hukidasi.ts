
type hukidasiType = "upper" | "side"

//フキダシをどこに表示するか
let currentHukidasiType : hukidasiType | null = null;
//フキダシが表示されているかどうか
let isHukidasiShown = false;
//フキダシに表示するテキスト
let hukidasiText : string | null = null;
//現在表示されているテキスト(hukidasiTextの一部である可能性がある)
let currentHukidasiText : string | null = null;

function setHukidasiType (t : hukidasiType) {
    if(currentHukidasiType == t){
        return;
    }
    const upper = document.getElementById("upper_hukidasi_container") as HTMLDivElement;
    const side = document.getElementById("side_hukidasi_container") as HTMLDivElement;
    upper.style.visibility = t == "upper" ? "visible" : "hidden";
    side.style.visibility = t == "side" ? "visible" : "hidden";
    currentHukidasiType = t;
}

export function hukidasiOnResize(){
    const upper = document.getElementById("upper_hukidasi_container") as HTMLDivElement;
    //上にフキダシを表示するときのアスペクト比の上限
    const limitAspect = parseFloat(getComputedStyle(upper).getPropertyValue("--upper_hukidasi_limit_aspect"));
   
    const aspect = window.innerWidth / window.innerHeight;
    if(aspect < limitAspect){
        setHukidasiType("upper");
    }
    else {
        setHukidasiType("side");
    }
}

export function initHukidasi() {
    hukidasiOnResize();
}

function setCurrentHukidasiText(text : string){
    const upper = document.getElementById("upper_hukidasi_text") as HTMLDivElement;
    const side = document.getElementById("side_hukidasi_text") as HTMLDivElement;
    upper.innerText = text;
    side.innerText = text;
    currentHukidasiText = text;
}

export function showHukidasi(text : string){
    const upper = document.getElementById("upper_hukidasi_container") as HTMLDivElement;
    const side = document.getElementById("side_hukidasi_container") as HTMLDivElement;
    upper.style.opacity = "1";
    side.style.opacity = "1";
    isHukidasiShown = true;
    hukidasiText = text;

    //文字を一文字ずつ表示する
    const interval = parseFloat(getComputedStyle(upper).getPropertyValue("--hukidasi_char_interval_ms"));
    let i = 0; 
    const timer = setInterval(()=>{
        if(i >= text.length){
            clearInterval(timer);
            return;
        }
        i++;
        setCurrentHukidasiText(text.slice(0, i));
    }, interval);
}

export function dismissHukidasi(){
    const upper = document.getElementById("upper_hukidasi_container") as HTMLDivElement;
    const side = document.getElementById("side_hukidasi_container") as HTMLDivElement;
    upper.style.opacity = "0";
    side.style.opacity = "0";
    isHukidasiShown = false;
    hukidasiText = null;
    currentHukidasiText = null;
}

