from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from typing import Dict, Any
from database import get_db
import models.users as users_model
import schemas.users as users_schema
import cruds.users as users_cruds
from datetime import timedelta
import os

router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/signin") 

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.environ.get("REFRESH_TOKEN_EXPIRE_DAYS"))




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
@router.post("/users/signin", response_model=Dict[str, Any])
async def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = users_cruds.authenticate_user(db,form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

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


    response = JSONResponse(content=user_data | {"access_token": access_token} | {"refresh_token": refresh_token})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return response

    # response = Response()
    # response.set_cookie(key="access_token", value=access_token, httponly=True)
    # response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    # return user_data | {"access_token": access_token} | {"refresh_token": refresh_token}


# 認証
@router.get("/users/me")
async def current_user(current_user: users_schema.User = Depends(users_cruds.get_current_user)):
    return current_user

# リフレッシュトークンでアクセストークンを再取得
@router.get("/refresh_token", response_model=Dict[str, Any])
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



    response = JSONResponse(content=user_data | {"access_token": access_token} | {"refresh_token": refresh_token})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return response


# マイページ表示用データ
@router.get("/mypage", response_model=users_schema.UserInfo)
def mypage():
    pass

# ユーザー情報編集
@router.put("/intro_update/{user_id}")
def intro_update(user_id: str, db: Session = Depends(get_db)):
    pass