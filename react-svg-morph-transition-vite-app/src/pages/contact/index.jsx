import {css} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';
import {useEffect} from 'react';
import {Spacer} from '../../components/Spacer';
import {Layout} from '../../layouts/defaults';
const ContactPage = ({isAnimate}) => {
  console.log(`ContactPage, isAnimate`, isAnimate);
  useEffect(() => {
    if (isAnimate) {
      console.log(`do animate`);
    }
    return () => {};
  }, [isAnimate]);
  return (
    <AnimatePresence>
      {isAnimate && (
        <Layout>
          <div
            className={css`
              width: 100%;
              position: relative;
              min-height: 100vh;
              padding-top: 10rem;
            `}
          >
            <div
              className={css`
                max-width: 30rem;
                min-height: 20rem;
                width: 100%;
                margin: 0 auto;
                border: 1px solid;
              `}
            >
              <h2
                className={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                Contact Page
              </h2>
              <Spacer height={`3vh`} />
              <p
                className={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                something...
              </p>
            </div>
          </div>
        </Layout>
      )}
    </AnimatePresence>
  );
};

export {ContactPage};
