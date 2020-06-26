### typegraphql

- @Query で api で取得できるデータ型を決めるため、 return するデータを好き勝手に整形できない。ただ ページネーションのような機能であれば return するデータの型は同じなので問題ない。
- つまりデータの型を先に宣言しておいて、その宣言する時点でどんな整形方法を適用するかを決めておく必要がある。それをするのに必要なのが Context などのツールである。
- `@ArgsType` `@Args` は `@Query` 用。でも動いているような感じ。`＠Mutation` には `@InputType()` を使用。
- relation じゃないと取得できないようなデータは `class methods` に定義するか、resolver の `@FieldResolver()` に定義する。
