from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from sqlalchemy import bindparam
from models import games as games_model
from schemas import games as games_schema


# お題一覧取得

def read_boxes(db: Session, skip: int = 0):
    BoxList = db.query(games_model.boxes).offset(skip).all()
    return BoxList


# 札取得JOINの定義
'''
boxes_cards = games_model.boxes_cards
q_a_cards = games_model.question_answer_cards
q_texts = games_model.question_texts
a_texts = games_model.answer_texts
a_images = games_model.answer_images
'''

'''
def read_playing_cards(db: Session):
    t = text('SELECT card_id, question_id, answer_id, question_text, answer_text, answer_file_pass 
            FROM (question_answer_cards AS qac
            INNER JOIN question_texts AS qt
            ON (qac.question_id = qt.question_id AND ))') #結合抽出処理
    t = t.bindparams(bindparam("",type=))
    PlayCardsList = db.execute(t, {"": })
    return PlayCardsList

    '''