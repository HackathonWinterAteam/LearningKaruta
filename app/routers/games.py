from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import schemas.games as games_schema
import cruds.games as games_cruds

from typing import List

# フロントに渡したときの実行状態　：テスト検討

# root
@router.get("/")
def root():
    #ユーザー分岐予定？
    return {"test": "HelloWorld"}

# ゲーム選択
@router.get("/karuta", response_model=List[games_schema.Boxes])
def game_select(db: Session = Depends(get_db)):
    return games_cruds.read_boxes(db=db)


# ゲームスタート（札を渡す）
@router.get("/karuta/{box_id}", response_model=List[games_schema.Cards])
def game(box_id: int, db: Session = Depends(get_db)): #パスパラメータbox_idがgame関数に引数として渡される
    return games_cruds.read_playing_cards(db=db, box_id=box_id)

# ゲーム終了（ログインなし）
@router.get("/karuta/result")
def game_result():
    pass

#ゲーム終了（ログインあり・結果記録）
@router.post("/karuta/result/")
def game_result(result: games_schema.Results, db: AsyncSession = Depends(get_db)):
    return games_cruds.play_records(db=db, result=result)
