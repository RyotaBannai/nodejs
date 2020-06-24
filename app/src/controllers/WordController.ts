import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import { Word } from "../entity/Word";
import { Repository, getRepository, createQueryBuilder } from "typeorm";
import { UserMeta } from "../entity/UserMeta";

@JsonController()
export class WordController {
  private repository: Repository<Word>;
  constructor() {
    this.repository = getRepository(Word);
  }

  @Get("/words")
  getAll() {
    return this.repository.findAndCount();
  }

  @Get("/words/:id")
  get(@Param("id") id: number) {
    return this.repository.find({
      relations: ["user_meta", "user_meta.user"],
      where: {
        user_meta: {
          userId: id,
        },
      },
    });
  }

  @Post("/words/save")
  async post(@Body() word: Word) {
    const user_word: UserMeta | unknown = await getRepository(UserMeta).findOne(
      {
        where: { userId: 2 },
      }
    );
    const new_word: Word = this.repository.create(word);
    if (user_word instanceof UserMeta) new_word.user_meta = user_word;
    return this.repository.save(new_word);
  }
}
