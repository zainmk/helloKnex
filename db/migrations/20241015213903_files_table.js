/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('files', function(table){
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.bigInteger('tenantId').unsigned().notNullable().references('id').inTable('tenants').withKeyName('tenantId').onDelete('CASCADE').onUpdate('CASCADE'); // FK
        table.string('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE'); // FK
        table.string('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE'); // FK
        table.bigIncrements('id'); // PK 
        table.datetime('deletedAt');
        table.string('filename').notNullable();
        table.string('url').notNullable();
        table.integer('size');
        table.string('type').notNullable();
        table.string('label');
        table.bigint('resourceId');
        table.string('resourceType').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('files')
};
