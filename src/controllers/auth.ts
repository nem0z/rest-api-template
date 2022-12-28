import { Router } from "express";
import bcrypt from 'bcryptjs';

import User from '../models/user';
import { syncUsers } from "../middlewares/user";

const router = Router();
router.use(syncUsers);

router.get('/', (req, res) => {
    return User.findAll()
        .then(users => {
            return res
                .status(200)
                .json(users);
        }).catch(err => {
            return res
                .status(500)
                .json(err.name);
        });
});

router.post('/register', async (req, res) => {
    const { password } = req.body.user;

    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(password, salt);
    const user = { ...req.body.user, password: encryptPassword };

    return User.create(user)
    .then(user => res.status(201).json(user))
    .catch(err => {
        const error = {
            message: "Error when trying to create new user",
            errors: err.errors.map((e: any) => e.message)
        };

        return res.status(400).json(error);        
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body.user;
    if(!email || !password) 
        return res.status(400) .json({message: `Missing ${!email ? "email" : "password"}`});

    return User.findOne({
      where: { email: email },
    })
    .then(async user =>{
        const validPassword = await bcrypt.compare(password, user?.dataValues?.password);
        if (!user || !validPassword) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }

        return res.status(200).json(user);
    })
    .catch(err => {
        return res.status(500).json({message: err.message});
    });
});


export default router;