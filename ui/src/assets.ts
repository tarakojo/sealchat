import {base64} from "rfc4648";

let assets : any = null;
let assetCache : Map<string, any> = new Map<string, any>();

export async function initAssets () : Promise<any> {
    const response = await fetch("./assets.json");

    

    document.addEventListener("onAssetLoaded", (e : any) => {
        assets = JSON.parse(e.detail);
    });
    
    
    assets = await response.json();

}

export function fetchAsset(path : string) : ArrayBuffer {
    if(assetCache[path] != undefined){
        return assetCache[path];
    }
    let c : any = assets;
    const ps = path.split("/");
    
    for (let i = 0; i < ps.length; ++i) {
        for(let j = 0; j < c.length; ++j){
            if(c[j].key == ps[i]){
                c = c[j].data;
                break;
            }
        }
    }
    const arr = base64.parse(c);
    const res = new ArrayBuffer(arr.length);
    const resa = new Uint8Array(res);
    for(let i = 0; i < arr.length; ++i){
        resa[i] = arr[i];
    }
    assetCache[path] = res;
    return res;
}

export async function fetchAssetAsync(path : string) : Promise<ArrayBuffer> {
    return fetchAsset(path);
}

let pngAssetCache : Map<string, any> = new Map<string, any>();

export function fetchAssetAsPngUrl(path : string) : string {
    if(pngAssetCache[path] != undefined){
        return pngAssetCache[path];
    }
    const buf = fetchAsset(path);
    const arr = new Uint8Array(buf);
    const blob = new Blob([arr], {type: "image/png"});
    const res = URL.createObjectURL(blob);
    pngAssetCache[path] = res;
    return res;
}
