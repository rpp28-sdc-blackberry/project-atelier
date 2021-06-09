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
  return total / count;
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

module.exports = {
  formatDate: formatDate,
  fetchReviews: fetchReviews,
  computeAverageRating: computeAverageRating,
  computeRatingBreakdown: computeRatingBreakdown
};