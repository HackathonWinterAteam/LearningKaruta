from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from sqlalchemy import bindparam, Integer
from sqlalchemy.orm import Session
from models import games as games_model
from schemas import games as games_schema

def read_boxes(db: Session):
    BoxList = db.query(games_model.boxes).all()
    return BoxList


# お題一覧取得

def read_boxes(db: Session, skip: int = 0):
    BoxList = db.query(games_model.boxes).offset(skip).all()
    return BoxList


def read_playing_cards(db: Session, box_id: int) -> games_model.boxes_cards :
    # bid = games_model.boxes_cards.box_id
    t = text('SELECT CAST(qac.card_id AS CHAR) AS card_id, CAST(qt.question_id AS CHAR) AS question_id, \
            CAST(at.answer_id AS CHAR) AS answer_id, qt.question_text AS question_text, \
            CONCAT(qt.question_text, "  ", at.answer_text) AS card_text,\
            at.answer_text AS answer_text, aimg.answer_file_pass AS answer_file_pass \
            FROM (box_card AS bc \
            INNER JOIN question_answer_cards AS qac \
            ON bc.card_id = qac.card_id AND bc.box_id = box_id \
            INNER JOIN question_texts AS qt \
            ON qac.question_id = qt.question_id) \
            INNER JOIN answer_texts AS at \
            ON qac.answer_id = at.answer_id \
            LEFT JOIN answer_images AS aimg \
            ON at.answer_id = aimg.answer_id \
            ORDER BY RAND() LIMIT 10' \
            ) #結合抽出処理
    # t = t.bindparams(bindparam('box_id', value='bid', type_=Integer))
    PlayCardsList = db.execute(t).fetchall()

    return PlayCardsList








