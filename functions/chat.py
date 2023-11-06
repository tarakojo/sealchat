from decimal import Decimal
import time
import os
import openai

import database as database
import common as common


def chat_prompt(current_time, nickname, profile, calendar, chat_history): 
    return "".join([
"""あなたは、ごまの役になって、以下の会話に続くごまの台詞を1つだけ書いてください。
ごまの設定は以下の通りです。
あざらし
一人称は「ぼく」
日本の和風の家に住んでいる
""",
f'{nickname}が遊びに来ている\n',
f'{nickname}とは仲のいい友達\n',
"""幼い少年のように話す
人懐っこい
人をほめ、応援する
落ち込んでいたり、疲れている人を見ると、元気づけようとする
""",
f'{nickname}の今日あった出来事について会話をするのが好き\n',
"""(以上)

""",
f'なお、{nickname}の最近あった出来事は、以下の通りです。\n',
common.get_calendar_str(calendar),
"""(以上)

""",
f'また、{nickname}について、以下の情報があります。',
profile,
"""
(以上)

出力は、ごまの台詞一行のみを出力してください。
他の出力は絶対にしないでください。

なお、会話がまだ始まっていない場合やごまで終わっている場合、ごまから会話を始めてください。

以下が会話です。
""",
common.get_chat_history_str(current_time, nickname, chat_history)])


def comment_prompt(current_time,nickname, profile, event): 
    return "".join([
f'あなたは、ごまの役になって、{nickname}の今日の出来事にコメントするごまの台詞を1つだけ書いてください。\n',
"""
ごまの設定は以下の通りです。
あざらし
一人称は「ぼく」
日本の和風の家に住んでいる
""",
f'{nickname}が遊びに来ている\n',
f'{nickname}とは仲のいい友達\n',
"""幼い少年のように話す
人懐っこい
人をほめ、応援する
落ち込んでいたり、疲れている人を見ると、元気づけようとする
""",
f'{nickname}の今日あった出来事について会話をするのが好き\n',
"""(以上)

""",
f'なお、{nickname}の今日あった出来事は、以下の通りです。\n',
event,
"""(以上)

""",
f'また、{nickname}について、以下の情報があります。',
profile,
"""
(以上)

出力は、ごまの台詞一行のみを出力してください。
他の出力は絶対にしないでください。


"""])

#ユーザーの入力を受け取ってチャットを返す
def chat_with_input(db, uid, current_unix_time, input_message) : 
    input_entry = {
        "timestamp" : current_unix_time, 
        "role" : "user", 
        "message" : input_message, 
        "attribute" : ""
    }

    info = database.get_info(db, uid)
    nickname = info["nickname"]
    profile = info["profile"]
    calendar = common.get_recent_calendar(db, uid)
    chat_history = database.get_chat_history(db, uid)

    chat_history.append(input_entry)

    prompt = chat_prompt(current_unix_time, nickname, profile, calendar, chat_history)
    print("Chat prompt: " + prompt)

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        temperature=0.3,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    response_message = response.choices[0]["text"]

    #出力が、ごま「(台詞)」の場合と、(台詞)の場合がある。
    #ごま「」を削除する
    if(response_message.startswith("ごま「")) :
        response_message = response_message[len("ごま「"):-len("」")]
        
    print("Chat response: " + response_message)

    response_entry = {
        "timestamp" : current_unix_time + 1,
        "role" : "goma",
        "message" : response_message,
        "attribute" : ""
    }
    
    database.add_chat_history(db, uid, [input_entry, response_entry])

    return response_message


#ユーザーの今日の出来事にコメントする
def comment(db, uid, current_unix_time) : 
    
    info = database.get_info(db, uid)
    nickname = info["nickname"]
    profile = info["profile"]

    event = database.get_calendars(db, uid, 0, 1)[0]["content"]

    prompt = comment_prompt(current_unix_time, nickname, profile, event)
    print("Comment prompt: " + prompt)

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        temperature=0.3,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    response_message = response.choices[0]["text"]

    #出力が、ごま「(台詞)」の場合と、(台詞)の場合がある。
    #ごま「」を削除する
    if(response_message.startswith("ごま「")) :
        response_message = response_message[len("ごま「"):-len("」")]
        
    print("Comment response: " + response_message)

    response_entry = {
        "timestamp" : current_unix_time + 1,
        "role" : "goma",
        "message" : response_message,
        "attribute" : ""
    }
    
    database.add_chat_history(db, uid, [response_entry])

    return response_message
