# リファクタリング memo

## TODO

- CRUD が肥大化 → ファイル分割
- 関数の洗い出し
- 変数名の見直し

## 疑問点

- エラーハンドリングは router で行う、で正しいか
- 適切な変数名の付け方（超迷う）
- import がありすぎて複雑になる？対策を調査

### 関数の洗い出し
#### cruds/user
- UUID生成:utils
- PWハッシュ化:utils
- PW検証:utils
- ユーザー新規登録（→generate_uuid,get_password_hash）:db
- get_user（PW,token以外）:db
- all_get_user（全データ）:db
- get_user_byId:db
- authenticate_user（→all_get_user）:auth
- create_access_token（→generate_uuid）:util
- create_refresh_token（→generate_uuid）:↑と同じことをしている⚠️ 
- get_a_token_from_cookie:client
- get_session_id_from_cookie:client
- get_current_user（→get_a_token_from_cookie, get_current_user_from_token）: access_tokenからであると明示していない
- get_current_user_with_session_refresh（→get_session_id_from_cookie, get_current_user_from_token）:with?, commentが不適切
- get_current_user_from_token（→get_user,all_get_user）:↑の２つの戻り値となる関数/db
- logout（→getRefreshBySession）
- getRefreshBySession: 命名が不適切, 同じことをしている関数がある


### エンドポイント
- /users/register
- /users/signin
- /users/me
- /refresh_token
- /signout
- /user_update
- /mypage/{user_id}

### 何が問題か,気づき
crudの中で呼び出しあっている。
ハッシュかやUUID生成はユーティリティ関数？
cookieから取得：アクセストークン、セッションID
session_idから取得：
get_current_userは無印、セッション（r_token）から、tokenからの3パターンあるが関数名がよく分からない
リフレッシュトークンからログイン中のユーザーデータを返すときに全データを返している（仕方ない？）

### 改善案
router/auth.py
utilディレクトリに生成、検証の関数を入れる
DB操作をしているかどうか考える
「メールアドレスまたはパスワードが違います」に変える
フローチャート

### 必要な処理
- util: UUID生成/ハッシュ化/pw検証
- get_user: フロントに返すuser,all_data / by_id /
- トークン生成（expireが異なる）
- cookieからアクセストークンを取得
- cookieからセッションIDを取得
- セッションIDからリフレッシュトークンを取得
- 認可
- トークンからログイン中のユーザーを取得
- アクセストークンからの場合、リフレッシュトークンからの場合:引数を変える
