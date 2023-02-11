from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from sqlalchemy import bindparam, Integer
from sqlalchemy.orm import Session
from models import games as games_model
from schemas import games as games_schema


# お題一覧取得

def read_boxes(db: Session, skip: int = 0):
    BoxList = db.query(games_model.boxes).offset(skip).all()
    return BoxList


def read_playing_cards(db: Session, box_id: int) -> games_model.boxes_cards :
    bid = games_model.boxes_cards.box_id
    t = text('SELECT qac.card_id AS card_id, qt.question_id AS question_id, \
            at.answer_id AS answer_id, qt.question_text AS question_text, \
            at.answer_text AS answer_text, aimg.answer_file_pass AS answer_file_pass \
            FROM (box_card AS bc \
            INNER JOIN question_answer_cards AS qac \
            ON bc.card_id = qac.card_id AND bc.box_id = :box_id \
            INNER JOIN question_texts AS qt \
            ON qac.question_id = qt.question_id) \
            INNER JOIN answer_texts AS at \
            ON qac.answer_id = at.answer_id \
            LEFT JOIN answer_images AS aimg \
            ON at.answer_id = aimg.answer_id' \
            ) #結合抽出処理
    t = t.bindparams(bindparam('box_id', value='bid', type_=Integer))
    results = db.execute(t)
    for result in results:
        # 一行ずつリスト化
        PlayCardsList = list(result)

        # valueをint化して配列にpush
        # card_id.push(str(PlayCardsList['card_id']))

        return PlayCardsList



