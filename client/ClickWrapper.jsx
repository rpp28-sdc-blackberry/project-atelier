import React from 'react';

const ClickWrapper = (ComponentToWrap, moduleName) => {
  return (props) => (
    <div onClick={(e) => {
      // console.log('clicked element:', e.target.outerHTML, '\nclicked module', moduleName, '\ntimestamp:', new Date);
      // fetch('/interactions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     element: e.target.outerHTML,
      //     widget: moduleName,
      //     time: new Date
      //   })
      // })
        // .then(data => console.log('Click event recorded!', data))
        // .catch(error => console.log('Error:', error));
    }}>
      <ComponentToWrap {...props}/>
    </div>
  );
};

export default ClickWrapper;