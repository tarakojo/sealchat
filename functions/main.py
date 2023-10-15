import os 

# 環境変数の読み込み
from dotenv import load_dotenv
load_dotenv()

#openaiのAPIキーを設定 
import openai
openai.api_key = os.environ.get("OPENAI_API_KEY")

# firebaseの初期化
from firebase_functions import https_fn
from firebase_admin import initialize_app
from firebase_admin import firestore

initialize_app() 
db = firestore.client()

import database as database 
import chat.chat as chat

REGION = "asia-northeast1"

@https_fn.on_call(region=REGION)
def get_aboutuser(req: https_fn.Request):
    return database.get_aboutuser(db, req.auth.uid).to_dict()

@https_fn.on_call(region=REGION)
def update_aboutuser(req: https_fn.Request):
    database.update_aboutuser(db, req.auth.uid, database.AboutUser.from_dict(req.data["aboutUser"]))

@https_fn.on_call(region=REGION)
def get_chat_history(req: https_fn.Request):
    return database.get_chat_history(db, req.auth.uid)

@https_fn.on_call(region=REGION)
def get_calendar(req: https_fn.Request):
    return database.get_calendar(db, req.auth.uid, req.data["startUnixTime"], req.data["endUnixTime"])

@https_fn.on_call(region=REGION)
def chat_without_message(req: https_fn.Request):
    return chat.chat_without_input(db, req.auth.uid)

@https_fn.on_call(region=REGION)
def chat_with_message(req: https_fn.Request):
    return chat.chat_with_input(db, req.auth.uid, req.data["message"])
 
 