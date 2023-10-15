from decimal import Decimal
import time
import datetime
import json
import os
import openai


CHAT_CONTEXT_LENGTH = 10
CHAT_CONTEXT_KEEP_TIME_MIN = 2

def decimal_to_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    
def format_time(unixtime) :
    date_time = datetime.datetime.fromtimestamp(unixtime)
    return date_time.strftime("%Y/%m/%d %H:%M")

#分単位での経過時間を返す
def elapsed_minutes(timestamp) :
    return (time.time() - timestamp) / 60

#chat_historyをgptへの入力に向けて整形する
def format_chat_history(nickname, chat_history) :
    #最新のCHAT_CONTEXT_LENGTH件のみを用いる
    latest_history = chat_history[-min(len(chat_history), CHAT_CONTEXT_LENGTH):]

    #最後の会話からCHAT_CONTEXT_KEEP_TIME_MIN分以上経過している場合は、空の配列を返す
    if len(chat_history) == 0 or elapsed_minutes(chat_history[-1].timestamp) > CHAT_CONTEXT_KEEP_TIME_MIN :
        input_history = []
    else : 
        for entry in latest_history :
            print(entry.message)
        input_history = [ f'{"ごま" if entry.role=="goma" else nickname}「{entry.message}」\n' for entry in latest_history]
    
    return "".join(input_history)
