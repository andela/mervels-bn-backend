import express from 'express';
import Locations from '../../controllers/locationController';

const router = express.Router();

router.get('/', Locations.getAllLocations);

export default router;
