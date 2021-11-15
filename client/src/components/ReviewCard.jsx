import React from "react";
import Rating from "./Rating";

const ReviewCard = ({ review }) => {
	return (
		<div className='row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-md-4'>
			{review.map((item, index) => {
				return (
					<div
						key={item.id}
						className='card col text-white bg-primary mb-3  mx-4'
						style={{ maxWidth: "30%" }}
					>
						<div className='card-header d-flex justify-content-between'>
							<span>{item.name}</span>{" "}
							<span>
								<Rating rating={item.rating}></Rating>
							</span>
						</div>
						<div className='card-body'>
							<p className='card-text'>{item.review}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ReviewCard;
