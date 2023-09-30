
type hukidasiType = "upper" | "side"

//フキダシをどこに表示するか
let currentHukidasiType : hukidasiType | null = null;
//フキダシが表示されているかどうか
export let isHukidasiShown = false;
//フキダシに表示するテキスト
let hukidasiText : string | null = null;
//フキダシのID
let hukidasiID = 0;

export function initHukidasi() {
    hukidasiOnResize();
}

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

function setHukidasiText (text : string) {
    const upper = document.getElementById("upper_hukidasi_text");
    const side = document.getElementById("side_hukidasi_text");
    upper.innerText = text;
    side.innerText = text;
    hukidasiText = text;
}

//フキダシを消す
export function dismissHukidasi(){
    if(!isHukidasiShown){
        return;
    }
    const upper = document.getElementById("upper_hukidasi_container") as HTMLDivElement;
    const side = document.getElementById("side_hukidasi_container") as HTMLDivElement;
    upper.style.opacity = "0";
    side.style.opacity = "0";
    isHukidasiShown = false;
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

export function showHukidasi(text : string){
    //フキダシIDを更新
    ++hukidasiID;
    const currentID = hukidasiID;

    //フキダシのテキストをリセット
    setHukidasiText("");

    //フキダシの枠を表示
    const upper = document.getElementById("upper_hukidasi_container") as HTMLDivElement;
    const side = document.getElementById("side_hukidasi_container") as HTMLDivElement;
    upper.style.opacity = "1";
    side.style.opacity = "1";
    isHukidasiShown = true;
    
    //文字をintervalごとに一文字ずつ表示する
    const interval = parseFloat(getComputedStyle(upper).getPropertyValue("--hukidasi_char_interval_ms"));
    const startTime = Date.now();
    const timer = setInterval(()=>{
        //startTimeからの経過時間(ミリ秒)
        const elapsed = Date.now() - startTime;
        //textの何文字目まで表示するか
        let i = Math.floor(elapsed / interval);
        //別のフキダシ表示が始まっているか、textの最後まで表示したら終了
        if(currentID != hukidasiID || i >= text.length){
            clearInterval(timer);
            return;
        }

        //フキダシの文字列を設定
        setHukidasiText(text.substring(0, i));
    }, interval);
}


