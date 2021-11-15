import React from "react";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const List = () => {
	const { restaurant, setRestaurant } = useGlobalContext();
	let navigate = useNavigate();

	const handleUpdate = (id) => {
		navigate(`/restaurant/update/${id}`);
	};

	const handleDetail = (id) => {
		navigate(`/restaurant/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`http://localhost:3500/api/v1/restaurant/${id}`
			);
			setRestaurant(restaurant.filter((name) => name.id !== id));
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const renderRating = (rating) => {
		if (!rating.count) {
			return <p>No Reviews</p>;
		}
		return (
			<>
				<Rating rating={rating.id}></Rating>(
				<span className='text-warning ml-2'>{rating.count}</span>)
			</>
		);
	};

	return (
		<table className='table table-hover table-dark'>
			<thead>
				<tr className='bg-primary'>
					<th scope='col'>Name</th>
					<th scope='col'>Location</th>
					<th scope='col'>Price Range</th>
					<th scope='col'>Ratings</th>
					<th scope='col'>Edit</th>
					<th scope='col'>Delete</th>
				</tr>
			</thead>
			<tbody>
				{restaurant &&
					restaurant.map((name) => {
						return (
							<tr key={name.id}>
								<td>
									<button onClick={() => handleDetail(name.id)}>
										{name.name}
									</button>
								</td>
								<td>{name.location}</td>
								<td>{"$".repeat(name.price_range)}</td>
								<td>{renderRating(name)}</td>
								<td>
									<button
										onClick={() => handleUpdate(name.id)}
										className='btn btn-primary'
									>
										Edit
									</button>
								</td>
								<td>
									<button
										className='btn btn-danger'
										onClick={() => handleDelete(name.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
};

export default List;
