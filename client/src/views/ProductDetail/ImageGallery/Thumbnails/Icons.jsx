import React, {
  useState, useEffect,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { useGlobalContext } from '../../../../contexts/GlobalStore';


export default function Icons({
  place,
  clickAnchor,
}) {
  const { selectedStyle } = useGlobalContext();

  return (
    <ThumbnailsContainer>
      {selectedStyle?.photos?.map((photo, index) => (
        <Icon
          key={photo?.thumbnail_url}
          index={index}
          selected={index === place}
          clickThumbnail={clickAnchor}
        />
        ))
      }
    </ThumbnailsContainer>
  );
}

Icons.propTypes = {
  place: PropTypes.number.isRequired,
  clickAnchor: PropTypes.func.isRequired,
};

const ThumbnailsContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.25em;
  width: 100%;
  justify-content: center;
  align-items: center;
`;