const db = require('../../data/dbConfig');

function find() {
    return db('users');
}

async function add(user) {
    const [ newId ] = await db('users').insert(user);

    if (!newId) {
        return Promise.resolve(null);
    }

    return Promise.resolve(newId);
}

async function remove(id) {
    const delRecs = await db('users').where({ id }).del();

    if (!delRecs) {
        return Promise.resolve(null);
    }

    return Promise.resolve(delRecs);
}

module.exports = {
    find,
    add,
    remove
}