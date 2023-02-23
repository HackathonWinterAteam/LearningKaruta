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


