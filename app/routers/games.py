from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
import schemas.games as games_schema
import cruds.games as games_cruds
from typing import List


router = APIRouter()


# root
'''
@router.get("/")
def root():
    return {"test": "HelloWorld"}
'''

# ゲーム選択
@router.get("/karuta", response_model=List[games_schema.Boxes])
def game_select(db: Session = Depends(get_db)):
    return games_cruds.read_boxes(db=db)


# ゲームスタート（札を渡す）
@router.get("/karuta/{box_id}", response_model=List[games_schema.Cards])
def game(box_id: int, db: Session = Depends(get_db)): #パスパラメータbox_idがgame関数に引数として渡される
    return games_cruds.read_playing_cards(db=db, box_id=box_id)

# 苦手札
@router.get("/karuta/weak", response_model=List[games_schema.Cards])
def weak_game(user_id: str, db: Session = Depends(get_db)):
    return games_cruds.weak_point_cards(db=db, user_id=user_id)


#ゲーム終了（ログインあり・結果記録）
@router.post("/karuta/result/")
async def game_result(result: games_schema.Results, db: AsyncSession = Depends(get_db)):
    return await games_cruds.play_records(db=db, result=result)
