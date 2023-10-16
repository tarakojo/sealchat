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
import chat as chat

REGION = "asia-northeast1"

#新規アカウントは初めにこれを呼び出すこと。複数回呼び出しても問題ない。
@https_fn.on_call(region=REGION)
def init_user(req: https_fn.Request):
    return database.init_user(db, req.auth.uid, req.data["info"])

@https_fn.on_call(region=REGION)
def get_info(req: https_fn.Request):
    return database.get_info(db, req.auth.uid)

@https_fn.on_call(region=REGION)
def set_info(req: https_fn.Request):
    return database.set_info(db, req.auth.uid, req.data["info"])

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
    return chat.chat_with_input(db, req.auth.uid,req.data["currentUnixTime"], req.data["message"])
 
 