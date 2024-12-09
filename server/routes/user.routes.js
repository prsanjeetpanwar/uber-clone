import express from 'express';
import {RegisterUser,LoginUser, GetUserProfile, LogoutUser}from '../controller/user.controller.js';
import { body,validationResult} from 'express-validator'
import { authUser } from '../middleware/auth.middleware.js';

const UseRouter =express.Router();


UseRouter.post('/register',
    [body('email').isEmail().withMessage('email is not valid'),
     body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
     body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),

    ],
    RegisterUser
)
UseRouter.post('/login',
    [body('email').isEmail().withMessage('email is not valid'),
    body('password').isLength({min:6}).withMessage('password must be at least')
        ],
        LoginUser
)

UseRouter.get('/profile',authUser,GetUserProfile)
UseRouter.get('/logout',authUser,LogoutUser)


export default UseRouter;