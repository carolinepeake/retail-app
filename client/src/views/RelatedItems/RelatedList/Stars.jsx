import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { calculateStars } from '../../../utils/getAverageRating';

function Stars({ rating }) {
  const partialStarWidth = calculateStars(rating);

  const baseStars = [];
  const filledStars = [];
  for (let i = 0; i < 5; i += 1) {
    baseStars.push(
      <span key={`emptyStar${i}`}>
        {/* &#9733; */}
        {/* <svg
          // width="64px"
          // height="64px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          // viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // stroke="#000000"
          stroke="#C2C2C2"
          strokeWidth="0.00024000000000000003"
          strokeWidth="1"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M24 9.88005C24 9.74719 24 9.62884 24 9.53862C24 9.4484 24 9.38997 24 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 0C11.8649 0 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 0 10.1547 2.86027 10.2907C0 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 24 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 24.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C24 10.1561 24 10.0133 24 9.88005Z"
              // fill="#000000"
              fill="#C2C2C2"
            />
          </g>
        </svg> */}
        {/* <svg fill="#C2C2C2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 940.688 940.688"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"></path> </g> </g></svg> */}
        {/* <svg fill="#C2C2C2" width="24px" height="24px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03" fill-rule="evenodd"></path> </g></svg> */}
        {/* <svg fill="#C2C2C2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 443.442 443.442"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M436.083,190.376l-115.52,83.927l44.13,135.801c2.388,7.353-0.236,15.403-6.479,19.954 c-3.139,2.271-6.81,3.405-10.498,3.405c-3.682,0-7.364-1.135-10.479-3.405l-115.514-83.933l-115.508,83.921 c-6.266,4.552-14.733,4.552-20.986,0c-6.239-4.539-8.866-12.59-6.475-19.942l44.118-135.807L7.364,190.376 c-6.254-4.545-8.881-12.593-6.49-19.948c2.397-7.354,9.256-12.33,16.979-12.33h142.78l44.118-135.791 c2.391-7.353,9.245-12.327,16.979-12.327s14.576,4.974,16.964,12.327l44.118,135.791h142.792c7.72,0,14.576,4.977,16.976,12.33 C444.95,177.783,442.32,185.831,436.083,190.376z"></path> </g> </g></svg> */}
      {/* <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.9121 1.59053C12.7508 1.2312 12.3936 1 11.9997 1C11.6059 1 11.2487 1.2312 11.0874 1.59053L8.27041 7.86702L1.43062 8.60661C1.03903 8.64895 0.708778 8.91721 0.587066 9.2918C0.465355 9.66639 0.574861 10.0775 0.866772 10.342L5.96556 14.9606L4.55534 21.6942C4.4746 22.0797 4.62768 22.4767 4.94632 22.7082C5.26497 22.9397 5.68983 22.9626 6.03151 22.7667L11.9997 19.3447L17.968 22.7667C18.3097 22.9626 18.7345 22.9397 19.0532 22.7082C19.3718 22.4767 19.5249 22.0797 19.4441 21.6942L18.0339 14.9606L23.1327 10.342C23.4246 10.0775 23.5341 9.66639 23.4124 9.2918C23.2907 8.91721 22.9605 8.64895 22.5689 8.60661L15.7291 7.86702L12.9121 1.59053Z" fill="#C2C2C2"></path> </g></svg> */}
        <svg fill="#C2C2C2" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>star-filled</title>
            <path d="M30.859 12.545c-0.168-0.506-0.637-0.864-1.189-0.864h-9.535l-2.946-9.067c-0.208-0.459-0.662-0.772-1.188-0.772s-0.981 0.313-1.185 0.764l-0.003 0.008-2.946 9.067h-9.534c-0.69 0-1.25 0.56-1.25 1.25 0 0.414 0.202 0.782 0.512 1.009l0.004 0.002 7.713 5.603-2.946 9.068c-0.039 0.116-0.061 0.249-0.061 0.387 0 0.69 0.56 1.25 1.25 1.25 0.276 0 0.531-0.089 0.738-0.241l-0.004 0.002 7.714-5.605 7.713 5.605c0.203 0.149 0.458 0.238 0.734 0.238 0.691 0 1.251-0.56 1.251-1.251 0-0.138-0.022-0.271-0.064-0.395l0.003 0.009-2.947-9.066 7.715-5.604c0.314-0.231 0.515-0.598 0.515-1.013 0-0.137-0.022-0.27-0.063-0.393l0.003 0.009z"></path>
          </g>
        </svg>
      </span>,
    );
    filledStars.push(
      <span key={`filledStar${i}`}>
        {/* &#9733; */}
        {/* <svg
          // width="64px"
          // height="64px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          // viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // stroke="#000000"
          stroke="rgb(55, 78, 98)"
          strokeWidth="0.00024000000000000003"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M21.12 9.88005C21.0781 9.74719 20.9996 9.62884 20.8935 9.53862C20.7873 9.4484 20.6579 9.38997 20.52 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 3.28943C11.8649 3.28943 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 2.82846 10.1547 2.86027 10.2907C2.89207 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 20.7566 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 20.7501C17.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C21.1687 10.1561 21.1634 10.0133 21.12 9.88005Z"
              // fill="#000000"
              fill="rgb(55, 78, 98)"
            />
          </g>
        </svg> */}
        {/* <svg fill="rgb(55, 78, 98)" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 940.688 940.688"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"></path> </g> </g></svg> */}
        {/* <svg fill="rgb(55, 78, 98)" width="24px" height="24px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03" fill-rule="evenodd"></path> </g></svg> */}
        {/* <svg fill="rgb(55, 78, 98)" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 443.442 443.442"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M436.083,190.376l-115.52,83.927l44.13,135.801c2.388,7.353-0.236,15.403-6.479,19.954 c-3.139,2.271-6.81,3.405-10.498,3.405c-3.682,0-7.364-1.135-10.479-3.405l-115.514-83.933l-115.508,83.921 c-6.266,4.552-14.733,4.552-20.986,0c-6.239-4.539-8.866-12.59-6.475-19.942l44.118-135.807L7.364,190.376 c-6.254-4.545-8.881-12.593-6.49-19.948c2.397-7.354,9.256-12.33,16.979-12.33h142.78l44.118-135.791 c2.391-7.353,9.245-12.327,16.979-12.327s14.576,4.974,16.964,12.327l44.118,135.791h142.792c7.72,0,14.576,4.977,16.976,12.33 C444.95,177.783,442.32,185.831,436.083,190.376z"></path> </g> </g></svg> */}
        {/* <svg width="24px" height="24px" viewBox="0 0 15 15" version="1.1" id="star" xmlns="http://www.w3.org/2000/svg" fill="rgb(55, 78, 98)" stroke="rgb(55, 78, 98)" stroke-width="0.00015000000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path4749-2-8-2" d="M7.5,0l-2,5h-5l4,3.5l-2,6l5-3.5
	l5,3.5l-2-6l4-3.5h-5L7.5,0z"></path> </g></svg> */}
      {/* <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.9121 1.59053C12.7508 1.2312 12.3936 1 11.9997 1C11.6059 1 11.2487 1.2312 11.0874 1.59053L8.27041 7.86702L1.43062 8.60661C1.03903 8.64895 0.708778 8.91721 0.587066 9.2918C0.465355 9.66639 0.574861 10.0775 0.866772 10.342L5.96556 14.9606L4.55534 21.6942C4.4746 22.0797 4.62768 22.4767 4.94632 22.7082C5.26497 22.9397 5.68983 22.9626 6.03151 22.7667L11.9997 19.3447L17.968 22.7667C18.3097 22.9626 18.7345 22.9397 19.0532 22.7082C19.3718 22.4767 19.5249 22.0797 19.4441 21.6942L18.0339 14.9606L23.1327 10.342C23.4246 10.0775 23.5341 9.66639 23.4124 9.2918C23.2907 8.91721 22.9605 8.64895 22.5689 8.60661L15.7291 7.86702L12.9121 1.59053Z" fill="rgb(55, 78, 98)"></path> </g></svg> */}
        <svg fill="rgb(55, 78, 98)" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>star-filled</title>
            <path d="M30.859 12.545c-0.168-0.506-0.637-0.864-1.189-0.864h-9.535l-2.946-9.067c-0.208-0.459-0.662-0.772-1.188-0.772s-0.981 0.313-1.185 0.764l-0.003 0.008-2.946 9.067h-9.534c-0.69 0-1.25 0.56-1.25 1.25 0 0.414 0.202 0.782 0.512 1.009l0.004 0.002 7.713 5.603-2.946 9.068c-0.039 0.116-0.061 0.249-0.061 0.387 0 0.69 0.56 1.25 1.25 1.25 0.276 0 0.531-0.089 0.738-0.241l-0.004 0.002 7.714-5.605 7.713 5.605c0.203 0.149 0.458 0.238 0.734 0.238 0.691 0 1.251-0.56 1.251-1.251 0-0.138-0.022-0.271-0.064-0.395l0.003 0.009-2.947-9.066 7.715-5.604c0.314-0.231 0.515-0.598 0.515-1.013 0-0.137-0.022-0.27-0.063-0.393l0.003 0.009z"></path>
          </g>
        </svg>
      </span>,
    );
  }

  return (
    <StarsContainer>
      <BaseStar>{baseStars}</BaseStar>
      <FilledStar size={partialStarWidth}>{filledStars}</FilledStar>
    </StarsContainer>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

const StarsContainer = styled.div`
  position: relative;
  color: ${(props) => props.theme.fontColor};
/*  margin: 0.25em 0;
  margin-right: auto; */
  display: inline-block;
 /* height: 1em; */
 /* padding: 0.25em 0;
  height: 1.5em; */
  width: min-content;
`;

// const BaseStar = styled.span`
//   position: relative;
//   color: lightgrey;
// `;

const BaseStar = styled.div`
  /* position: absolute; */
  color: lightgrey;
  z-index: 1;
 /* top: 0.25em; */
  left: 0px;
  display: flex;
  width: 100%;
  font-weight: 700;
  height: 1em;
  line-height: 1em;
`;

const FilledStar = styled.div`
  position: absolute;
  z-index: 2;
  top: 0px;
 /* top: 0.25em; */
  left: 0px;
  display: flex;
  width: ${(props) => props.size}%;
  overflow: hidden;
  /* color: ${(props) => props.theme.starFilled}; */
  color: ${(props) => props.theme.blue[5]};
  font-weight: 700;
  height: 1em;
  line-height: 1em;
`;

export default Stars;

{/* <svg fill="#000000" width="64px" height="64px" viewBox="0 0 256.00 256.00" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00256"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"></g><g id="SVGRepo_iconCarrier"> <path d="M234.00977,115.47367,188.77539,153.1221l14.35938,58.07813a16.64744,16.64744,0,0,1-6.35938,17.67969,16.14026,16.14026,0,0,1-18.20312.5625l-50.4375-31.95313c-.14063-.07812-.20313-.04687-.26563,0l-46.875,29.69531a17.83088,17.83088,0,0,1-20.0625-.625A18.37492,18.37492,0,0,1,53.916,207.044l13.51562-53.16406-45.4375-38.40625a16.68222,16.68222,0,0,1-5.15625-18.0625A16.37036,16.37036,0,0,1,31.36914,86.044L90.43164,82.208,112.791,26.41117a16.324,16.324,0,0,1,15.1875-10.41407h.01562a16.33117,16.33117,0,0,1,15.21875,10.41407l22.03125,55.47656L224.63477,86.044A16.37036,16.37036,0,0,1,239.166,97.41117,16.68222,16.68222,0,0,1,234.00977,115.47367Z"></path> </g></svg> */}

{/* <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 940.688 940.688" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"></path> </g> </g></svg> */}