### Reference

#### ejs

- [medium article: Master EJS template engine with Node.js and Expressjs](https://medium.com/swlh/master-ejs-template-engine-with-node-js-and-expressjs-979cc22b69be)

#### typeorm

- すでにプロジェクトを作っている： `typeorm init --database [your-favorite-database]`
- want to create new project: `typeorm init --name MyProject --database [your-favorite-database]`
- You can generate an even more advanced project with express installed by running `typeorm init --name MyProject --database mysql --express` command.
- `entity` を変更するとデータベースのテーブルも変更してしまう。レコードがあろうと entity を変更して実行するたびにデータベースのテーブルが変更されます。`ormconfig.json` の `synchronize` を `false` にする。（特に production）変わりに「Entity を作る → migration ファイルの生成 → migration ファイルの実行」という流れを行う。
- `ormconfig.json` is the default. if you want to switch bt dev and prod then use `ormconfig.js` and `export.default = ...`

- `Adjacency list`: Referring itself. such as Category of Category.
- `Closure table`: stores `relations` between parent and child `in a separate table in a special way`. Its efficient in both reads and writes.
- `save` method returns an instance of the same object you pass to it. `insert` も `update` も `save` を使用。
- `getSql()` : 構築されるクエリを確認 `createQueryBuilder().from(User, 'users').getSql()` -> `SELECT * FROM 'users 'users'`
- [Query Builder Reference](https://www.wakuwakubank.com/posts/731-typeorm-query-builder/)
- [migration reference](https://www.wakuwakubank.com/posts/729-typeorm-migration/)
- [namingStrategy](https://www.wakuwakubank.com/posts/730-typeorm-custom-naming/)

- `Relation`: We are forced to `use a function that returns a class`, instead of using the class directly, because of the language specifics. We can also write it as `() => Photo`, but we use `type => Photo` as a convention to increase code readability. The `type variable` itself does not contain anything. (this is how you define relation `in an unidirectional way.`)
- We also add a `@JoinColumn decorator`, which indicates that `this side of the relationship will own the relationship`. Relations can be `unidirectional` or `bidirectional`. Only one side of relational can be owning. Using `@JoinColumn decorator` is `required on the owner side of the relationship`. The owning side of a relationship contains a column with a foreign key in the database.
- `Owner じゃ無い方を先に save`
- We can setup `cascade options` in our relations, in the cases when we want our related object to be saved whenever the other object is saved. `cascade を使いたいときは save したい側で true にする。`
- `Bidirectional way`: `@OneToOne(type => Photo, photo => photo.metadata)` or `@OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo)` -　`many-to-one / one-to-many relation`:
  `many-to-one`: a book has only one author
  `one-to-many`: author has many books
  Author contains an `inverse side of a relation`. `OneToMany` is always an inverse side of relation, and `it can't exist without` `ManyToOne` `on the other side of the relation`.

#### sqlite

- reference: https://www.dbonline.jp/sqlite/

#### ts

- Property '…' has no initializer and is not definitely assigned in the constructor
  : https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc

#### express + controllers?

- [`typestack/routing-controllers`](https://github.com/typestack/routing-controllers)
