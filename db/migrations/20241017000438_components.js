/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('components', function(table){
        table.bigInteger('tenantId').unsigned().notNullable(); // 'tenantId' bigint NOT NULL
        table.string('addedBy'); // 'addedBy' varchar(255) DEFAULT NULL
        table.string('updatedBy'); // 'updatedBy' varchar(255) DEFAULT NULL
        table.bigIncrements('id'); // PRIMARY KEY

        table.string('compNumber');
        table.string('installedLocation')
        table.string('statisticType') // `statisticType` varchar(255) DEFAULT NULL,
        table.string('name') // `name` varchar(255) DEFAULT NULL,
        table.boolean('oilSampleRequired') // `oilSampleRequired` tinyint(1) DEFAULT NULL,
        table.integer('triggerInterval') // `triggerInterval` int DEFAULT NULL,
        table.string('triggerIntervalType', 50) // `triggerIntervalType` varchar(50) DEFAULT NULL,
        table.date('installDate') // `installDate` date DEFAULT NULL,
        table.integer('installedInterval') // `installedInterval` int DEFAULT NULL,
        table.integer('installIntervalPlus') // `installIntervalPlus` int DEFAULT NULL,
        table.string('serialNumber') // `serialNumber` varchar(255) DEFAULT NULL,
        table.string('partNumber') // `partNumber` varchar(255) DEFAULT NULL,
        table.integer('currentHours') // `currentHours` int DEFAULT NULL,
        table.integer('projectedHours') // `projectedHours` int DEFAULT NULL,
        table.integer('remaining') // `remaining` int DEFAULT NULL,
        table.integer('used') // `used` int DEFAULT NULL,
        table.integer('estUsage') // `estUsage` int DEFAULT NULL,
        table.datetime('removeDate') // `removeDate` datetime DEFAULT NULL,
        table.integer('removeHours') // `removeHours` int DEFAULT NULL,
        table.string('oldSerial') // `oldSerial` varchar(255) DEFAULT NULL,
        table.string('reqNumber') // `reqNumber` varchar(255) DEFAULT NULL,
        table.string('pONumber') // `pONumber` varchar(255) DEFAULT NULL,
        table.boolean('warranty') // `warranty` tinyint(1) DEFAULT NULL,
        table.integer('warrantyInterval') // `warrantyInterval` int DEFAULT NULL,
        table.bigint('equipmentId').unsigned().notNullable() // `equipmentId` bigint NOT NULL,

        table.timestamp('createdAt').defaultTo(knex.fn.now()); //   `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) // `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        table.datetime('deletedAt') // `deletedAt` datetime DEFAULT NULL,

        // FOREIGN KEYS
        table.foreign('tenantId').references('id').inTable('tenants').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('addedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('updatedBy').references('email').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        table.foreign('equipmentId').references('id').inTable('equipment').onDelete('CASCADE').onUpdate('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('components')
};
