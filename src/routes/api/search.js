import express from 'express';
import SearchValidator from '../../validation/searchValidator';
import searchController from '../../controllers/searchController';
import verify from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/requests',
  verify,
  SearchValidator.checkRequestParams,
  searchController.searchRequests
);

export default router;
