/*
work_orders
    work_order_tasks
        equipment_for_work_order_tasks
        labour_for_work_order_tasks
        inventory_transactions
                materials_for_work_order_tasks
*/
exports.up = function(knex) {
    return knex.schema
        .createTable('work_orders', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.string('title', 255).notNullable();
            table.string('description', 500).nullable();
            table.enu('status', ['TODO', 'In Progress', 'Done'])
            .notNullable()
            .defaultTo('TODO');
            table.bigInteger('quoteId').unsigned().nullable();
            table.bigInteger('customerId').unsigned().notNullable();
            table.bigInteger('siteId').unsigned().notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('deletedAt').nullable();

            // Indexesf
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('quoteId', 'quoteId');
            table.index('customerId', 'customerId');
            table.index('siteId', 'siteId');

            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('quoteId').references('id').inTable('quotes').onDelete('RESTRICT').onUpdate('CASCADE');
            table.foreign('customerId').references('id').inTable('customers').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('siteId').references('id').inTable('customer_sites').onDelete('CASCADE').onUpdate('CASCADE');
        })
    .createTable('work_order_tasks', (table) => {
        table.bigInteger('tenantId').unsigned().notNullable();
        table.string('addedBy', 255).nullable();
        table.string('updatedBy', 255).nullable();
        table.bigIncrements('id').notNullable(); // PRIMARY KEY
        table.string('title', 255).notNullable();
        table.text('description').nullable();
        table.date('startDate').notNullable();
        table.date('endDate').notNullable();
        table.integer('hours').notNullable();
        table.enu('status', ['TODO', 'In Progress', 'Done']).notNullable().defaultTo('TODO');
        table.bigInteger('workOrderId').unsigned().notNullable();
        table.bigInteger('taskId').unsigned().nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('deletedAt').nullable();
    
        // Indexes
        table.index('tenantId', 'tenantId');
        table.index('addedBy', 'addedBy');
        table.index('updatedBy', 'updatedBy');
        table.index('workOrderId', 'workOrderId');
        table.index('taskId', 'taskId');
    
        // Foreign keys
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('workOrderId').references('id').inTable('work_orders').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('taskId').references('id').inTable('quote_tasks').onDelete('RESTRICT').onUpdate('CASCADE');
    })
    .createTable('equipment_for_work_order_tasks', (table) => {
        table.bigInteger('tenantId').unsigned().notNullable();
        table.string('addedBy', 255).nullable();
        table.string('updatedBy', 255).nullable();
        table.bigIncrements('id').notNullable(); // PRIMARY KEY
        table.bigInteger('equipmentId').unsigned().notNullable();
        table.bigInteger('taskId').unsigned().notNullable();
        table.integer('hours').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('deletedAt').nullable();
    
        // Unique constraint
        table.unique(['equipmentId', 'taskId'], 'equipment_for_work_order_tasks_taskId_equipmentId_unique');
    
        // Indexes
        table.index('tenantId', 'tenantId');
        table.index('addedBy', 'addedBy');
        table.index('updatedBy', 'updatedBy');
        table.index('taskId', 'taskId');
    
        // Foreign keys
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('equipmentId').references('id').inTable('equipment').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('taskId').references('id').inTable('work_order_tasks').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('labour_for_work_order_tasks', (table) => {
        table.bigInteger('tenantId').unsigned().notNullable();
        table.string('addedBy', 255).nullable();
        table.string('updatedBy', 255).nullable();
        table.bigIncrements('id').notNullable(); // PRIMARY KEY
        table.bigInteger('taskId').unsigned().notNullable();
        table.bigInteger('tradeId').unsigned().notNullable();
        table.integer('hours').notNullable();
        table.integer('quantity').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('deletedAt').nullable();

        // Indexes
        table.index('tenantId', 'tenantId');
        table.index('addedBy', 'addedBy');
        table.index('updatedBy', 'updatedBy');
        table.index('taskId', 'taskId');
        table.index('tradeId', 'tradeId');

        // Foreign keys
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('taskId').references('id').inTable('work_order_tasks').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('tradeId').references('id').inTable('trades').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('inventory_transactions', (table) => {
        table.bigInteger('tenantId').unsigned().notNullable();
        table.string('addedBy', 255).nullable();
        table.string('updatedBy', 255).nullable();
        table.bigIncrements('id').notNullable(); // PRIMARY KEY
        table.bigInteger('binId').unsigned().nullable();
        table.boolean('reserved').notNullable();
        table.bigInteger('taskId').unsigned().notNullable();
        table.bigInteger('locationId').unsigned().notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('deletedAt').nullable();
    
        // Indexes
        table.index('tenantId');
        table.index('addedBy');
        table.index('updatedBy');
        table.index('binId');
        table.index('taskId');
        table.index('locationId');
    
        // Foreign keys
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('binId').references('id').inTable('bins').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('taskId').references('id').inTable('work_order_tasks').onUpdate('CASCADE');
        table.foreign('locationId').references('id').inTable('inventory_locations').onUpdate('CASCADE');
    
    })
    .createTable('materials_for_work_order_tasks', (table) => {
        table.bigInteger('tenantId').unsigned().notNullable();
        table.string('addedBy', 255).nullable();
        table.string('updatedBy', 255).nullable();
        table.bigIncrements('id').notNullable(); // PRIMARY KEY
        table.bigInteger('taskId').unsigned().notNullable();
        table.bigInteger('materialId').unsigned().notNullable();
        table.bigInteger('supplierId').unsigned().notNullable();
        table.integer('quantity').notNullable();
        table.bigInteger('transactionId').unsigned().nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('deletedAt').nullable();
    
        // Indexes
        table.index('tenantId', 'tenantId');
        table.index('addedBy', 'addedBy');
        table.index('updatedBy', 'updatedBy');
        table.index('taskId', 'taskId');
        table.index('materialId', 'materialId');
        table.index('supplierId', 'supplierId');
        table.index('transactionId', 'transactionId');
    
        // Foreign keys
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('taskId').references('id').inTable('work_order_tasks').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('materialId').references('id').inTable('materials').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('supplierId').references('id').inTable('suppliers');
        table.foreign('transactionId').references('id').inTable('inventory_transactions').onDelete('SET NULL').onUpdate('CASCADE');
    })
};

// drop the parent last, create it first
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('materials_for_work_order_tasks')
        .dropTableIfExists('inventory_transactions')
        .dropTableIfExists('labour_for_work_order_tasks')
        .dropTableIfExists('equipment_for_work_order_tasks')
        .dropTableIfExists('work_order_tasks') 
        .dropTableIfExists('work_orders')
};
