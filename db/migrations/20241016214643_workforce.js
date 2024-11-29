
// made via ChatGPT ~ verify

exports.up = function(knex) {
    return knex.schema.createTable('workforce', function(table) {
      table.bigInteger('tenantId').unsigned().notNullable();
      table.string('addedBy', 255).nullable();
      table.string('updatedBy', 255).nullable();
      table.bigIncrements('id'); // PK
      table.string('name', 100).nullable();
      table.string('email', 255).nullable();
      table.bigInteger('tradeId').unsigned().notNullable();
      table.string('userId', 255).nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).nullable();
      table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) // needed a change
      table.datetime('deletedAt').nullable();
  
      // Primary key
      // table.primary(['id']); // have to omit for the table.bigIncrements to have the auto-increment 
  
      // Unique constraints
      table.unique(['email']); // multiple unique keys on the same column get consolidated into one
      
      // Indexes
      table.index(['tenantId'], 'tenant_id');
      table.index(['addedBy']);
      table.index(['updatedBy']);
      table.index(['tradeId']);
      table.index(['userId']);
  
      // Foreign key constraints
      table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
      table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
      table.foreign('tradeId').references('id').inTable('trades').onDelete('RESTRICT').onUpdate('CASCADE');
      table.foreign('userId').references('email').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('workforce');
  };
  