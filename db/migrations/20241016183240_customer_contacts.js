/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('customer_contacts', (table) => {
        table.bigInteger('tenantId').unsigned()
            .notNullable()
            .references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('addedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.string('updatedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.bigIncrements('id'); // PK
        table.string('type', 50)
            .notNullable()
        table.string('email')
            .notNullable()
        table.string('phone', 50)
            .notNullable()
        table.tinyint('primary')
            .notNullable()
        table.bigint('customerId')
            .notNullable()
            .unsigned()
            .references('id').inTable('customers').onDelete('CASCADE').onUpdate('CASCADE')
        table.timestamp('createdAt')
            .defaultTo(knex.fn.now())
        table.timestamp('updatedAt')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
        table.string('name')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('customer_contacts');
};
