import datetime
from pydantic import BaseModel
from typing import Optional


class Boxes(BaseModel):
    box_id: int
    box_name: str 
    box_category: str

    class Config:
        orm_mode = True

class Cards(BaseModel):
    card_id: str 
    question_id: str
    answer_id:str
    question_text: str
    card_text: str 
    answer_text: str 
    answer_file_pass: Optional[str]

    class Config:
        orm_mode = True


#リクエストスキーマ
class Results(BaseModel):
    user_id: str
    number_of_question: int
    number_of_corrected: int
    played_at: datetime.datetime
    play_type: str
    box_id: int
    record_result: dict[int, bool]

class SelectedBox(BaseModel):
    box_id: int

    class Config:
        orm_mode = True
