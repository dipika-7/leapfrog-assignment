import { Knex } from "knex";
import { PEOPLE } from "../../constant/database";

const TABLE_NAME = "tasks";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("value").notNullable();

    table.boolean("completed").defaultTo(false);

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("created_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable(PEOPLE);

    table.timestamp("updated_at").nullable();

    table
      .bigInteger("updated_by")
      .unsigned()
      .references("id")
      .inTable(PEOPLE)
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
