import { Knex } from "knex";
import { PEOPLE } from "../../constant/database";

const TABLE_NAME = "table_name";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("tasks", function (table) {
    // Assuming 'related_table.id' is the foreign key column
    table.integer("user_id").unsigned();

    // Creating the foreign key
    table.foreign("user_id").references("users.id");

    // You can also specify the behavior on delete and update, for example:
    // table.foreign('related_column_id').references('related_table.id').onDelete('CASCADE').onUpdate('CASCADE');
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("tasks", function (table) {
    // Removing the foreign key
    table.dropForeign("user_id");

    // Dropping the column
    table.dropColumn("user_id");
  });
}
