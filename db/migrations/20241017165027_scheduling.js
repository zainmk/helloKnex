/*
    schedules
    time_entries
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('schedules', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.enu('type', ['shift', 'pto', 'off']).notNullable();
            table.date('startDate').notNullable();
            table.date('endDate').notNullable();
            table.bigInteger('workerId').unsigned().notNullable();
            table.bigInteger('taskId').unsigned().nullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('deletedAt').nullable();

            // Indexes
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('workerId', 'workerId');
            table.index('taskId', 'taskId');

            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('workerId').references('id').inTable('workforce').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('taskId').references('id').inTable('work_order_tasks').onDelete('CASCADE').onUpdate('CASCADE');
        })
        .createTable('time_entries', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.datetime('date').notNullable();
            table.integer('hours').notNullable();
            table.string('notes', 255).nullable();
            table.boolean('approved').notNullable().defaultTo(false);
            table.boolean('rejected').notNullable().defaultTo(false);
            table.string('rejectionReason', 255).notNullable();
            table.bigInteger('workerId').unsigned().notNullable();
            table.bigInteger('taskId').unsigned().notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('deletedAt').nullable();
        
            // Indexes
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('workerId', 'workerId');
            table.index('taskId', 'taskId');
        
            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('workerId').references('id').inTable('workforce').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('taskId').references('id').inTable('work_order_tasks').onDelete('CASCADE').onUpdate('CASCADE');
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('schedules')
        .dropTable('time_entries')
};
