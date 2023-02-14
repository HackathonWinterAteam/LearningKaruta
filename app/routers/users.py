from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from database import get_db
import schemas.users as users_schema
import cruds.users as users_cruds
from datetime import timedelta
import os
from typing import List

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/signin") # フロントがユーザー名とパスワードを送信するURI
#ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))


# Read

@router.get("/users/")
async def user(token: str = Depends(oauth2_scheme)):
    return {"token": token}


# Crate

#ユーザー登録
@router.post("/users/register",response_model=users_schema.User)
def user_register(user:users_schema.CreateUser, db: Session = Depends(get_db)):
    return users_cruds.create_user(db = db, user=user)

# 認証
@router.post("/users/signin")
async def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = users_cruds.authenticate_user(db,form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    user_data = {
        "user_id": user.user_id,
        "user_name": user.user_name,
        "email": user.email,
        "created_at": str(user.created_at),
    }
    access_token = users_cruds.create_access_token(
        user_data, expires_delta=access_token_expires
    )
    token = {"token": access_token}
    response_data = user_data | token
    return await response_data


# カレントユーザーの検証
@router.get("/users/me")
async def current_user(current_user: users_schema.User = Depends(users_cruds.get_current_user)):
    return await current_user
