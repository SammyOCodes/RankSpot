import express from 'express';
import { 
    getUser, 
    createProfile, 
    authProfile, 
    deleteProfile, 
    updateLolAccount, 
    updateApexAccount,
    updateOverwatchAccount,
} from '../controllers/profile.js';

//router for creating api endpoints
const router = express.Router();

//add routes
//EXAMPLE: router.get(< path >, < callback function >);

//create endpoints
router.post('/', createProfile);
router.post('/login', authProfile);
router.post('/getUser', getUser);

router.put('/updateLolAccount', updateLolAccount);
router.put('/updateApexAccount', updateApexAccount);
router.put('/updateOverwatchAccount', updateOverwatchAccount);

router.delete('/:id', deleteProfile);

//export the router
export default router;