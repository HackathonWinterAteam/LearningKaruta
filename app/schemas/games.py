from pydantic import BaseModel, Field
from typing import Optional

# JSONで受け渡しするデータ型の定義を行う

#レスポンススキーマ(クラス名称は要検討)仮記述のため後ほど要検討！

class Boxes(BaseModel):
    box_id: int
    box_name: str # = Field(None, example="Git”)
    box_category: str

class Cards(BaseModel):
    card_id: int #JS：str 要型変換？
    question_id: int
    answer_id:int
    question_text: str #(None, example="ブランチ確認”)
    # "ブランチ確認　 git branch"：これがほしい ★★
    answer_text: str #(None, example="git branch”)
    answer_file_pass: Optional[str]

    class Config:
        orm_mode = True



#リクエストスキーマ

class SelectedBox(BaseModel):
    box_id: int

    class Config:
        orm_mode = True
