/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('customer_sites', function(table){
        table.bigint('tenantId').unsigned().notNullable() // `tenantId` bigint NOT NULL,
        table.string('addedBy') // `addedBy` varchar(255) DEFAULT NULL,
        table.string('updatedBy') // `updatedBy` varchar(255) DEFAULT NULL,

        // PRIMARY KEY
        table.bigIncrements('id') // `id` bigint NOT NULL AUTO_INCREMENT,

        table.string('type', 50).notNullable() // `type` varchar(50) NOT NULL,
        table.boolean('primary').notNullable() // `primary` tinyint(1) NOT NULL,
        table.string('address').notNullable() // `address` varchar(255) NOT NULL,
        table.bigint('customerId').unsigned().notNullable()// `customerId` bigint NOT NULL,
        table.bigint('contactId').unsigned() // `contactId` bigint DEFAULT NULL,
        
        table.timestamp('createdAt').defaultTo(knex.fn.now()) // `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) // `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        table.datetime('deletedAt') // `deletedAt` datetime DEFAULT NULL,

        // FOREIGN KEYS
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('customerId').references('id').inTable('customers').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('contactId').references('id').inTable('customer_contacts').onDelete('CASCADE').onUpdate('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('customer_sites')
};
