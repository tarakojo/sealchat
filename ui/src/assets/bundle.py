import os 
import json
import base64

assets = dict() 

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
dir = os.path.join(current, os.pardir)
dir = os.path.join(dir, os.pardir)
dir = os.path.join(dir, "assets")

with open (os.path.join(current, "assets.json"), mode="w") as j : 
    json.dump(iter(dir), j)

