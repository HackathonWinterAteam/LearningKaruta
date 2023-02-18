from passlib.context import CryptContext
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional
from datetime import datetime, timedelta

from jose import JWTError, jwt

from database import get_db
from models import users as users_model
from schemas import users as users_schema

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")

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
        password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



# ユーザーデータをDBから取得() #usernameはOAuth2PasswordRequestFormの変数、実際はemailを入力
def get_user(db, username: str):
    return db.query(users_model.Users).filter(users_model.Users.email == username).first()

'''
def access_get_user(db, username: str):
    access_user = db.execute(select(users_model.Users.user_id,users_model.Users.email,users_model.Users.created_at).filter(users_model.Users.email == username))
    return access_user.first()
'''

# OAuth2による認可(DBにユーザーがいるかチェック、パスワードチェック)
# usernameはOAuth2PasswordRequestFormの変数、実際はemailを入力
def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

# JWTの作成（アクセストークン発行）
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    to_encode.update({"token_type": "access_token"})
    access_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return access_jwt

# JWTの作成（リフレッシュトークン発行）
def create_reflesh_token(db: Session, data: dict, user_id: int, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=60)
    to_encode.update({"exp": expire})
    to_encode.update({"token_type": "reflesh_token"})
    reflesh_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    db_reflesh = db.query(users_model.Users).filter(users_model.Users.user_id == user_id).first()
    db_reflesh.reflesh_token = reflesh_jwt
    # db.update(users_model.Users).where(users_model.Users.user_id == user_id).values(users_model.Users.reflesh_token ==)
    db.commit()
    db.refresh(db_reflesh)

    return reflesh_jwt


# アクセストークンからカレントユーザー取得
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession=Depends(get_db)):
    return await get_current_user_from_token('access_token', token, db=db)

# リフレッシュトークンからカレントユーザー取得
async def get_current_user_with_refresh_token(token: str = Depends(oauth2_scheme), db: AsyncSession=Depends(get_db)):
    return await get_current_user_from_token('reflesh_token', token, db=db)

# カレントユーザー取得
async def get_current_user_from_token(token_type: str, token: str, db:AsyncSession):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    #デコード実施
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    #token_typeが一致しているか確認、していなかったらエラーを返す
    if payload.get("token_type") != token_type:
        raise HTTPException(status_code=401, detail='トークンタイプ不一致')

    # リフレッシュトークンの場合、受け取ったものとDBに保存されているものが一致するか確認
    user_id = payload.get("user_id")
    db_user = db.query(users_model.Users).filter(users_model.Users.user_id == user_id).first()

    if token_type == 'reflesh_token' and db_user.reflesh_token != token:
        raise HTTPException(status_code=401, detail='リフレッシュトークン不一致')
    try:
        user_email: str = payload.get("email")
        if user_email is None:
            raise credentials_exception
        token_data = users_schema.TokenData(username=user_email)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception

    return user
