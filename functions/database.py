import os 

import datetime
from firebase_admin import firestore 
from firebase_admin.firestore import FieldFilter


CHAT_HISTORY_MAX_INDEX = 200

#ユーザー情報の参照を取得
def get_user_ref(db, uid) : 
    return db.collection("users").document(uid)


def get_info(db, uid) :
    return get_user_ref(db, uid).get().to_dict()["info"]

def set_info(db, uid, info) :
    get_user_ref(db, uid).set({
        "info" : info
    })

def init_user(db, uid, info) :
    user_ref = get_user_ref(db, uid)
    if user_ref.get().exists :
        return
    else : 
        set_info(db, uid, info)

#チャット履歴の参照を取得
def get_chat_hostory_ref(db, uid) :
    return get_user_ref(db, uid).collection("chatHistory")

#カレンダーの参照を取得
def get_calendar_ref(db, uid) :
    return get_user_ref(db, uid).collection("calendar")

#def chatHistoryの追加
def add_chat_history(db, uid, entries) :
    chat_history_ref = get_chat_hostory_ref(db, uid)

    #現在のサイズを取得
    size = chat_history_ref.count().get()[0][0].value

    #最大数を超える場合は削除
    if size + len(entries) > CHAT_HISTORY_MAX_INDEX :
        chat_history_data = chat_history_ref.order_by("timestamp").limit(size + len(entries) - CHAT_HISTORY_MAX_INDEX).get()
        for entry in chat_history_data :
            entry.reference.delete()
    
    #追加
    for entry in entries :
        chat_history_ref.add(entry)

def get_chat_history(db, uid) :
    chat_history_ref = get_chat_hostory_ref(db, uid)
    chat_history_data = chat_history_ref.order_by("timestamp").get()
    for entry in chat_history_data :
        print(entry.to_dict())
    return [entry.to_dict() for entry in chat_history_data]

def get_calendar(db, uid, date):
    calendar_ref = get_calendar_ref(db, uid)
    calendar_data = calendar_ref.where(filter=FieldFilter("date", "==", date)).get()
    return [entry.to_dict()  for entry in calendar_data]

def get_calendars(db, uid, start, n):
    print(f'start: {start}, n: {n}')
    calendar_ref = get_calendar_ref(db, uid)
    calendar_data = calendar_ref.order_by("date", direction=firestore.Query.DESCENDING).offset(start).limit(n).get()
    for entry in calendar_data :
        print(entry.to_dict())
    return [entry.to_dict()  for entry in calendar_data]

def get_recent_calendar(db, uid, n):
    return get_calendars(db, uid, 0, n)

def set_calendar(db, uid, entry):
    calendar_ref = get_calendar_ref(db, uid)
    docs = calendar_ref.where(filter=FieldFilter("date", "==", entry["date"])).stream()
    for doc in docs :
        doc.reference.delete()
    calendar_ref.add(entry)

