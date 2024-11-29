/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('material_suppliers', (table) => {
        table.bigInteger('tenantId').unsigned()
            .notNullable()
            .references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('addedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.string('updatedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.bigIncrements('id'); // PK
        table.bigint('materialId')
            .unsigned()
            .notNullable()
            .references('id').inTable('materials').onDelete('CASCADE').onUpdate('CASCADE');
        table.bigint('supplierId')
            .unsigned()
            .notNullable()
            .references('id').inTable('suppliers').onDelete('CASCADE').onUpdate('CASCADE');
        table.unique(['materialId', 'supplierId'])

        table.decimal('price', 10, 2)
            .notNullable()
        table.string('serialNo')
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
  return knex.schema.dropTable('material_suppliers');
};
