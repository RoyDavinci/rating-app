import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const RestaurantContext = React.createContext();

const RestaurantProvider = ({ children }) => {
	const [restaurant, setRestaurant] = useState([]);
	const [state, setState] = useState([]);
	const [review, setReview] = useState([]);

	const addRestaurants = (restaurants) => {
		setRestaurant([...restaurant, restaurants]);
	};

	const getReviews = (reviews) => {
		setReview([...review, reviews]);
	};

	useEffect(() => {
		try {
			const fetchData = async () => {
				let response = await axios.get(
					"http://localhost:3500/api/v1/restaurant"
				);
				console.log(response);
				setRestaurant(response.data.data.rows);
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const fetchDetail = async (id) => {
		const response = await axios.get(
			`http://localhost:3500/api/v1/restaurant/${id}`
		);
		setState(response.data.data);
	};

	return (
		<RestaurantContext.Provider
			value={{
				restaurant,
				addRestaurants,
				setRestaurant,
				state,
				fetchDetail,
				getReviews,
			}}
		>
			{children}
		</RestaurantContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(RestaurantContext);
};

export { RestaurantContext, RestaurantProvider };
