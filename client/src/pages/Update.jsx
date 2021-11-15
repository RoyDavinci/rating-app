import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [price, setPrice] = useState("");
	// const [values, setValues] = useState([]);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.put(
			`http://localhost:3500/api/v1/restaurant/${id}`,
			{ name, location, price_range: price }
		);
		console.log(response);
		navigate("/");
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`http://localhost:3500/api/v1/restaurant/${id}`
			);
			setName(response.data.data[0].name);
			setLocation(response.data.data[0].location);
			setPrice(response.data.data[0].price_range);
		};
		fetchData();
	}, [id]);

	return (
		<div>
			<h1 className='text-center'>Update Restaurant</h1>
			<form action=''>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						id='name'
						className='form-control'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='location'>Location</label>
					<input
						type='text'
						name='location'
						id='location'
						className='form-control'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='price'>Price</label>
					<input
						type='text'
						name='price_range'
						id='price_range'
						className='form-control'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<button onClick={handleSubmit} className='btn btn-primary mt-4'>
					Update
				</button>
			</form>
		</div>
	);
};

export default Update;
