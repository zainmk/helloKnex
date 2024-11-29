exports.up = function (knex) {
    return knex.schema.createTable('inventory', function (table) {
      table.increments('id').primary(); // Auto-incrementing int primary key
      table.bigInteger('tenantId').unsigned().notNullable();
      table.string('addedBy', 255).nullable();
      table.string('updatedBy', 255).nullable();
      table.bigInteger('materialId').unsigned().notNullable();
      table.bigInteger('binId').unsigned().notNullable();
      table.integer('quantity').notNullable();
      table.integer('min').notNullable();
      table.integer('max').notNullable();
      
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); // Auto-updates with current timestamp on update
      table.datetime('deletedAt').nullable();
  
      // Unique constraint for materialId and binId
      table.unique(['materialId', 'binId'], 'inventory_material_id_bin_id');
  
      // Indexes
      table.index('tenantId');
      table.index('addedBy');
      table.index('updatedBy');
      table.index('binId');
  
      // Foreign keys
      table
        .foreign('tenantId')
        .references('id')
        .inTable('tenants')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('addedBy')
        .references('email')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table
        .foreign('updatedBy')
        .references('email')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table
        .foreign('materialId')
        .references('id')
        .inTable('materials')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table
        .foreign('binId')
        .references('id')
        .inTable('bins')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('inventory');
  };
  