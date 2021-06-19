const reviews = {
  'product': '22122',
  'page': 0,
  'count': 5,
  'results': [
    {
      'review_id': 289139,
      'rating': 5,
      'summary': 'This product was great!',
      'recommend': true,
      'response': '',
      'body': 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
      'date': '2019-01-01T00:00:00.000Z',
      'reviewer_name': 'funtime',
      'helpfulness': 0,
      'photos': []
    },
    {
      'review_id': 289140,
      'rating': 4,
      'summary': 'This product was ok!',
      'recommend': false,
      'response': 'Thank you for your feedback!',
      'body': 'I really did not like this product solely because I am tiny and do not fit into it.',
      'date': '2019-01-11T00:00:00.000Z',
      'reviewer_name': 'mymainstreammother',
      'helpfulness': 2,
      'photos': []
    },
    {
      'review_id': 308845,
      'rating': 2,
      'summary': 'my reviewmy reviewmy reviewmy reviewmy reviewmy reviewmy reviewmy reviewmy review',
      'recommend': true,
      'response': null,
      'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tempus metus, at consectetur elit. Maecenas efficitur, tellus nec ultricies tincidunt, odio arcu sagittis tortor, quis eleifend lacus odio eu purus. Nulla et purus eget ligula luctus facilisis et sit amet ante. Maecenas eleifend sagittis laoreet. Vivamus et venenatis urna. Ut elementum pellentesque diam in porta. Donec tempor semper nisi sed molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tempus metus, at consectetur elit. Maecenas efficitur, tellus nec ultricies tincidunt, odio arcu sagittis tortor, quis eleifend lacus odio eu purus. Nulla et purus eget ligula luctus facilisis et sit amet ante. Maecenas eleifend sagittis laoreet. Vivamus et venenatis urna. Ut elementum pellentesque diam in porta. Donec tempor semper nisi sed molestie.',
      'date': '2021-03-30T00:00:00.000Z',
      'reviewer_name': 'Arf Barley',
      'helpfulness': 9,
      'photos': [
        {
          'id': 536090,
          'url': 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
        },
        {
          'id': 536091,
          'url': 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
        }
      ]
    },
    {
      'review_id': 308844,
      'rating': 2,
      'summary': 'my review',
      'recommend': true,
      'response': null,
      'body': 'is thus to be revered like this',
      'date': '2021-03-30T00:00:00.000Z',
      'reviewer_name': 'Arf Barley',
      'helpfulness': 0,
      'photos': [
        {
          'id': 536089,
          'url': 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
        }
      ]
    }
  ]
};

const meta = {
  'product_id': '2',
  'ratings': {
    2: 1,
    3: 1,
    4: 2
  },
  'recommended': {
    true: 5,
    false: 3
  },
  'characteristics': {
    'Size': {
      'id': 14,
      'value': '4.0000'
    },
    'Width': {
      'id': 15,
      'value': '3.5000'
    },
    'Comfort': {
      'id': 16,
      'value': '4.0000'
    }
  }
};

module.exports = {
  reviews, meta
};