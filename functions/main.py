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
import database as database 
import chat as chat

REGION = "asia-northeast1"

#新規アカウントは初めにこれを呼び出すこと。複数回呼び出しても問題ない。

# {
#    "info" : {
#           nickname : string
#           profile : string 
#           notificationEmailAddress : string 
#    }
# }
@https_fn.on_call(region=REGION)
def init_user(req: https_fn.Request):
    db = firestore.client()

    return database.init_user(db, req.auth.uid, req.data["info"])

@https_fn.on_call(region=REGION)
def get_info(req: https_fn.Request):
    db = firestore.client()

    return database.get_info(db, req.auth.uid)

# {
#    "info" : {
#           nickname : string
#           profile : string 
#           notificationEmailAddress : string 
#    }
# }
@https_fn.on_call(region=REGION)
def set_info(req: https_fn.Request):
    db = firestore.client()

    return database.set_info(db, req.auth.uid, req.data["info"])

@https_fn.on_call(region=REGION)
def get_chat_history(req: https_fn.Request):
    db = firestore.client()

    return database.get_chat_history(db, req.auth.uid)


# 指定された日付のカレンダーを取得する
# 存在すれば、それだけを含む配列を返す。
# 存在しなければ、空の配列を返す。

# {
#    "date" : string "YYYY/MM/DD"
# }
@https_fn.on_call(region=REGION)
def get_calendar(req: https_fn.Request):
    db = firestore.client()
    return database.get_calendar(db, req.auth.uid, req.data["date"])

# {
#    "start" : int 
#    "n" : int
# }   
@https_fn.on_call(region=REGION)
def get_calendars(req: https_fn.Request):
    db = firestore.client()

    return database.get_calendars(db, req.auth.uid, req.data["start"], req.data["n"])

# {
#    "entry" : {
#       "date" : string "YYYY/MM/DD",
#       "content" : string
#    }
# }   
@https_fn.on_call(region=REGION)
def set_calendar(req: https_fn.Request):
    db = firestore.client()
    return database.set_calendar(db, req.auth.uid, req.data["entry"])

@https_fn.on_call(region=REGION)
def chat_without_message(req: https_fn.Request):
    db = firestore.client()

    return chat.chat_without_input(db, req.auth.uid)

# {
#    "currentUnixTime" : int?
#    "message" : string
# }
@https_fn.on_call(region=REGION)
def chat_with_message(req: https_fn.Request):
    db = firestore.client()

    return chat.chat_with_input(db, req.auth.uid,req.data["currentUnixTime"], req.data["message"])
 
# {
#    "currentUnixTime" : int?
# }
@https_fn.on_call(region=REGION)
def comment_to_diary(req: https_fn.Request):
    db = firestore.client()

    return chat.comment(db, req.auth.uid, req.data["currentUnixTime"])