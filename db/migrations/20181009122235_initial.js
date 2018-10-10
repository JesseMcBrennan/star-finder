
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stars', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('mass');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('exoplanets', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('mass');
      table.integer('star_id').unsigned()
      table.foreign('star_id')
        .references('stars.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('exoplanets'),
      knex.schema.dropTable('stars')
    ]);
};

