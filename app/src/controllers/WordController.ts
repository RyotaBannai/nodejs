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
    console.log(word);
    const user_word = await createQueryBuilder("user_word")
      .where("user_word.userId = :id", { userId: 1 })
      .getOne();
    const new_word: Word = this.repository.create(word);
    //new_word.user_word = user_word;
    console.log(user_word);
    return this.repository.save(new_word);
  }
}
