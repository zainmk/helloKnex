/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('customers', function(table){
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

        table.bigInteger('tenantId').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE'); // FK
        table.string('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE'); // FK
        table.string('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE'); // FK
        table.bigIncrements('id'); // PK
        table.string('name').notNullable();
        table.string('notes');
        table.datetime('deletedAt');
        table.integer('quickbooksId').unique({ indexName: 'quickbooksId' });
        table.string('sageId').unique({ indexName: 'sageId' }); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('customers')
};
