import datetime
from pydantic import BaseModel, Field
from typing import Optional

# JSONで受け渡しするデータ型の定義を行う

#レスポンススキーマ(クラス名称は要検討)仮記述のため後ほど要検討！

class Boxes(BaseModel):
    box_id: int
    box_name: str # = Field(None, example="Git”)
    box_category: str

    class Config:
        orm_mode = True

class Cards(BaseModel):
    card_id: str 
    question_id: str
    answer_id:str
    question_text: str #(None, example="ブランチ確認”)
    card_text: str# "ブランチ確認　 git branch"：これがほしい ★★
    answer_text: str #(None, example="git branch”)
    answer_file_pass: Optional[str]

    class Config:
        orm_mode = True


#リクエストスキーマ
class Results(BaseModel):
    user_id: int
    number_of_questions: int
    number_of_correct: int
    played_at: datetime.datetime
    play_type: str
    box_id: int
    record_result: dict[int, bool]

class SelectedBox(BaseModel):
    box_id: int

    class Config:
        orm_mode = True
