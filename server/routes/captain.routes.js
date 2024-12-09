import express from 'express'

import { body } from 'express-validator';
import { GetCaptainProfile, LoginCaptain, RegisterCaptain } from '../controller/captain.controller.js';
import { AuthCaptain } from '../middleware/captain.auth.middleware.js';



const CaptainRouter=express.Router();


CaptainRouter.post('/register',[
    body('email').isEmail().withMessage('email is not valid'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt().withMessage('capacity must be a number'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],RegisterCaptain)
CaptainRouter.post('/login',LoginCaptain)
CaptainRouter.get('/profile',AuthCaptain,GetCaptainProfile);
CaptainRouter.get('/logout',AuthCaptain,LoginCaptain)


export default CaptainRouter