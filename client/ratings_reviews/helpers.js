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
    total += ratingValue * freq;
  }
  for (var i = 1; i <= 5; i++) {
    var freq = ratings[i] || 0;
    var percentage = i * freq / total * 100;
    breakdown.push(percentage);
  }
  return breakdown;
};

const computeRecommendedPercentage = (recommended) => {
  var recommendedNumber = recommended.true;
  var total = recommended.true + recommended.false;
  return (recommendedNumber / total * 100).toFixed(0) + '%';
};

const formatCharacteristics = (characteristics) => {
  var formattedCharacteristics = [];
  for (var characteristic in characteristics) {
    var newFormat = {};
    newFormat.name = characteristic;
    newFormat.value = characteristics[characteristic].value;
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

module.exports = {
  formatDate: formatDate,
  fetchReviews: fetchReviews,
  computeAverageRating: computeAverageRating,
  computeRatingBreakdown: computeRatingBreakdown,
  computeRecommendedPercentage: computeRecommendedPercentage,
  formatCharacteristics: formatCharacteristics,
  sortReviews: sortReviews
};