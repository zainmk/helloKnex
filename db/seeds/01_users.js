/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// make the seed file populate datas off the 'servicecube_development' database.
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  await knex('users').insert([
    {id: 1, name: 'Mark', email: 'mark@hotmail.com'},
    {id: 2, name: 'John', email: 'john@hotmail.com'},
    {id: 3, name: 'Charles', email: 'charles@hotmail.com'},
  ]);
};
