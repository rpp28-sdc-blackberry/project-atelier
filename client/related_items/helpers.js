const getRelatedItems = (productId) => {
  return new Promise (resolve => {
    fetch(`http://localhost:8080/products/${productId}/related`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

const getProductInfo = (productId) => {
  return new Promise (resolve => {
    fetch(`http://localhost:8080/products/${productId}`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

const getProductStyles = (productId) => {
  return new Promise (resolve => {
    fetch(`http://localhost:8080/products/${productId}/styles`)
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

module.exports = { getRelatedItems, getProductInfo, getProductStyles, findDefaultStyle };