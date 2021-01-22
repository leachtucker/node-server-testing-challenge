const router = require('express').Router();
const Users = require('./model');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500);
        })
})

router.post('/', (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then(newId => {
            if (!newId) {
                return res.status(400);
            }

            res.status(201).json({ id: newId});
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(delRec => {
            if (!delRec) {
                return res.status(404).json();
            }

            res.status(200).json(delRec);
        })
        .catch(() => {
            res.status(500);
        })
})

module.exports = router;