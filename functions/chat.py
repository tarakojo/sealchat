
import os
import openai

openai.api_key = os.environ.get("OPENAI_API_KEY")


def _system_message(message) :
    return {
        "role" : "system", 
        "content" : message
    }

def _user_message(message) :
    return {
        "role" : "user", 
        "content" : message
    }

def chat(system_message, message) : 
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages= [_system_message(system_message), _user_message(message)]
    )
    return response.choices[0]["message"]["content"]
