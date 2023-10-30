from decimal import Decimal
import datetime
import database as database


CHAT_CONTEXT_LENGTH = 10
CHAT_CONTEXT_KEEP_TIME_MIN = 2

NUM_RECENT_CALENDAR = 10

def decimal_to_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    
def get_time_str(unixtime) :
    date_time = datetime.datetime.fromtimestamp(unixtime)
    return date_time.strftime("%Y/%m/%d %H:%M")

#分単位での経過時間を返す
def elapsed_minutes(current, timestamp) :
    return (current - timestamp) / 60

#chat_historyを文字列に変換する
def get_chat_history_str(current_time, nickname, chat_history) :
    #最新のCHAT_CONTEXT_LENGTH件のみを用いる
    latest_history = chat_history[-min(len(chat_history), CHAT_CONTEXT_LENGTH):]

    #最後の会話からCHAT_CONTEXT_KEEP_TIME_MIN分以上経過している場合は、空の配列を返す
    if len(chat_history) == 0 or elapsed_minutes(current_time, chat_history[-1]["timestamp"]) > CHAT_CONTEXT_KEEP_TIME_MIN :
        input_history = []
    else : 
        input_history = [ f'{"ごま" if entry["role"]=="goma" else nickname}「{entry["message"]}」\n' for entry in latest_history]
    
    return "".join(input_history)

#最近のカレンダーを取得する
def get_recent_calendar(db, uid) :
    return database.get_recent_calendar(db, uid, NUM_RECENT_CALENDAR)    

#calendarを文字列に変換する
def get_calendar_str(calendar) :
    return "".join([f'{entry["date"]} : {entry["content"]}\n' for entry in calendar])
