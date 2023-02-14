from passlib.context import CryptContext
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime, timedelta

from jose import JWTError, jwt

from models import users as users_model
from schemas import users as users_schema


SECRET_KEY = "1c3ecd2b186ee78127750ff41b28c8093ce52fd10c49426f873a2d652eb69257"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")

#テスト用クラス

# パスワードのハッシュ化
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# パスワードを検証
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# ユーザー新規登録
def create_user(db: Session, user: users_schema.User):
    db_user = users_model.Users(
        user_name=user.user_name,
        email=user.email,
        password=get_password_hash(user.password),
        created_at=user.created_at
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



# ユーザーデータをDBから取得()
def get_user(db, user_name: str, passrord: str) -> users_schema.User:
    return db.query(users_model.Users).filter(users_model.Users.email == user_name).first()

# ユーザー認証
async def authenticate_user(db: AsyncSession, user: users_schema.User):
    user = get_user(db, user_name)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return await user

# JWTの作成（トークン発行）
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# 依存関係の更新
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = users_schema.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: users_schema.User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

