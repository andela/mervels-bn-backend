import express from 'express';
import SearchValidator from '../../validation/searchValidator';
import searchController from '../../controllers/searchController';

const router = express.Router();

router.get('/requests', SearchValidator.checkRequestParams, searchController.searchRequests);

module.exports = router;
