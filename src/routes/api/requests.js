/* eslint-disable no-unused-vars */
import express from "express";
import Requests from "../../controllers/requestController";
import verify from "../../middlewares/auth";

const router = express.Router();

router.get("/my-requests", verify, Requests.getMyRequests);

module.exports = router;
