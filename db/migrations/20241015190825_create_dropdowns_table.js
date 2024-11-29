
export const up = function(knex) {
    return knex.schema.createTable('dropdowns', function(table){
        table.bigIncrements('id'); // use a bigInt, autoincrements, and set as PK
        table.timestamp('createdAt').defaultTo(knex.fn.now()) // timestamp
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) // timestamp
        table.string('label').notNullable(); // [varchar(255)]
        table.string('option').notNullable(); // [varchar(255)]
        table.string('resource').notNullable(); // [varchar(255)]
        table.string('value').notNullable(); // [varchar(255)]
    })
};

export const down = function(knex) {
    return knex.schema.dropTable('dropdowns')
};
