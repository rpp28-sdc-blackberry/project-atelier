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
  var output = [];
  for (var i = 0; i < reviews.length; i++) {
    if (starFilters.indexOf(reviews[i].rating) !== -1) {
      output.push(reviews[i]);
    }
  }
  return output;
};

// var dummy = [
//   {
//     'review_id': 289139,
//     'rating': 5,
//     'summary': 'This product was great!',
//     'recommend': true,
//     'response': '',
//     'body': 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
//     'date': '2019-01-01T00:00:00.000Z',
//     'reviewer_name': 'funtime',
//     'helpfulness': 0,
//     'photos': []
//   },
//   {
//     'review_id': 289140,
//     'rating': 4,
//     'summary': 'This product was ok!',
//     'recommend': false,
//     'response': 'Thank you for your feedback!',
//     'body': 'I really did not like this product solely because I am tiny and do not fit into it.',
//     'date': '2019-01-11T00:00:00.000Z',
//     'reviewer_name': 'mymainstreammother',
//     'helpfulness': 2,
//     'photos': []
//   },
//   {
//     'review_id': 308845,
//     'rating': 2,
//     'summary': 'my reviewmy reviewmy reviewmy reviewmy reviewmy reviewmy reviewmy reviewmy review',
//     'recommend': true,
//     'response': null,
//     'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tempus metus, at consectetur elit. Maecenas efficitur, tellus nec ultricies tincidunt, odio arcu sagittis tortor, quis eleifend lacus odio eu purus. Nulla et purus eget ligula luctus facilisis et sit amet ante. Maecenas eleifend sagittis laoreet. Vivamus et venenatis urna. Ut elementum pellentesque diam in porta. Donec tempor semper nisi sed molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tempus metus, at consectetur elit. Maecenas efficitur, tellus nec ultricies tincidunt, odio arcu sagittis tortor, quis eleifend lacus odio eu purus. Nulla et purus eget ligula luctus facilisis et sit amet ante. Maecenas eleifend sagittis laoreet. Vivamus et venenatis urna. Ut elementum pellentesque diam in porta. Donec tempor semper nisi sed molestie.',
//     'date': '2021-03-30T00:00:00.000Z',
//     'reviewer_name': 'Arf Barley',
//     'helpfulness': 9,
//     'photos': [
//       {
//         'id': 536090,
//         'url': 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
//       },
//       {
//         'id': 536091,
//         'url': 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
//       }
//     ]
//   },
//   {
//     'review_id': 308844,
//     'rating': 2,
//     'summary': 'my review',
//     'recommend': true,
//     'response': null,
//     'body': 'is thus to be revered like this',
//     'date': '2021-03-30T00:00:00.000Z',
//     'reviewer_name': 'Arf Barley',
//     'helpfulness': 0,
//     'photos': [
//       {
//         'id': 536089,
//         'url': 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
//       }
//     ]
//   }
// ];

// console.log(applyStarFilters(dummy, [2]));

module.exports = {
  formatDate: formatDate,
  fetchReviews: fetchReviews,
  computeAverageRating: computeAverageRating,
  computeRatingBreakdown: computeRatingBreakdown,
  computeRecommendedPercentage: computeRecommendedPercentage,
  formatCharacteristics: formatCharacteristics,
  sortReviews: sortReviews
};