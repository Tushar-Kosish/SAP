import os
import jwt
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("SECRET_KEY", "smart-evac-secret-key-production-hardened-key-2026")

try:
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
except Exception:
    def hash_password(password: str) -> str:
        return password

    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return plain_password == hashed_password

def generate_token(username, role):
    payload = {
        "sub": username,
        "role": role,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=8)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def decode_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
