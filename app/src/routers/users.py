from fastapi import APIRouter

router = APIRouter()

#ユーザー登録
@router.post("/signup")
def signup():
    pass

#ログイン
@router.post("/login")
def login():
    pass

#サインアウト
