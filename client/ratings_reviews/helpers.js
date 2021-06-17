const formatDate = (dateString) => {
  var [year, month, day] = dateString.split('-');

  if (month === '01') {
    month = 'January';
  } else if (month === '02') {
    month = 'February';
  } else if (month === '03') {
    month = 'March';
  } else if (month === '04') {
    month = 'April';
  } else if (month === '05') {
    month = 'May';
  } else if (month === '06') {
    month = 'June';
  } else if (month === '07') {
    month = 'July';
  } else if (month === '08') {
    month = 'August';
  } else if (month === '09') {
    month = 'September';
  } else if (month === '10') {
    month = 'October';
  } else if (month === '11') {
    month = 'November';
  } else if (month === '12') {
    month = 'December';
  }

  return month + ' ' + day + ', ' + year;
};

const fetchReviews = () => {
  return $.ajax({
    url: `reviews/?product_id=${this.props.product_id}&page=1&count=100&sort=relevant`,
    method: 'GET'
  });
};

const computeAverageRating = (ratings) => {
  if (ratings.length === 0) { return; }
  var count = 0;
  var total = 0;
  for (var ratingValue in ratings) {
    var freq = ratings[ratingValue];
    total += ratingValue * freq;
    count += Number.parseInt(freq);
  }
  var average = total / count;
  var roundedAverageForDisplay = average.toFixed(1);
  var roundedAverageForStar = (Math.round(average * 4) / 4).toFixed(2);
  return [roundedAverageForDisplay, roundedAverageForStar];
};

const computeRatingBreakdown = (ratings) => {
  var breakdown = [];
  var total = 0;
  for (var ratingValue in ratings) {
    var freq = ratings[ratingValue];
    total += Number.parseInt(freq);
  }
  for (var i = 1; i <= 5; i++) {
    var freq = ratings[i] || 0;
    var percentage = Number.parseInt(freq) / total * 100;
    breakdown.push([percentage, freq]);
  }
  return breakdown;
};

const computeRecommendedPercentage = (recommended) => {
  var recommendedNumber = Number.parseInt(recommended.true);
  var total = Number.parseInt(recommended.true) + Number.parseInt(recommended.false);
  return (recommendedNumber / total * 100).toFixed(0) + '%';
};

const formatCharacteristics = (characteristics) => {
  var formattedCharacteristics = [];
  for (var characteristic in characteristics) {
    var newFormat = {};
    newFormat.name = characteristic;
    newFormat.value = characteristics[characteristic].value;
    newFormat.id = characteristics[characteristic].id;
    formattedCharacteristics.push(newFormat);
  }
  return formattedCharacteristics;
};

const sortReviews = (reviews, option) => {
  var reviewsCopy = reviews.slice();
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
    var sortedReviews = [];
    var tempStorage = [];
    var currentDate = reviewsCopy[0].date;
    for (var i = 0; i < reviewsCopy.length; i++) {
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
    for (var i = 0; i < sortedReviews.length; i++) {
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
  var output = [];
  for (var i = 0; i < reviews.length; i++) {
    if (starFilters.indexOf(reviews[i].rating) !== -1) {
      output.push(reviews[i]);
    }
  }
  return output;
};

const formatReviewTile = (summary, body, photos, reviewId) => {
  var additionalBody = '';
  var showAdditionalBodyButton = false;
  var showPhotos = false;
  var helpful = 0;
  var showAddHelpfulButton = true;
  var reportStatus = false;
  if (summary.length > 60) {
    summary = summary.slice(0, 61) + '...';
  }
  if (body.length > 250) {
    additionalBody = body.slice();
    body = body.slice(0, 251) + '...';
    showAdditionalBodyButton = true;
  }
  if (photos.length !== 0) {
    showPhotos = true;
  }
  var currentHelpfulReviews = JSON.parse(sessionStorage.getItem('helpfulReviews'));
  if (currentHelpfulReviews.indexOf(reviewId) !== -1) {
    helpful = 1;
    showAddHelpfulButton = false;
  }
  var currentReportedReviews = JSON.parse(sessionStorage.getItem('reportedReviews'));
  if (currentReportedReviews.indexOf(reviewId) !== -1) {
    reportStatus = true;
  }
  return [summary, body, additionalBody, showAdditionalBodyButton, showPhotos, helpful, showAddHelpfulButton, reportStatus];
};

module.exports = {
  formatDate: formatDate,
  fetchReviews: fetchReviews,
  computeAverageRating: computeAverageRating,
  computeRatingBreakdown: computeRatingBreakdown,
  computeRecommendedPercentage: computeRecommendedPercentage,
  formatCharacteristics: formatCharacteristics,
  sortReviews: sortReviews,
  applyStarFilters: applyStarFilters,
  formatReviewTile: formatReviewTile
};