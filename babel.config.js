// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react"
//     ]
// }

module.exports = {
  presets: ['@babel/preset-react', ['@babel/preset-env', {targets: {node: 'current'}}]]
};