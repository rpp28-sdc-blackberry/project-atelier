const getRelatedItems = (productId) => {
  return new Promise (resolve => {
    fetch(`http://localhost:8080/products/${productId}/related`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

module.exports.getRelatedItems = getRelatedItems;