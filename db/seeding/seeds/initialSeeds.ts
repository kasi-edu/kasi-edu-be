import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, DataSource } from 'typeorm';
import * as _ from 'lodash';

import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { Category } from 'src/category/entities/category.entity';

const categories: CreateCategoryDto[] = [
  { name: 'digital marketing' },
  { name: 'video editing' },
  { name: 'coding school' },
  { name: 'mechanik' },
  { name: 'kecantikan' },
  { name: 'memasak' },
  { name: 'otomotif' },
];

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // * seed category
    for (const category of categories) {
      const existingCategory = await connection
        .getRepository(Category)
        .findOne({ where: { name: category.name } });

      if (!existingCategory) {
        await factory(Category)(category).create();
      }
    }
  }
}
