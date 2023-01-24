from typing import Optional
from pydantic import BaseModel, Field


#レスポンススキーマ(クラス名称は要検討)仮記述のため後ほど要検討！
class Box_list(BaseModel):
    box_id : int
    box_name : str

class Box(BaseModel):
    box_id : int
    box_name : str
    card_object : dict[str]


#リクエストスキーマ