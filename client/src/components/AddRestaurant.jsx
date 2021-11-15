import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";

const AddRestaurant = () => {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [price, setPrice] = useState("");
	const { addRestaurants } = useGlobalContext();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3500/api/v1/restaurant",
				{
					name,
					location,
					price_range: price,
				}
			);
			addRestaurants(response.data.data.rows);
			// console.log(response.data.data.data.rows);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='mb-4'>
			<form
				action=''
				method='POST'
				className='container'
				onSubmit={handleSubmit}
			>
				<div className='form-row row'>
					<div className='col'>
						<input
							type='text'
							className='form-control'
							name='name'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='col'>
						<input
							type='text'
							className='form-control'
							name='location'
							placeholder='Location'
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</div>
					<div className='col'>
						<select
							name='price_range'
							id=''
							className='custom-select form-control my-1 mr-sm-2'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						>
							<option value='Price Range' disabled defaultValue='Price Range'>
								Price Range
							</option>
							<option value='1'>$</option>
							<option value='2'>$$</option>
							<option value='3'>$$$</option>
							<option value='4'>$$$$</option>
						</select>
					</div>

					<div className='col'>
						<button className='btn btn-primary'>Add</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddRestaurant;
