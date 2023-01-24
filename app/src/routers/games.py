from fastapi import APIRouter

router = APIRouter()

# トップページ
@router.get("/")
def root():
    #ユーザー分岐予定
    return {"test": "HelloWorld"}


# ゲーム選択
@router.get("/karuta")
def game_select():
    return {"test":"game"}

# ゲームスタート
@router.get("/karuta/{box_id}")
def game():
    pass

# ゲーム終了（ログインなし）
@router.get("/karuta/result")
def game_result():
    pass

#ゲーム終了（ログインあり・結果記録）
@router.post("/karuta/result/{played_id}")
def game_result():
    pass

