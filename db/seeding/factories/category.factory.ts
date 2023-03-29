import { define } from 'typeorm-seeding';

import { Category } from 'src/category/entities/category.entity';

interface Context {
  name: string;
}

define(Category, (faker, context: Context) => {
  const { name } = context;
  const category = new Category();

  category.name = name;

  return category;
});
