import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon} from 'react-share';

var ShareToSocialMedia = (props) => {
  return (
    <div id="share">
      <FacebookShareButton 
        url={window.location.href}
        title='Hi There! I love this product! You should check it out!'>
        <FacebookIcon 
          size={32}
          round={true}/>
      </FacebookShareButton>
      <TwitterShareButton 
        url={window.location.href}
        title='Hi There! I love this product! You should check it out!'>
        <TwitterIcon 
          size={32}
          round={true}/>
      </TwitterShareButton>
      <PinterestShareButton 
        url={window.location.href}
        description='Hi There! I love this product! You should check it out!'
        media={props.selectedStyle.photos[props.currPhotoIndex].url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}>
        <PinterestIcon 
          size={32}
          round={true}/>
      </PinterestShareButton>
    </div>
  );
}

export default ShareToSocialMedia;