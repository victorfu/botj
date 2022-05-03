import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  useEffect(() => {
    // to avoid `window is not defined` error
    import('@line/liff').then(liff => {
      console.log('start liff.init()...');
      liff
        .init({ liffId: process.env.LINE_LIFF_ID })
        .then(() => {
          console.log('liff.init() done');
          setLiffObject(liff);
        })
        .catch(error => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.LINE_LIFF_ID) {
            console.info('Please make sure that you provided `LINE_LIFF_ID` as an environmental variable.');
          }
          setLiffError(error.toString());
        });
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
