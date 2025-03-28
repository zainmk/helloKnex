

export const up = function(knex) {
    return knex.schema.createTable('tenants', function(table){
        table.bigIncrements('id'); 
        table.uuid('uuid').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phoneNumber');
        table.enu('tier', ['basic', 'premium', 'enterprise']).notNullable().defaultTo('basic'); 
        table.timestamp('createdAt').defaultTo(knex.fn.now()) 
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
};

export const down = function(knex) {
    return knex.schema.dropTable('tenants')
};
