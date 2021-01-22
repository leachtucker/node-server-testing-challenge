
exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
        table.increments("id");
        table.text('username', 64)
            .notNullable()
            .unique();
        table.text('passwordHash')
            .notNullable;
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("users");
};
