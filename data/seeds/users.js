
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'john', passwordHash: 'john1234'},
        {username: 'bob', passwordHash: 'bob1234'},
        {username: 'jane', passwordHash: 'jane1234'}
      ]);
    });
};
