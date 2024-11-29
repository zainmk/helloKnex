/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('equipment', (table) => {
        table.bigInteger('tenantId').unsigned()
            .notNullable()
            .references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('addedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.string('updatedBy')
            .references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.bigIncrements('id'); // PK

        table.string('description')
        table.string('manufacture')
        table.string('model')
        table.integer('year')
        table.string('type')
        table.string('subtype')
        table.string('serialNumber')
        table.string('licensePlate')
        table.string('capacity')
        table.integer('hp')
        table.string('shippingWeight')
        table.string('supportType')
        table.string('status')
        table.string('trade')
        table.string('site')
        table.string('planner')
        table.datetime('activeDate')
        table.decimal('purchasePrice', 10, 2)
        table.string('afeNumber')
        table.tinyint('ndtRequired')
            .defaultTo('0')
        table.tinyint('fssRequired')
            .defaultTo('1')
        table.string('cfm')
        table.double('rate')
            .defaultTo('0')
        table.bigint('customerId')
            .unsigned()
            .references('id').inTable('customers').onDelete('CASCADE').onUpdate('CASCADE');
        
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
  return knex.schema.dropTable('equipment');
};
