from fastapi import APIRouter

router = APIRouter()

# トップページ
@router.get("/")
def root():
    #ユーザー分岐予定
    return {"test": "HelloWorld"}


# ゲーム選択
@router.get("/karutas")
def game_select():
    pass

# ゲームスタート
@router.get("/karutas/{box_id}")
def game():
    pass

#ゲーム終了（結果記録）
@router.post("/karutas/result")
def game_result():
    pass

