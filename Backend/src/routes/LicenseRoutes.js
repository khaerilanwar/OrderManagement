import express from 'express';
import { changeLimitLicense, getAllTokenLicense, newTokenLicense } from '../controllers/LicenseController.js';

const licenseRoute = express.Router();

licenseRoute.get('/', getAllTokenLicense)
licenseRoute.post('/', newTokenLicense)
licenseRoute.patch('/:id', changeLimitLicense) // Assuming you want to use the same controller for updating as well

export default licenseRoute;