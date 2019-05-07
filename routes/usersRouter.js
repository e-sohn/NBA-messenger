const express = require('express');
const { User } = require('../models');
const { hash, compare, encode, verify, restrict } = require('../auth');

const usersRouter = express.Router();

//Get all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (e) {
        console.log(e);
        res.stats(500).send(e.message);
    }
});

//Get a specific user
usersRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({ user });
    } catch (e) {
        console.log(e);
        res.stats(500).send(e.message);
    }
});

// Register route
usersRouter.post('/', async (req, res) => {
    try {
        const { email, password, name, picture } = req.body;
        if (password) {
            const passwordDigest = await hash(password);
            const user = await User.create({
                email,
                password_digest: passwordDigest,
                name,
            });
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
            };        
        }
    } catch(e) {
        console.log(e);
        res.stats(500).send(e.message);
    }
});

module.exports = usersRouter;
