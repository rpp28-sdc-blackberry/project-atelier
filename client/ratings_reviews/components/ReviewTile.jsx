import React from 'react';

// class ReviewTile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       recommend: this.props.review.recommend,
//       response: tris.props.review
//     };
//   }

//   formatDate() {
//     // format the review date
//   }

//   toggleRecommend() {
//     // if recommend is false, then toggle off the visiblity
//   }

//   toggleResponse() {
//     // if response is empty or null, then toggle off the visibility
//   }

//   render() {
//     return (
//       <div class='review-tile'>
//         <div>Rating: {props.review.rating}</div>
//         <div>{props.review.reviewer_name}, {props.review.date.slice(0, 10)}</div>
//         <div>{props.review.summary}</div>
//         <div>{props.review.body}</div>
//         <div hidden={props.review.recommend}>Recommend: {props.review.recommend}</div>
//         <div hideen={props.review.response}>Response: {props.review.response}</div>
//         <div><span>Helpful? Yes {props.review.helpfulness} | Report</span></div>
//       </div>

//     );
//   }
// }

const ReviewTile = (props) => {
  var responseVisibility = true;
  if (props.review.response === null || props.review.response.length === 0) {
    responseVisibility = false;
  }
  return (
    <div class='review-tile'>
      <div>Rating: {props.review.rating}</div>
      <div>{props.review.reviewer_name}, {props.review.date.slice(0, 10)}</div>
      <div>{props.review.summary}</div>
      <div>{props.review.body}</div>
      <div hidden={!props.review.recommend}>I recommend this product!</div>
      <div hidden={!responseVisibility}>Response: {props.review.response}</div>
      <div><span>Helpful? Yes {props.review.helpfulness} | Report</span></div>
    </div>
  );
};


export default ReviewTile;