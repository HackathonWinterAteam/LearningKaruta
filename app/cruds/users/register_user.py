from passlib.context import CryptContext
import os
import uuid
import json
from fastapi import Depends, HTTPException, status, Request, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from typing import Optional
from datetime import datetime, timedelta

from jose import JWTError, jwt, ExpiredSignatureError

from database import get_db
from models import users as users_model
from models import games as games_model
from schemas import users as users_schema
from session import session_token

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")

# UUID生成
def generate_uuid() -> str:
    return str(uuid.uuid4())


# パスワードのハッシュ化
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# パスワードを検証
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# ユーザー新規登録 checked!!
def create_user(db: Session, user: users_schema.User):
    user_id = generate_uuid()
    db_user = users_model.Users(
        user_id=user_id,
        user_name=user.user_name,
        email=user.email,
        password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


