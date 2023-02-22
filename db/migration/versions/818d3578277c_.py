"""empty message

Revision ID: 818d3578277c
Revises: 506a0ca9fc1f
Create Date: 2023-02-21 10:10:37.851675

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = '818d3578277c'
down_revision = '506a0ca9fc1f'
branch_labels = None
depends_on = None


def upgrade() -> None:
    conn = op.get_bind()
    view_query = "CREATE VIEW answer_rate_view AS SELECT card_id, user_id, AVG(judgement) AS answer_rate FROM record_details GROUP BY card_id, user_id"
    conn.execute(text(view_query))


def downgrade() -> None:
    pass
