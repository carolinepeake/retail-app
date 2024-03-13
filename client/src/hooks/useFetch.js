import { useEffect, useReducer, useRef } from 'react';

const useFetch = (url) => {
  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        console.log('unknown action type in fetch reducer, type: ', action.type);
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { status, data, error } = state;

  const cache = useRef({});

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return { status, data, error };
};

export default useFetch;
