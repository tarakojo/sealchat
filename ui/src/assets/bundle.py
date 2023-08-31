import os 
import json
import base64


def iter(directory):
    res = dict() 

    for key in os.listdir(directory) :
        path = os.path.join(directory, key)
        print(f"{path}")

        if os.path.isdir(path) : 
            res[key] = iter(path)
        else : 
            with open(path, mode="rb") as asset : 
                data = asset.read()
                data = base64.b64encode(data)
                data = data.decode('utf-8')
                res[key] = data   
    return res

current = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(os.path.join(current, os.pardir), os.pardir)
dist = os.path.join(root, "dist")
src = os.path.join(root, "src")
assets = os.path.join(root, "assets")


with open (os.path.join(dist, "assets.json"), mode="w") as j : 
    json.dump(iter(assets), j)

with open (os.path.join(dist, "index.json"), mode="w") as j : 
    with open (os.path.join(dist, "index.html"),mode="r") as h : 
        d = dict()
        d["index"] = h.read()
        json.dump(d, j)