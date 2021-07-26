import { schema } from 'normalizr';

export const repositoryEntity = new schema.Entity(
  'repositories',
  {},
  {
    idAttribute: 'full_name',
  }
);
