from decimal import Decimal
import time
import os
import openai

import database.types as types  
import database.database as database
from chat.response import ChatResponse
from chat.calendar import update_calendar
from chat.about_user import update_about_user

import chat.common as common


def chat_prompt(nickname): 
    return "".join([
"""あなたは、ごまの役になって、以下の会話に続くごまの台詞を1つだけ書いてください。
ごまの設定は以下の通りです。
あざらし
一人称は「ぼく」
日本の和風の家に住んでいる
""",
f'{nickname}とは仲のいい友達',
"""
幼い少年のように話す
人懐っこい
人をほめ、応援する
落ち込んでいたり、疲れている人を見ると、元気づけようとする""",
f'{nickname}の最近あった出来事について会話をし、話を聞くのが好き',
"""
(以上)

なお、ユーザーの最近あった出来事は、以下の通りです。
"""
,
"""
(以上)

出力は、ごまの台詞一行のみを出力してください。
他の出力は絶対にしないでください。

なお、会話がまだ始まっていない場合は、ごまから会話を始めてください。

以下が会話です。
"""])


_CHAT_SYSTEM_MESSAGE = """
あなたは、ごまの役になって、以下の会話に続くごまの台詞を1つだけ書いてください。

ごまの設定は以下の通りです。
あざらし
一人称は「ぼく」
日本の和風の家に住んでいる
ユーザーとは仲のいい友達
ユーザーのことをニックネームで呼ぶ
幼い少年のように話す
人懐っこい
人をほめ、応援する
落ち込んでいたり、疲れている人を見ると、元気づけようとする
ユーザーの最近あった出来事について会話をし、話を聞くのが好き
(以上)

なお、ユーザーの最近あった出来事は、以下の通りです。

(以上)

出力は、ごまの台詞一行のみを出力してください。
他の出力は絶対にしないでください。

なお、会話がまだ始まっていない場合は、ごまから会話を始めてください。

以下が会話です。
"""

#ユーザーの入力を受け取ってチャットを返す
def chat_with_input(db, uid, input_message) : 

    about_user = database.get_about_user(db, uid)
    
    input_entry = types.ChatHistoryEntry(timestamp=time.time(), role="user", message=input_message, attribute="")
    chat_history = database.get_chat_history(db, uid)
    chat_history.append(input_entry)
    chat_history_str = common.format_chat_history(chat_history)

    prompt = "".join([
        f'現在の日時は{common.format_time(time.time())}です。\n' 
        'ユーザーの情報が以下のように与えられています。\n',
        f'{common.format_about_user(about_user)}\n\n',
        _CHAT_SYSTEM_MESSAGE,
        chat_history_str
    ])

    print("Chat prompt: " + prompt)

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        temperature=0.5,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    response_message = response.choices[0]["text"]
    if(response_message.startswith("ごま「")) :
        response_message = response_message[len("ごま「"):-len("」")]
        
    print("Chat response: " + response_message)

    response_entry = types.ChatHistoryEntry(timestamp=time.time(), role="goma", message=response_message, attribute="")

    database.add_chat_history(db, uid, [input_entry, response_entry])

    update_about_user(db, uid)

    return response_message
