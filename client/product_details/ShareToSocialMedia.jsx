import React from 'react';

class ShareToSocialMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="share">
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" 
          class="twitter-share-button" 
          data-size="large" 
          data-text="Hi There! I love this product! You should check it out!" 
          data-url={window.location.href}
          data-lang="en" 
          data-show-count="false">Tweet</a>
        <div 
          class="fb-share-button" 
          data-href={window.location.href}
          data-layout="button" 
          data-size="small">
          <a 
            target="_blank" 
            href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${window.location.href}%2F&amp;src=sdkpreparse`} 
            class="fb-xfbml-parse-ignore">Share
          </a>
        </div>
      </div>
    );
  }
}

export default ShareToSocialMedia;