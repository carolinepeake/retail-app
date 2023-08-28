import { useState, useEffect, useMemo } from 'react';

const useMediaQuery = (query) => {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, [mediaQuery]);

  return match;
};

const useMediaQueries = () => {
  const xs = useMediaQuery('(min-width: 300px)');
  const sm = useMediaQuery('(min-width: 600px)');
  const md = useMediaQuery('(min-width: 800px)');
  const lg = useMediaQuery('(min-width: 1200px)');

  // 700
  // 40rem
  // 50rem

  return {
    xs, sm, md, lg,
  };
};

export default useMediaQueries;
