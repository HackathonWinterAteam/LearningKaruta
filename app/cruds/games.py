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


def read_playing_cards(db: Session, box_id: int):
    t = text('SELECT card_id, question_id, answer_id, question_text, answer_text, answer_file_pass \
            FROM ((boxes_cards AS bc \
            INNER JOIN question_answer_cards AS qac \
            ON bc.card_id = qac.card_id AND bc.box_id = :box_id \
            INNNER JOIN question_texts AS qt \
            ON qac.question_id = qt.question_id) \
            INNER JOIN answer_texts AS at \
            ON qac.answer_id = at.answer_id \
            LEFT JOIN answer_images AS aimg \
            ON at.answer_id = aimg.answer_id)') #結合抽出処理
    t = t.bindparams(bindparam('box_id',type_=int))
    PlayCardsList = db.execute(t, box_id=box_id)
    return PlayCardsList


