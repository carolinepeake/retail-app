import React from 'react';
import styled from 'styled-components';
import { IoLogoFacebook, IoLogoTwitter, IoLogoPinterest } from 'react-icons/io';

function SocialMedia({ mobile }) {
  return (
    <SocialMediaContainer mobile={mobile}>
      <Like>Like it? Share it!</Like>
      <ShareSocial>
        <Logo facebook>
          <IoLogoFacebook style={{ height: '100%', width: '100%' }} />
        </Logo>
        <Logo twitter>
          <IoLogoTwitter style={{ height: '100%', width: '100%' }} />
        </Logo>
        <Logo pintrest>
          <IoLogoPinterest style={{ height: '100%', width: '100%' }} />
        </Logo>
      </ShareSocial>
    </SocialMediaContainer>
  );
}

const SocialMediaContainer = styled.div`
height: auto;
width: auto;
font-size: 1em;
&:hover {
  cursor: pointer;
};
display: ${(props) => (props.mobile ? 'none' : 'flex')};
flex-direction: column;
width: fit-content;
margin: 1.0em 0;

@media (max-width: 600px) {
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  margin: 0 auto;
  margin-bottom: 3em;
};
`;

const Like = styled.div`
`;

const Logo = styled.div`
flex: f1;
flex-basis: 2.0em;
flex-grow: 1;
flex-shrink: 1;
padding: 0.25em;
&:hover {
  color: ${(props) => props.facebook && 'blue'};
  color: ${(props) => props.twitter && 'aqua'};
  color: ${(props) => props.pintrest && 'red'};
};
display: flex;
justify-content: center;
`;

const ShareSocial = styled.div`
max-width: 7.5em;
display: flex;
flex-basis: 2.0em 7.5em;
flex-shrink: 1;
flex-grow: 1;
`;

export default SocialMedia;
