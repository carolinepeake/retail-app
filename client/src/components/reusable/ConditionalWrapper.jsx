import React from 'react';
import PropTypes from 'prop-types';

function ConditionalWrapper({ condition, wrapper, children }) {
  return condition ? {wrapper children={children}}
    wrapper(children) : children;
}

export default ConditionalWrapper;
