/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()

  await knex('todos').insert([
    {id: 1, title: "go to gym", user_id: 3},
    {id: 2, title: "buy groceries", user_id: 3},
    {id: 3, title: "watch tv", user_id: 3},
  ]);
};
