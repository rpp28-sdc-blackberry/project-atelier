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

module.exports = { getRelatedItems, getProductInfo, getProductStyles };