from database.types import *
from firebase_admin import firestore


CHAT_HISTORY_MAX_INDEX = 200

#ユーザー情報の参照を取得
def get_user_ref(db, uid) : 
    return db.collection("users").document(uid)

#チャット履歴の参照を取得
def get_chat_hostory_ref(db, uid) :
    return get_user_ref(db, uid).collection("chatHistory")

#カレンダーの参照を取得
def get_calendar_ref(db, uid) :
    return get_user_ref(db, uid).collection("calendar")

def get_aboutyou(db, uid) :
    user_ref = get_user_ref(db, uid)
    user_data = user_ref.get()
    if user_data.exists :
        return AboutYou.from_dict(user_data["aboutYou"])
    else : 
        aboutyou = AboutYou.empty()
        addtional = {}
        addtional[uid] = {
            "aboutYou" : aboutyou.to_dict()
        }
        db.collection("users").add(addtional)
        return aboutyou

#aboutYouの更新
def update_aboutyou(db, uid, aboutyou) :
    user_ref = get_user_ref(db, uid)
    user_ref.update({
        "aboutYou" : aboutyou.to_dict()
    })

#def chatHistoryの追加
def add_chat_history(db, uid, entries) :
    chat_history_ref = get_chat_hostory_ref(db, uid)

    #現在のサイズを取得
    size = chat_history_ref.count()

    #最大数を超える場合は削除
    if size + len(entries) > CHAT_HISTORY_MAX_INDEX :
       chat_history_ref.order_by("timestamp").limit(size + len(entries) - CHAT_HISTORY_MAX_INDEX).delete()

    #追加
    addtional = { entry.timestamp : entry.to_dict() for entry in entries }
    chat_history_ref.add(addtional)

def get_chat_history(db, uid) :
    chat_history_ref = get_chat_hostory_ref(db, uid)
    chat_history_data = chat_history_ref.get()
    return [ChatHistoryEntry.from_dict(entry) for entry in chat_history_data]


