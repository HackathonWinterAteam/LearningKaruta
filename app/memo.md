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
- UUID生成
- PWハッシュ化
- PW検証
- ユーザー新規登録（→generate_uuid,get_password_hash）
- get_user（PW,token以外）
- all_get_user（全データ）
- get_user_byId
- authenticate_user（→all_get_user）
- create_access_token（→generate_uuid）
- create_refresh_token（→generate_uuid）
- get_a_token_from_cookie
- get_session_id_from_cookie
- get_current_user（→get_a_token_from_cookie, get_current_user_from_token）
- get_current_user_with_session_refresh（→get_session_id_from_cookie, get_current_user_from_token）
- get_current_user_from_token（→get_user,all_get_user）
- logout（→getRefreshBySession）

#### session/session_token.py
- getRefreshBySession

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
セッションID使うならアクセストークンいる？でもこの重なりがセキュリティ強化
crudはなるべくDB接続だけにしたい
get_current_userは無印、セッション（r_token）から、tokenからの3パターンあるが関数名がよく分からない
get_userも2種類ある
getRefreshBySessionってなんだっけ
何から何を取得するか、を整理すべき

### 改善案
router/auth.py
utilディレクトリに生成、検証の関数を入れる

