const db = require("../db/db");

const getAllRestaurants = async (req, res) => {
	try {
		// let data = await db.query("SELECT * FROM restaurant");
		const data = await db.query(
			"SELECT * FROM  restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id"
		);

		res.status(200).json({
			message: "Data Sent",
			amount: data.rows.length,
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in controller", error });
	}
};

const getSingleRestaurant = async (req, res) => {
	const id = req.params.id;

	try {
		let data = await db.query(
			"SELECT * FROM  restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id  WHERE id = $1",
			[id]
		);
		let response = await db.query(
			`SELECT * FROM reviews WHERE restaurant_id = $1`,
			[id]
		);
		res.status(200).json({
			message: "Data Sent",
			data: { data: data.rows, response: response.rows },
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in controller", error });
	}
};

const createRestaurant = async (req, res) => {
	const { name, price_range, location } = req.body;
	try {
		let data = await db.query(
			"INSERT INTO restaurant (name, location, price_range) VALUES($1, $2, $3) returning *",
			[name, location, price_range]
		);
		res.status(200).json({
			message: "Data Sent",
			data: data,
		});
	} catch (error) {
		res.status(500).json({ message: "Error in controller", error });
	}
};

const updateRestaurant = async (req, res) => {
	const { name, location, price_range } = req.body;
	const { id } = req.params;
	try {
		let data = await db.query(
			"UPDATE restaurant SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
			[name, location, price_range, id]
		);
		res
			.status(200)
			.json({ message: "Success updating restaurant", data: data });
	} catch (error) {
		res.status(500).json({ message: "Error in controller", error });
	}
};

const deleteRestaurant = async (req, res) => {
	const id = req.params.id;
	try {
		let data = await db.query(
			"DELETE FROM restaurant WHERE id = $1 returning *",
			[id]
		);
		res.status(200).json({ message: "Column Deleted", data });
	} catch (error) {
		res.status(500).json({ message: "Error in controller", error });
	}
};

const addReview = async (req, res) => {
	const id = req.params.id;
	const { name, rating, review } = req.body;
	try {
		let data = await db.query(
			"INSERT INTO reviews (restaurant_id, name, rating, review) VALUES ($1, $2, $3,$4)",
			[id, name, rating, review]
		);
		res.status(200).json({ message: "Success", data });
	} catch (error) {
		res.status(500).json({ message: "Error in controller", error });
	}
};

const getReview = async (req, res) => {
	try {
		let data = await db.query("SELECT * FROM reviews");

		res.status(200).json({
			message: "Data Sent",
			data: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in controller", error });
	}
};

module.exports = {
	getAllRestaurants,
	getSingleRestaurant,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
	addReview,
	getReview,
};
