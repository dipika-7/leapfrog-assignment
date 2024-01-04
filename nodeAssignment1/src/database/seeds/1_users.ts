import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          username: "dipika",
          email: "dipik1@gmail.com",
          password:
            "$2b$10$ESBnW0h63cfky4b5NGyrM.MMIOGuutxWNnr5r7bqEuSdCuKzEbdsW",
          refresh_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRwWTFYekpUVnJlYSIsImVtYWlsIjoiZGlwaWsxQGdtYWlsLmNvbSIsInRva2VuVHlwZSI6InJlZnJlc2hUb2tlbiIsImlhdCI6MTcwNDIxNzEwNSwiZXhwIjoxNzA0MjE3NjA1fQ.YWoPLQKsJVld2UszqVW3mDYd2bN1xE5gm184E3rhdts",
        },
        {
          username: "dipika",
          email: "dipik2@gmail.com",
          password:
            "$2b$10$X7Z21wcwwMDJGlrHqoNk.OkHegUmi3eVKPtcIEPjGLvEQLlzDm3Y6",
          refresh_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IklOUTRabjd1N3lpcSIsImVtYWlsIjoiZGlwaWsyQGdtYWlsLmNvbSIsInRva2VuVHlwZSI6InJlZnJlc2hUb2tlbiIsImlhdCI6MTcwNDEzOTkwMSwiZXhwIjoxNzA0MTQwNDAxfQ.VvKednMS2efksYh4XzTxBIvtU4UkTqPr4P4Fnk8B6bY",
        },
      ]);
    });
}
