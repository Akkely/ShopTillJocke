import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

import { toDateTimeString } from '../common/formatHelpers';
import { Rating, Typography, Box, ListItem, ListItemText } from "@mui/material";

function Review({ review }) {
	return (
		<ListItem sx={{ mb: 1, borderBottom: `1px solid ${grey[300]}` }}>
			<ListItemText
				primary={
					<>
						<Typography variant='body2' component='span'>
							{toDateTimeString(review.createdAt)}
						</Typography>

						<Typography
							sx={{ my: 1, display: "block" }}
							color='text.primary'
							variant='h4'
							component='span'
						>
							{review.title}{" "}
							<Rating name='read-only' value={review.review} readOnly />
						</Typography>

						<Typography
							color='text.secondary'
							variant='body1'
							component='span'
							sx={{ display: "block" }}
						>
							{review.body}
						</Typography>
					</>
				}
			>
				<Link to={`/reviews/${review.id}`}></Link>
			</ListItemText>
		</ListItem>
	);
}

Review.propTypes = {
	review: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		body: PropTypes.string,
		rating: PropTypes.number,
		review: PropTypes.number,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}).isRequired,
};

export default Review;
