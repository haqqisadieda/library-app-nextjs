/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('authors', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('surname');
    }).createTable('categories', function(table) {
        table.increments('id').primary();
        table.string('name');
    }).createTable('books', function(table) {
        table.increments('id').primary();
        table.string('title');
        table.integer('page');
        table.text('synopsis');
        table.integer('authors_id').unsigned().references('authors.id');
        table.integer('categories_id').unsigned().references('categories.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('authors')
        .dropTable('categories')
        .dropTable('books');
};
