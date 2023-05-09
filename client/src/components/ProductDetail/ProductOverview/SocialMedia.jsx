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
&:hover {
  cursor: pointer;
};
display: ${(props) => (props.mobile ? 'none' : 'flex')};
flex-direction: column;
width: fit-content;
margin: 1.0rem 0;

@media (max-width: 600px) {
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  margin: 0 auto;
  margin-bottom: 3rem;
};
`;
// margin-block-end: calc(8px + 0.5vw);
//   margin-top: calc(8px + 0.5vw);
//   margin-top: 0.5rem;
//   margin-bottom: 0.5rem;

const Like = styled.div`
font-size: 1rem;
`;

const Logo = styled.div`
flex: f1;
flex-basis: 2.0rem;
flex-grow: 1;
flex-shrink: 1;
padding-right: 0.5rem;
padding-top: 0.5rem;
&:hover {
  color: ${(props) => props.facebook && 'blue'};
  color: ${(props) => props.twitter && 'aqua'};
  color: ${(props) => props.pintrest && 'red'};
};
display: flex;
justify-content: center;
font-size: 1rem;
`;

const ShareSocial = styled.div`
max-width: 7.5rem;
display: flex;
flex-basis: 2.0rem 7.5rem;
flex-shrink: 1;
flex-grow: 1;
`;

export default SocialMedia;
