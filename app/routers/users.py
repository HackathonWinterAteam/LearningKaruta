from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from database import get_db
import models.users as users_model
import schemas.users as users_schema
import cruds.users as users_cruds
from datetime import timedelta
import os
from typing import List

router = APIRouter()



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/signin") # フロントがユーザー名とパスワードを送信するURI

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.environ.get("REFRESH_TOKEN_EXPIRE_DAYS"))



# Crate

#ユーザー登録
@router.post("/users/register",response_model=users_schema.User)
def user_register(user:users_schema.CreateUser, db: Session = Depends(get_db)):
    get_email = user.email
    get_user_email = db.query(users_model.Users.email).filter(users_model.Users.email == get_email).first()
    if get_user_email != None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="既に登録されているメールアドレスです"
        )
    else:
        create_user = users_cruds.create_user(db = db, user=user)
        return create_user


# 認可、トークン発行
@router.post("/users/signin")
def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = users_cruds.authenticate_user(db,form_data.username, form_data.password)
    if not user:
        # メッセージ書き直す
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(minutes=REFRESH_TOKEN_EXPIRE_DAYS)

    user_data = {
        "user_id": user.user_id,
        "user_name": user.user_name,
        "email": user.email,
        "created_at": str(user.created_at)
    }
    user_id = user.user_id
    access_token = users_cruds.create_access_token(
        user_data, expires_delta=access_token_expires
    )
    refresh_token = users_cruds.create_refresh_token(
        db, user_data, user_id=user_id, expires_delta=refresh_token_expires
    )
    a_token = {"access_token": access_token}
    r_token = {"refresh_token": refresh_token}
    response_data = user_data | a_token | r_token
    return response_data


# カレントユーザーの検証
@router.get("/users/me")
async def current_user(current_user: users_schema.User = Depends(users_cruds.get_current_user)):
    return current_user

# リフレッシュトークンでトークンを再取得
@router.get("/refresh_token")
async def refresh_token(current_user: users_schema.User = Depends(users_cruds.get_current_user_with_refresh_token), db: AsyncSession = Depends(get_db)):

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(minutes=REFRESH_TOKEN_EXPIRE_DAYS)

    user_data = {
        "user_id": current_user.user_id,
        "user_name": current_user.user_name,
        "email": current_user.email,
        "created_at": str(current_user.created_at)
    }
    user_id = current_user.user_id
    access_token = users_cruds.create_access_token(
        user_data, expires_delta=access_token_expires
    )
    refresh_token = users_cruds.create_refresh_token(
        db, user_data, user_id=user_id, expires_delta=refresh_token_expires
    )
    a_token = {"access_token": access_token}
    r_token = {"refresh_token": refresh_token}
    response_data = user_data | a_token | r_token
    return response_data
