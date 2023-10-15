#chatgptのトークン数を数える
import os 
import tiktoken
from tiktoken.core import Encoding

current_dir = os.path.dirname(__file__)
file_path = os.path.join(current_dir, "transcription.txt")

with open(file_path, "rt", encoding="utf-8") as f:
    transcription = f.read()
    char_count = len(transcription)

print(f"{char_count=}")

encoding: Encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")

tokens = encoding.encode(transcription)
tokens_count = len(tokens)
print(f"{tokens_count=}")