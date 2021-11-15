const express = require("express");

const {
	getAllRestaurants,
	getSingleRestaurant,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
	addReview,
	getReview,
} = require("../controllers/db");
const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/:id", getSingleRestaurant);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);
router.get("/review", getReview);
router.post("/:id/review", addReview);

module.exports = router;
