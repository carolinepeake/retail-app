import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(url);
        console.log('response in useFetchData hook: ', response);
        // check that productId response is same as productID
        // can abort request if productID changes
        setData(response);
      } catch (error) {
        console.log('error in useFetchData hook: ', error.message);
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchData;
