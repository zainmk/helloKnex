/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('trades', (table) => {
        table.bigInteger('tenantId').unsigned()
            .notNullable()
            .references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('addedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.string('updatedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.bigIncrements('id'); // PK
        table.string('name')
            .notNullable()
        table.double('rate')
            .notNullable()
        table.timestamp('createdAt')
            .defaultTo(knex.fn.now())
        table.timestamp('updatedAt')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('trades')
};
