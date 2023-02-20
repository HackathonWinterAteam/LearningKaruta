from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
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

# 札セット取得
def read_playing_cards(db: Session, box_id: int) -> games_model.boxes_cards :
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
    PlayCardsList = db.execute(t).fetchall()

    return PlayCardsList

#　プレイ結果記録 非同期にする！！
def play_records(db: Session, result: games_schema.Results):

    #プレイ記録親テーブルに記録
    db_result = games_model.play_records(
        user_id = result.user_id,
        number_of_question = result.number_of_question,
        number_of_corrected = result.number_of_corrected,
        played_at = result.played_at,
        play_type = result.play_type
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)

    #↑で発行されたplayed_idを取得
    played_db = db.query(games_model.play_records).\
        filter(games_model.play_records.played_at == db_result.played_at).\
            filter(games_model.play_records.user_id == db_result.user_id).first()
    print(played_db)
    played_id = played_db.played_id

    # プレイしたお題の記録
    db_box = games_model.play_type_boxes(
        played_id = played_id,
        box_id = result.box_id
    )
    db.add(db_box)
    db.commit()
    db.refresh(db_box)

    record_result = result.record_result
    
    for card_id, judgement in record_result.items():
        
        db_detail = games_model.record_details(
            played_id = played_id,
            card_id = card_id,
            judgement = judgement,
            user_id = result.user_id
        )

        db.add(db_detail)
        db.commit()
        db.refresh(db_detail)

    return "Input Game Result!"

# 苦手札の札IDを取得
def weak_point_cards(db: Session):
    weak_card = db.query()