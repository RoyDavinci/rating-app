import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddReview = ({ id }) => {
	const [name, setName] = useState("");
	const [review, setReview] = useState("");
	const [reviewText, setReviewText] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			axios.post(`http://localhost:3500/api/v1/restaurant/${id}/review`, {
				name,
				review: reviewText,
				rating: review,
			});
			navigate("/");
			navigate(location.pathname);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='mb-2'>
			<form action='' onSubmit={handleSubmit}>
				<div className='form-row row'>
					<div className='form-group col-8 my-2'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							className='form-control mt-2'
							name='name'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='form-group col-4 my-3'>
						<label htmlFor='name'>Rating</label>
						<select
							name=''
							className='custom-select form-control'
							id='rating'
							value={review}
							onChange={(e) => setReview(e.target.value)}
						>
							<option value='' defaultValue='Rating' disabled>
								Rating
							</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>

							<option value='5'>5</option>
						</select>
					</div>
				</div>
				<div className='form-group my-3'>
					<label htmlFor='review'>Review</label>
					<textarea
						name=''
						id='review'
						className='form-control'
						value={reviewText}
						onChange={(e) => setReviewText(e.target.value)}
					></textarea>
				</div>
				<button className='btn btn-primary my-2'>Submit</button>
			</form>
		</div>
	);
};

export default AddReview;
