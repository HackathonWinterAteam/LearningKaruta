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
- create_access_token（→generate_uuid）：session_idを生成するのにuuidという関数名になっている
- create_refresh_token（→generate_uuid）：同上
- get_a_token_from_cookie
- get_session_id_from_cookie
- get_current_user（→get_a_token_from_cookie, get_current_user_from_token）
- get_current_user_with_session_refresh（→get_session_id_from_cookie, get_current_user_from_token）
- get_current_user_from_token（→get_user,all_get_user）
- logout（→getRefreshBySession）
