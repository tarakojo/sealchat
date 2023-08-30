import os 
import json
import base64


root_dir = os.path.dirname(os.path.abspath(__file__))
assets_dir = os.path.join(root_dir, "assets")
dist_dir = os.path.join(root_dir, "dist")

def iter(directory):
    res = list() 

    for key in os.listdir(directory) :
        path = os.path.join(directory, key)
        print(f"{path}")
        d = dict()
        res.append(d)
        
        d["key"] = key

        if os.path.isdir(path) : 
            d["data"] = iter(path)
        else : 
            with open(path, mode="rb") as asset : 
                data = asset.read()
                data = base64.b64encode(data)
                data = data.decode('utf-8')
                d["data"] = data   
    return res

assets = iter(assets_dir)

index = ""
with open(os.path.join(dist_dir, "index.html"), mode="r") as i : 
    index = i.read();

with open (os.path.join(dist_dir, "assets.json"), mode="w") as j : 
    json.dump(assets, j)

with open (os.path.join(dist_dir, "bundle.json"), mode="w") as j : 
    res = dict() 
    res["index"] = index
    res["assets"] = assets
    json.dump(res, j)

