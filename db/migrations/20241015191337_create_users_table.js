
export const up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.timestamp('createdAt').defaultTo(knex.fn.now()) // timestamp
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) // timestamp

        table.string('addedBy').references('email').inTable('users'); // [varchar(255)] , FK
        table.string('updatedBy').references('email').inTable('users'); // FK
        table.datetime('deletedAt'); // datetime
        table.string('email').notNullable().primary().unique(); // consider the 'deferrable' clause
        table.string('name').notNullable();
        table.enu('role', ['admin', 'manager', 'planner', 'supervisor', 'tradesperson']).notNullable().defaultTo('tradesperson'); // enum
        table.bigInteger('tenantId').unsigned().notNullable().references('id').inTable('tenants') // FK
    })
};

 export const down  = function(knex) {
    return knex.schema.dropTable('users')
};
