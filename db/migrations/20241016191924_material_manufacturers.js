/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('material_manufacturers', (table) => {
        table.bigInteger('tenantId').unsigned()
            .notNullable()
            .references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('addedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.string('updatedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.bigIncrements('id'); // PK
        table.bigint('materialId')
            .notNullable()
            .unsigned()
            .references('id').inTable('materials').onDelete('CASCADE').onUpdate('CASCADE');
        table.bigint('manufacturerId')
            .notNullable()
            .unsigned()
            .references('id').inTable('manufacturers').onDelete('CASCADE').onUpdate('CASCADE');
        table.unique(['materialId', 'manufacturerId'])
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
  return knex.schema.dropTable('material_manufacturers');
};
