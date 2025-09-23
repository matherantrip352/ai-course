from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
from app.core.config import settings


def encode(email:str, key):
    cipher=AES.new(key.encode(), AES.MODE_ECB)
    cipher_text=cipher.encrypt(pad(email.encode('utf-8'), AES.block_size))
    cipher_text_base64=base64.b64encode(cipher_text).decode('utf-8')
    return cipher_text_base64

def decode (encoded_email:str, key):
    cipher_text=base64.b64decode(encoded_email)
    cipher=AES.new(key.encode(),AES.MODE_ECB)
    decrypted_email=unpad(cipher.decrypt(cipher_text),AES.block_size).decode('utf-8')
    return decrypted_email
# print(encode("shourjya2001@gmail.com",key=settings.AES_ENCRYPTION_KEY))
# print(decode("9pLGU+5iuFFWL0t8sk28B7b9xOMU29y32HdNx/AkYRI=",key=settings.AES_ENCRYPTION_KEY))