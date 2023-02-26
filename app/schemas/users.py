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


#レスポンス
class User(CreateUser):
    user_id: str
    
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
