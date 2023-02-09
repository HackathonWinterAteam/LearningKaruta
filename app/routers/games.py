from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

import schemas.games as games_schema
import cruds.games as games_cruds

from typing import List

# トップページ
@router.get("/")
def root():
    #ユーザー分岐予定
    return {"test": "HelloWorld"}


# ゲーム選択
@router.get("/karuta", response_model=List[games_schema.Boxes])
def game_select(db: Session = Depends(get_db)):
    return games_cruds.read_boxes(db=db)


# ゲームスタート（札を渡す）
@router.get("/karuta/{box_id}", response_model=List[games_schema.Cards])
def game():
    return [games_schema.Cards(card_id=1, question_id=1, question_text="", answer_id="", answer_text="")]

# ゲーム終了（ログインなし）
@router.get("/karuta/result")
def game_result():
    pass

#ゲーム終了（ログインあり・結果記録）
@router.post("/karuta/result/{played_id}") # パスパラメータではないかも　played_idは自動で割り振られる？
def game_result():
    pass

