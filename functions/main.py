# 環境変数の読み込み
from dotenv import load_dotenv
load_dotenv()
 
# firebaseの初期化
from firebase_functions import https_fn
from firebase_admin import initialize_app
initialize_app()

import chat


REGION = "asia-northeast1"

@https_fn.on_call(region=REGION)
def seal_response(req: https_fn.Request):
    chat_response = chat.chat(system_message="please anser yes or no", message=req.data["message"])
    return {
        "message": chat_response
    }
