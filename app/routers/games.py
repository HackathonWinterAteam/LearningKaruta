from fastapi import APIRouter

router = APIRouter()

import schemas.games as games_schema
from typing import List

# トップページ
@router.get("/")
def root():
    #ユーザー分岐予定
    return {"test": "HelloWorld"}


# ゲーム選択
@router.get("/karuta", response_model=List[games_schema.Boxes])
def game_select():
    return [games_schema.Boxes(box_id=1, box_name="Git")]

# ゲームスタート
@router.get("/karuta/{box_id}", response_model=List[games_schema.Cards])
def game():
    return [games_schema.Cards(card_id=1, question_id=1, question_text="", answer_id="", answer_text="")]

# ゲーム終了（ログインなし）
@router.get("/karuta/result")
def game_result():
    pass

#ゲーム終了（ログインあり・結果記録）
@router.post("/karuta/result/{played_id}")
def game_result():
    pass

