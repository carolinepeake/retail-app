import { useState, useEffect } from 'react';

const useLocalStorage = (action) => {

  const [data, setData] = useState('');

  const { type, key, value } = action;

  switch (action.type)
  case 'SET' {
    localStorage.setItem(key, value);
  }
  case 'GET' {
    localStorage.getItem(key);
  }
  case 'REMOVE' {
    localStorage.removeItem(key);
  }
  const retrieveValue = (key) => {
    localStorage.get('key')
  } default




  return data;
}




Q






