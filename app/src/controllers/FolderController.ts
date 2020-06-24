import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import {
  Repository,
  getRepository,
  TreeRepository,
  getTreeRepository,
  createQueryBuilder,
} from "typeorm";
import { Folder } from "../entity/Folder";
import { Interface } from "readline";

interface FolderRequest extends Folder {
  parent_id?: number | null;
}

@JsonController()
export class FolderController {
  private repository: Repository<Folder>;
  private treeRepository: TreeRepository<Folder>;
  constructor() {
    this.repository = getRepository(Folder);
    this.treeRepository = getTreeRepository(Folder);
  }

  @Get("/folders")
  getAll() {
    return this.repository.findAndCount();
  }

  @Get("/folders/tree")
  getTree() {
    return this.treeRepository.findTrees();
  }

  @Get("/folders/:id")
  get(@Param("id") id: number) {
    return this.repository.find({
      where: { id: id },
    });
  }

  @Post("/folders/save")
  async post(@Body() folder: FolderRequest) {
    let parent: Folder | unknown;
    if (typeof folder.parent_id === "number")
      parent = await this.repository.findOne({
        where: { id: folder.parent_id },
      });
    delete folder.parent_id;
    console.log(folder);
    const new_folder: Folder = this.repository.create(folder);
    console.log(new_folder);
    if (parent instanceof Folder) new_folder.parent = parent;
    return this.repository.save(new_folder);
  }
}
