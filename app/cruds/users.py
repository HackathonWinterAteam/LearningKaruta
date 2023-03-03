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


# ユーザー新規登録
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


# ユーザーデータをDBから取得() #usernameはOAuth2PasswordRequestFormの変数、実際はemailを入力
def get_user(db, username: str):
    user_info = db.query(users_model.Users).filter(users_model.Users.email == username).first()
    # delattr(user,"refresh_token")
    # delattr(user,"password")
    user_id  = user_info.user_id
    print(user_id)
    user_record = db.query(games_model.play_records).filter(games_model.play_records.user_id == user_id).count()
    user = users_schema.User(
        user_id=user_info.user_id,
        email=user_info.email,
        user_name=user_info.user_name,
        user_intro=user_info.user_intro,
        count=user_record,
        created_at=user_info.created_at
    )

    return user



def all_get_user(db, username: str):
    user_info = db.query(users_model.Users).filter(users_model.Users.email == username).first()
    user_id  = user_info.user_id
    print(user_id)
    user_record = db.query(games_model.play_records).filter(games_model.play_records.user_id == user_id).count()
    user = users_schema.User_all(
        user_id=user_info.user_id,
        email=user_info.email,
        user_name=user_info.user_name,
        user_intro=user_info.user_intro,
        refresh_token=user_info.refresh_token,
        count=user_record,
        password=user_info.password,
        created_at=user_info.created_at
    )

    return user

def get_user_byId(db, user_id: str):
    user = db.query(users_model.Users).filter(users_model.Users.user_id == user_id).first()
    return user


# OAuth2による認可
# usernameはOAuth2PasswordRequestFormの変数、実際はemailを入力
def authenticate_user(db: Session, username: str, password: str):
    user = all_get_user(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="このメールアドレスは登録されていません")
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

# JWTの作成（リフレッシュトークン発行）：セッションIDを返す
def create_refresh_token(db: Session, data: dict, user_id: str, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=60)
    to_encode.update({"exp": expire})
    to_encode.update({"token_type": "refresh_token"})
    refresh_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    session_id = generate_uuid()

    db_refresh = db.query(users_model.Users).filter(users_model.Users.user_id == user_id).first()
    db_refresh.refresh_token = refresh_jwt
    db.commit()
    db.refresh(db_refresh)

    db_session = users_model.Sessions(
        session_id=session_id,
        refresh_token=refresh_jwt
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return session_id

# Cookieからアクセストークンを取得
async def get_a_token_from_cookie(request: Request) -> HTTPAuthorizationCredentials:
    a_token = request.cookies.get("auth_a")
    if a_token is None:
        raise HTTPException(status_code=401, detail="Cookie not found")
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials=a_token)

# CookieからセッションIDを取得
async def get_session_id_from_cookie(request: Request) -> str:
    session_id = request.cookies.get("auth_i")
    if session_id is None:
        raise HTTPException(status_code=401, detail="Session not found")
    return session_id


# アクセストークンからカレントユーザー取得
async def get_current_user(token: HTTPAuthorizationCredentials=Depends(get_a_token_from_cookie), db: AsyncSession=Depends(get_db)):
    return await get_current_user_from_token('access_token', token.credentials, db=db)


# セッションIDからリフレッシュトークンを取得★
async def get_current_user_with_session_refresh(session_id: str=Depends(get_session_id_from_cookie), db: AsyncSession=Depends(get_db)) -> str:
    refresh_token = session_token.getRefreshBySession(session_id=session_id, db=db)
    if refresh_token is None:
        raise HTTPException(status_code=401, detail="Refresh token not found")

    return await get_current_user_from_token('refresh_token', token=refresh_token, db=db)


# カレントユーザー取得
async def get_current_user_from_token(token_type: str, token: str, db:AsyncSession):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    #デコード実施
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='トークン有効期限切れ')

    #token_typeが一致しているか確認、していなかったらエラーを返す
    if payload.get("token_type") != token_type:
        raise HTTPException(status_code=401, detail='トークンタイプ不一致')

    # リフレッシュトークンの場合、受け取ったものとDBに保存されているものが一致するか確認
    user_id = payload.get("user_id")
    db_user = db.query(users_model.Users).filter(users_model.Users.user_id == user_id).first()

    if token_type == 'refresh_token' and db_user.refresh_token != token:
        raise HTTPException(status_code=401, detail='リフレッシュトークン不一致')
    try:
        user_email: str = payload.get("email")
        if user_email is None:
            raise credentials_exception
        token_data = users_schema.TokenData(username=user_email)
    except JWTError:
        raise credentials_exception
    if token_type == 'access_token':
        user = get_user(db, username=token_data.username)
    elif token_type == 'refresh_token':
        user = all_get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    

    return user

# ログアウト
async def logout(request: Request, db: AsyncSession = Depends(get_db)):
    auth_id = request.cookies.get("auth_i")
    auth_ac = request.cookies.get("auth_a")
    if auth_id is None or  auth_ac is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # リフレッシュトークンの削除
    refresh_token = session_token.getRefreshBySession(session_id=auth_id, db=db)
    db.query(users_model.Users).filter(users_model.Users.refresh_token == refresh_token).update({"refresh_token": None})
    db.commit()

    # セッションの削除
    db_session = db.query(users_model.Sessions).filter(users_model.Sessions.session_id == auth_id).first()
    if db_session is None:
        raise HTTPException(status_code=401, detail="User not found")
    db.delete(db_session)
    db.commit()
    
    return {"message": "Sign Out!!"}


    # Cookieの削除
def delete_cookie(response:Response):
    response.delete_cookie(key="auth_a")
    response.delete_cookie(key="auth_i")

    return response



# ユーザー情報変更
async def update_user(db: AsyncSession, update_user: users_schema.UpdateUser):
    user = db.query(users_model.Users).filter(users_model.Users.user_id == update_user.user_id).first()
    user.user_name = update_user.user_name
    user.user_intro = update_user.user_intro
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "Update Done!!"}


# マイページ表示データの取得
async def mypage(db: AsyncSession, user_id: str):
    # 得意ワード５つ取得
    g = f"SELECT  FROM `answer_rate_view` WHERE user_id = :user_id ORDER BY answer_rate ASC LIMIT 5"
    my_text = text(g)
    good_cards = db.execute(my_text,{"user_id": user_id}).fetchall()
    # 苦手ワード５つ取得
    b = f"SELECT * FROM `answer_rate_view` WHERE user_id = :user_id ORDER BY answer_rate DESC LIMIT 5"
    my_text = text(b)
    bad_cards = db.execute(my_text,{"user_id": user_id}).fetchall()
    data = {
        "good_cards": good_cards,
        "bad_cards": bad_cards
    }
    return users_schema.UserInfo(**data)