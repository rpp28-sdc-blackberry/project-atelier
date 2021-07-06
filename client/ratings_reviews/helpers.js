/* ----- API Helpers ----- */
const handleAddHelpful = (reviewId) => {
  return new Promise (resolve => {
    fetch(`reviews/${reviewId}/helpful`, {
      method: 'PUT'
    }).then(() => {
      let currentHelpfulReviews = JSON.parse(sessionStorage.getItem('helpfulReviews'));
      currentHelpfulReviews.push(reviewId);
      sessionStorage.setItem('helpfulReviews', JSON.stringify(currentHelpfulReviews));

      let allHelpfulReviews = JSON.parse(localStorage.getItem('helpfulReviews'));
      allHelpfulReviews.push(reviewId);
      localStorage.setItem('helpfulReviews', JSON.stringify(allHelpfulReviews));
    }).then(() => resolve());
  });
};

const handleReport = (reviewId) => {
  return new Promise (resolve => {
    fetch(`reviews/${reviewId}/report`, {
      method: 'PUT'
    }).then(() => {
      let currentReportedReviews = JSON.parse(sessionStorage.getItem('reportedReviews'));
      currentReportedReviews.push(reviewId);
      sessionStorage.setItem('reportedReviews', JSON.stringify(currentReportedReviews));
    }).then(() => resolve());
  });
};

const uploadImages = (dataURI) => {
  return new Promise (resolve => {
    fetch('/review/image', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dataURI: dataURI })
    }).then(response => response.json())
      .then(JSONresponse => resolve(JSONresponse.url));
  });
};

const postReview = (data) => {
  return new Promise (resolve => {
    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => resolve());
  });
};

/* ----- Rating Breakdown Helpers -----*/
const computeAverageRating = (ratings) => {
  if (ratings.length === 0) { return; }
  let count = 0;
  let total = 0;
  for (let ratingValue in ratings) {
    let freq = ratings[ratingValue];
    total += ratingValue * freq;
    count += Number.parseInt(freq);
  }
  let average = total / count;
  let roundedAverageForDisplay = average.toFixed(1);
  let roundedAverageForStar = (Math.round(average * 4) / 4).toFixed(2);
  return [roundedAverageForDisplay, roundedAverageForStar];
};

const computeRatingBreakdown = (ratings) => {
  let breakdown = [];
  let total = 0;
  for (let ratingValue in ratings) {
    let freq = ratings[ratingValue];
    total += Number.parseInt(freq);
  }
  for (let i = 1; i <= 5; i++) {
    let freq = ratings[i] || 0;
    let percentage = Number.parseInt(freq) / total * 100;
    breakdown.push([percentage, freq]);
  }
  return breakdown;
};

const computeRecommendedPercentage = (recommended) => {
  if (Object.keys(recommended).length === 0) { return '0%'; }
  let trueCount = Number.parseInt(recommended.true) || 0;
  let falseCount = Number.parseInt(recommended.false) || 0;
  let total = trueCount + falseCount;
  return (trueCount / total * 100).toFixed(0) + '%';
};

/* ----- Product Breakdown Helpers ----- */
const formatCharacteristics = (characteristics) => {
  let formattedCharacteristics = [];
  for (let characteristic in characteristics) {
    let newFormat = {};
    newFormat.name = characteristic;
    newFormat.value = characteristics[characteristic].value;
    newFormat.id = characteristics[characteristic].id;
    formattedCharacteristics.push(newFormat);
  }
  return formattedCharacteristics;
};

const productCharacteristics = {
  'Size': {
    1: 'A size too small',
    2: '½ a size too small',
    3: 'Perfect',
    4: '½ a size too big',
    5: 'A size too wide'
  },
  'Width': {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide'
  },
  'Comfort': {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect'
  },
  'Quality': {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect'
  },
  'Length': {
    1: 'Runs short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long'
  },
  'Fit': {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long'
  }
};

/* ----- Review Tile Helpers ----- */
const formatDate = (dateString) => {
  let [year, month, day] = dateString.split('-');
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  return months[month] + ' ' + day + ', ' + year;
};

const formatReviewTile = (review) => {
  let summary = review.summary.length > 60 ? review.summary.slice(0, 61) + '...' : review.summary;

  let body = review.body;
  let additionalBody = '';
  let showAdditionalBodyButton = false;
  if (review.body.length > 250) {
    additionalBody = review.body.slice();
    body = review.body.slice(0, 251) + '...';
    showAdditionalBodyButton = true;
  }

  let showPhotos = review.photos.length !== 0;

  let helpful = 0;
  let showAddHelpfulButton = true;
  let currentHelpfulReviews = JSON.parse(sessionStorage.getItem('helpfulReviews'));
  if (currentHelpfulReviews.indexOf(review.review_id) !== -1) {
    helpful = 1;
    showAddHelpfulButton = false;
  }

  let currentReportedReviews = JSON.parse(sessionStorage.getItem('reportedReviews'));
  let reportStatus = currentReportedReviews.indexOf(review.review_id) !== -1;

  let allHelpfulReviews = JSON.parse(localStorage.getItem('helpfulReviews'));
  showAddHelpfulButton = allHelpfulReviews && allHelpfulReviews.indexOf(review.review_id) === -1;

  return { summary, body, additionalBody, showAdditionalBodyButton, showPhotos, helpful, showAddHelpfulButton, reportStatus };
};

/* ----- Filtering Helpers ----- */
const sortReviews = (reviews, option) => {
  if (reviews.length === 0) {
    return [];
  }
  let reviewsCopy = reviews.slice();
  if (option === 'helpfulness') {
    return reviewsCopy.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });
  } else if (option === 'date') {
    return reviewsCopy.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (option === 'relevance') {
    reviewsCopy.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    let sortedReviews = [];
    let tempStorage = [];
    let currentDate = reviewsCopy[0].date;
    for (let i = 0; i < reviewsCopy.length; i++) {
      if (reviewsCopy[i].date === currentDate) {
        tempStorage.push(reviewsCopy[i]);
      } else {
        sortedReviews.push(tempStorage);
        tempStorage = [];
        tempStorage.push(reviewsCopy[i]);
        currentDate = reviewsCopy[i].date;
      }
    }
    sortedReviews.push(tempStorage);
    for (let i = 0; i < sortedReviews.length; i++) {
      sortedReviews[i].sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
    }
    return sortedReviews.flat();
  }
  return reviews;
};

const applyStarFilters = (reviews, starFilters) => {
  if (starFilters.length === 0) { return reviews; }
  let output = [];
  for (let i = 0; i < reviews.length; i++) {
    if (starFilters.indexOf(reviews[i].rating) !== -1) {
      output.push(reviews[i]);
    }
  }
  return output;
};

const applyKeyword = (reviews, keyword) => {
  let output = reviews.filter(review => {
    if (review.response === null) {
      review.response = '';
    }
    return review.summary.includes(keyword) || review.body.includes(keyword) || review.reviewer_name.includes(keyword) || review.response.includes(keyword);
  });
  return output;
};

/* ----- Review Form Helpers -----*/
const starDescriptions = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great'
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = {
  handleAddHelpful,
  handleReport,
  uploadImages,
  postReview,
  computeAverageRating,
  computeRatingBreakdown,
  computeRecommendedPercentage,
  formatCharacteristics,
  productCharacteristics,
  formatDate,
  formatReviewTile,
  sortReviews,
  applyStarFilters,
  applyKeyword,
  starDescriptions,
  validateEmail
};