import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import { Word } from "../entity/Word";
import { Repository, getRepository, createQueryBuilder } from "typeorm";
import { UserWord } from "../entity/UserWord";

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
    return this.repository.findOne(id, { relations: ["user_word"] });
  }

  @Post("/words/save")
  async post(@Body() word: Word) {
    const user_word: UserWord | unknown = await createQueryBuilder("user_word")
      .where("UserWord_userId = :id", { id: 1 })
      .getOne();
    const new_word: Word = this.repository.create(word);
    if (user_word instanceof UserWord) new_word.user_word = user_word;
    return this.repository.save(new_word);
  }
}
