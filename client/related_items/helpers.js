const getRelatedItems = (productId) => {
  return new Promise (resolve => {
    fetch(`/products/${productId}/related`)
      .then(response => response.json())
      .then(data => resolve(data));
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

const defineMainProduct = (info, defaultStyle) => {
  let price, thumbnailUrl, mainProduct;

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
    rating: '4.5',
    id: info.id
  };

  return mainProduct;
};

const findComparisonFeatures = (mainFeatures, comparisonFeatures) => {
  let allFeatures = [];

  mainFeatures.forEach(feature => {
    feature.compValue = '';
    allFeatures.push(feature);
  });

  comparisonFeatures.forEach(compFeature => {
    var index = allFeatures.findIndex(item => item.feature === compFeature.feature);
    if (index !== -1) {
      allFeatures[index].compValue = compFeature.value;
    } else {
      compFeature.compValue = '';
      allFeatures.push(compFeature);
    }
  });

  return allFeatures;
};

module.exports = { getRelatedItems, getProductInfo, getProductStyles, findDefaultStyle, defineMainProduct, findComparisonFeatures };