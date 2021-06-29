const getRelatedItems = (productId) => {
  return new Promise (resolve => {
    fetch(`/products/${productId}/related`)
      .then(response => response.json())
      .then(data => {
        let mainProductId = parseInt(productId);
        let noDuplicates = data.filter(id => id !== mainProductId);
        resolve(noDuplicates);
      });
  });
};

const getProductInfo = (productId) => {
  return new Promise (resolve => {
    fetch(`/products/${productId}`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

const getProductStyles = (productId) => {
  return new Promise (resolve => {
    fetch(`/products/${productId}/styles`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

const getProductRatings = (productId) => {
  return new Promise (resolve => {
    fetch(`/reviews/meta?product_id=${productId}`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

const findDefaultStyle = (styles) => {
  let foundDefault = false;

  return new Promise (resolve => {
    styles.forEach(style => {
      if (style['default?'] === true) {
        foundDefault = true;
        resolve(style);
      }
    });

    if (!foundDefault) {
      resolve(styles[0]);
    }
  });
};

const defineMainProduct = (info, defaultStyle, averageRating) => {
  let price, thumbnailUrl, mainProduct, rating;
  averageRating === 'NaN' ? rating = '0.00' : rating = averageRating;

  !defaultStyle.sale_price
    ? price = defaultStyle.original_price
    : price = defaultStyle.sale_price;

  !defaultStyle.photos[0].thumbnail_url
    ? thumbnailUrl = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081'
    : thumbnailUrl = defaultStyle.photos[0].thumbnail_url;

  mainProduct = {
    thumbnailUrl: thumbnailUrl,
    category: info.category,
    name: info.name,
    price: price,
    rating: rating,
    id: info.id
  };

  return mainProduct;
};

const findComparisonFeatures = (mainFeatures, comparisonFeatures) => {
  let allFeatures = [];

  mainFeatures.forEach(feature => {
    if (feature.value === null) { feature.value = '--'; }
    feature.compValue = '--';
    feature.product = 'main';
    allFeatures.push(feature);
  });

  comparisonFeatures.forEach(compFeature => {
    if (compFeature.value === null) { compFeature.value = '--'; }
    var index = allFeatures.findIndex(item => item.feature === compFeature.feature);

    if (index !== -1) {
      allFeatures[index].compValue = compFeature.value;
      compFeature.product = 'comp';
    } else {
      compFeature.compValue = '--';
      compFeature.product = 'comp';
      allFeatures.push(compFeature);
    }
  });

  return allFeatures;
};

const preventScroll = () => {
  let elem = document.getElementsByTagName('body')[0];

  if (elem.style.overflow === '') {
    elem.style.overflow = 'hidden';
  } else if (elem.style.overflow === 'hidden') {
    elem.style.overflow = '';
  }
};

module.exports = { getRelatedItems, getProductInfo, getProductStyles, getProductRatings, findDefaultStyle, defineMainProduct, findComparisonFeatures, preventScroll };