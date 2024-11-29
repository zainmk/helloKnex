/*
    quotes
        quote_tasks
            equipment_for_quote_tasks
            labour_for_quote_tasks
            materials_for_quote_tasks
*/

// create parent -> child
exports.up = function(knex) {
    return knex.schema
        .createTable('quotes', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.string('title', 255).notNullable();
            table.string('description', 500).nullable();
            table.enu('status', ['Draft', 'Sent For Review', 'Accepted', 'Rejected'])
                .notNullable()
                .defaultTo('Draft');
            table.bigInteger('customerId').unsigned().notNullable();
            table.bigInteger('siteId').unsigned().notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('deletedAt').nullable();
        
            // Indexes
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('customerId', 'customerId');
            table.index('siteId', 'siteId');
        
            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('customerId').references('id').inTable('customers').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('siteId').references('id').inTable('customer_sites').onDelete('CASCADE').onUpdate('CASCADE');
        })
        .createTable('quote_tasks', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.string('title', 255).notNullable();
            table.text('description').nullable();
            table.date('startDate').notNullable();
            table.date('endDate').notNullable();
            table.integer('hours').notNullable();
            table.enu('status', ['In Progress', 'Sent For Review', 'Approved'])
            .notNullable()
            .defaultTo('In Progress');
            table.bigInteger('quoteId').unsigned().notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('deletedAt').nullable();

            // Indexes
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('quoteId', 'quoteId');

            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('quoteId').references('id').inTable('quotes').onDelete('CASCADE').onUpdate('CASCADE');
        })
        .createTable('equipment_for_quote_tasks', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.bigInteger('equipmentId').unsigned().notNullable();
            table.bigInteger('taskId').unsigned().notNullable();
            table.integer('hours').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('deletedAt').nullable();
        
            // Unique constraint
            table.unique(['equipmentId', 'taskId'], 'equipment_for_quote_tasks_taskId_equipmentId_unique');
        
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
            table.foreign('taskId').references('id').inTable('quote_tasks').onDelete('CASCADE').onUpdate('CASCADE');
        })
        .createTable('labour_for_quote_tasks', (table) => {
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
        
            // Unique constraint
            table.unique(['taskId', 'tradeId'], 'labour_for_quote_tasks_tradeId_taskId_unique');
        
            // Indexes
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('tradeId', 'tradeId');
        
            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('taskId').references('id').inTable('quote_tasks').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('tradeId').references('id').inTable('trades').onDelete('CASCADE').onUpdate('CASCADE');
        })
        .createTable('materials_for_quote_tasks', (table) => {
            table.bigInteger('tenantId').unsigned().notNullable();
            table.string('addedBy', 255).nullable();
            table.string('updatedBy', 255).nullable();
            table.bigIncrements('id').notNullable(); // PRIMARY KEY
            table.bigInteger('taskId').unsigned().notNullable();
            table.bigInteger('materialId').unsigned().notNullable();
            table.bigInteger('supplierId').unsigned().notNullable();
            table.integer('quantity').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.dateTime('deletedAt').nullable();
        
            // Unique constraint
            table.unique(['taskId', 'materialId'], 'materials_for_quote_tasks_taskId_materialId_unique');
        
            // Indexes
            table.index('tenantId', 'tenantId');
            table.index('addedBy', 'addedBy');
            table.index('updatedBy', 'updatedBy');
            table.index('materialId', 'materialId');
            table.index('supplierId', 'supplierId');
        
            // Foreign keys
            table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
            table.foreign('taskId').references('id').inTable('quote_tasks').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('materialId').references('id').inTable('materials').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('supplierId').references('id').inTable('suppliers').onDelete('CASCADE').onUpdate('CASCADE');
        })
  };
  
  // drop child -> parent
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('materials_for_quote_tasks') 
        .dropTableIfExists('labour_for_quote_tasks') 
        .dropTableIfExists('equipment_for_quote_tasks')
        .dropTableIfExists('quote_tasks') 
        .dropTableIfExists('quotes')
  };
  
  