import React from 'react';

class ShareToSocialMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    twttr.widgets.load();
    //FB.init({ xfbml: true, version: ' v11.0 ' });
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
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0" nonce="dilSYGI6"></script>
        <div class="fb-share-button" 
          data-href="https://www.mocacleveland.org/exhibitions/lee-mingwei-you-are-not-stranger" 
          data-layout="button" 
          data-size="small">
          <a target="_blank" 
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.mocacleveland.org%2Fexhibitions%2Flee-mingwei-you-are-not-stranger&amp;src=sdkpreparse" 
            class="fb-xfbml-parse-ignore">Share</a>
        </div>
      </div>
    );
  }
}

export default ShareToSocialMedia;