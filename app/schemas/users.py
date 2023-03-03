import datetime
from typing import Optional, Union
from pydantic import BaseModel, Field


# リクエスト

class CreateUser(BaseModel):
    user_name: str
    email: str
    password: str

    class Config:
        orm_mode = True

class UpdateUser(BaseModel):
    user_name: str
    user_intro: Union[str, None]

    class Config:
        orm_mode = True


#レスポンス
class User(BaseModel):
    user_id: str
    user_name: str
    email: str
    user_intro:  Union[str, None]
    count: Union[int, None]
    created_at: datetime.datetime

    class Config:
        orm_mode = True

class User_all(User):
    password: str
    refresh_token: str

    class Config:
        orm_mode = True


class UserInfo(BaseModel):
    user_name: str
    user_intro: str
    number_of_plays : int
    win_rate: int
    good_word: str
    bad_word: str

class Token(BaseModel):
    user_name: str
    email: str
    user_id: str
    created_at: str
    access_token: str
    refresh_token: str
    #token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class SessionData:
    refresh_token: str
