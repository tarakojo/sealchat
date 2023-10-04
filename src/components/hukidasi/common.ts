

export const hukidasiTextUpdateInterval = 100;
const keepTime = 7000;

export type HukidasiType = 'upper' | 'side';
export type HukidasiState = {
    displayStartTime : number, 
    text : string
}
export const textStyles = {
    fontFamily : "mplus",
    fontWeight : 700,
}
export const getDisplayText = (state : HukidasiState) => {
    const elapsed = Date.now() - state.displayStartTime;
    return state.text.substring(0, Math.floor(elapsed / hukidasiTextUpdateInterval));
}
export const getHukidasiType = () => {
    const limitAspect = 2.0;
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < limitAspect) {
        return 'upper';
    } else {
        return 'side';
    }
}
export const hukidasiDisplayTime = (state : HukidasiState) => {
    return state.text.length * hukidasiTextUpdateInterval + keepTime;
}
export const displayHukidasi = (state : HukidasiState) => {
    const elapsed = Date.now() - state.displayStartTime;
    return elapsed < hukidasiDisplayTime(state);
}