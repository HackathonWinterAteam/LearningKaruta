from pydantic import BaseModel, Field

# JSONで受け渡しするデータ型の定義を行う

#レスポンススキーマ(クラス名称は要検討)仮記述のため後ほど要検討！

class Boxes(BaseModel):
    box_id: int
    box_name: str # = Field(None, example="Git”)

class Cards(BaseModel):
    card_id: int
    question_id: int
    question_text: str #(None, example="ブランチ確認”)
    answer_id:int
    answer_text: str #(None, example="git branch”)

#リクエストスキーマ