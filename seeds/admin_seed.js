const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await knex('users').insert([
    {
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    },
  ]);
};
