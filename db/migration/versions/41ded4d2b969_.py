"""empty message

Revision ID: 41ded4d2b969
Revises: f85acc9d4850
Create Date: 2023-02-22 11:42:05.566677

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = '41ded4d2b969'
down_revision = 'f85acc9d4850'
branch_labels = None
depends_on = None


def upgrade() -> None:
    conn = op.get_bind()
    view_query = "CREATE VIEW answer_rate_view AS SELECT card_id, user_id, AVG(judgement) AS answer_rate FROM record_details GROUP BY card_id, user_id"
    conn.execute(text(view_query))


def downgrade() -> None:
    pass
