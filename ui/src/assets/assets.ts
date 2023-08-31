import {base64} from "rfc4648"

let assetsCache = new Map<string, ArrayBuffer>();
let assetsPngURLCache = new Map<string, string>();

export function getAsset (path : string) {
    console.log("get asset " + path)
    if(assetsCache.has(path)){
        return assetsCache.get(path);
    }
    const ps = path.split("/");
    let c = (window as any)["assets"];
    for(let i = 0; i < ps.length; ++i){
        c = c[ps[i]];
    }
    const data = base64.parse(c)
    const res = new ArrayBuffer(data.length);
    const resa = new Uint8Array(res);
    for(let i = 0; i < data.length; ++i){
        resa[i] = data[i];
    }
    assetsCache.set(path, res);
    return res ;
}

export async function getAssetAsync(path : string){
    return getAsset(path);
} 

export function getAssetAsPngURL (path : string) {
    if(assetsPngURLCache.has(path)){
        return assetsPngURLCache.get(path);
    }
    const buf = getAsset(path);
    const blob = new Blob([buf], {type : 'image/png'});
    const res = URL.createObjectURL(blob);
    assetsPngURLCache.set(path, res);
    return res;
}