import datetime
from typing import Optional, Union
from pydantic import BaseModel, Field

# JSONで受け渡しするデータ型の定義を行う

# リクエストスキーマ
class CreateUser(BaseModel):
    user_name: str
    email: str
    password: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True

#レスポンス
class User(CreateUser):
    user_id: int
    
    class Config:
        orm_mode = True

# レスポンス
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


