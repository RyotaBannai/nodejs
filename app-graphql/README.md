### typegraphql

- @Query で api で取得できるデータ型を決めるため、 return するデータを好き勝手に整形できない。ただ ページネーションのような機能であれば return するデータの型は同じなので問題ない。
- つまりデータの型を先に宣言しておいて、その宣言する時点でどんな整形方法を適用するかを決めておく必要がある。それをするのに必要なのが Context などのツールである。
- `@ArgsType` `@Args` は `@Query` 用。でも動いているような感じ。`＠Mutation` には `@InputType()` を使用。
- relation じゃないと取得できないようなデータは `class methods` に定義するか、resolver の `@FieldResolver()` に定義する。
- sparse list の場合 list のどれかが null になる場合がある。typegraphql では default で required なのでオプションで　`nullable: "itemsAndList"` にする。

```javascript
@Field(() => [[Item]]) // = [[Item!]!]! default
@Field(({nullable: "items"}) => [[Item]]) // [[Item]]!
@Field(({nullable: "itemsAndList"}) => [[Item]]) // [[Item]]
```

- what's the difference between `parseValue` and `parseLiteral` in `GraphQLScalarType`

  - parseValue for pure JSON, you don't need t AST (Abstract Syntax Tree): used when user passes data through `variables`.
  - parseLiteral for literal object which you need to convert it to AST to pass data to graphql: used when user passes data through `query`
  - [explanation](https://stackoverflow.com/questions/41510880/whats-the-difference-between-parsevalue-and-parseliteral-in-graphqlscalartype)
  - [how to create custom scalars](https://typegraphql.com/docs/scalars.html#custom-scalars)

- `Union type`: Sometimes our API has to be `flexible` and return a type that is `not specific but one from a range of possible types`. An example might be a movie site's search functionality: using the provided phrase we search the database `for movies but also actors`. So the query has to return a list of `Movie or Actor types`. `Resolving Type`: Be aware that when the query/mutation return type (or field type) is a union, `we have to return a specific instance of the object type class`. Otherwise, graphql-js will not be able to detect the underlying GraphQL type correctly when we use plain JS objects.
  use `resolveType` property in the `createUnionType({})` method.

- `IoC Container` (a.k.a. DI Container): is `a framework for implementing automatic dependency injection`. It manages object creation and it's life-time, and also injects dependencies to the class. The IoC container `creates an object of the specified class` and also `injects all the dependency objects through a constructor, a property or a method at run time` and `disposes it at the appropriate time`. This is done so that we don't have to create and manage objects manually. [For more details](https://www.tutorialsteacher.com/ioc/ioc-container#:~:text=IoC%20Container%20(a.k.a.%20DI%20Container,injects%20dependencies%20to%20the%20class.)

- `Authorization`: in GraphQL's resolver architecture we don't have middleware so we have to imperatively `call the auth checking function and manually pass context data to each resolver`, which might be a bit tedious. That's why authorization is `a first-class feature` in TypeGraphQL! We can leave the `@Authorized` decorator brackets empty or we can specify the `role/roles` that the user needs to possess in order to get access to the field, query or mutation. By default the roles are of type `string` but they can easily be changed as the decorator is generic - `@Authorized<number>(1, 7, 22)`
- `passport-jwt`:
  - `ignoreExpiration`: if `true` **do not validate the expiration of the token**.
  - `passReqToCallback`: If `true` the request will be passed to the verify callback. i.e. `verify(request, jwt_payload, done_callback`).
  - `jsonWebTokenOptions`: passport-jwt is verifying the token using `jsonwebtoken`. Pass here an options object for any other option you can pass the jsonwebtoken verifier. (i.e maxAge)
