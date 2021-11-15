import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../components/Rating";
import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";

const Detail = () => {
	const { id } = useParams();

	const [state, setState] = useState([]);
	const [response, setResponse] = useState([]);

	useEffect(() => {
		const fetchDetail = async () => {
			let data = await axios.get(
				`http://localhost:3500/api/v1/restaurant/${id}`
			);

			setState(data.data.data.data);
			setResponse(data.data.data.response);
		};
		fetchDetail();
	}, [id]);

	return (
		<div>
			<h1 className='text-center text-uppercase '>{state[0]?.name}</h1>
			<div className='text-center'>
				<Rating rating={state[0]?.average_rating}></Rating>(
				<span>{state[0]?.average_rating > 0 ? state[0]?.count : 0}</span>)
			</div>
			<ReviewCard className='mt' review={response}></ReviewCard>
			<AddReview id={id}></AddReview>
		</div>
	);
};

export default Detail;
