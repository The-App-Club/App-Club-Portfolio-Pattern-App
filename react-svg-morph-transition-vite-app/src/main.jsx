import {createRoot} from 'react-dom/client';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';

import {css} from '@emotion/css';
import gsap, {Power4} from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import {Spacer} from './components/Spacer';

import '@fontsource/inter';
import './styles/index.scss';
import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
import {WorkPage} from './pages/work';
import {ContactPage} from './pages/contact';
import {Button} from '@mui/material';
import {default as MorphTransition} from './components/MorphTransition';
import { Footer } from './components/Footer';

const App = () => {
  const [isAnimate, setIsAnimate] = useState(true);
  const [isTransition, setIsTransition] = useState(false);
  const containerDomRef = useRef(null);
  const mainDomRef = useRef(null);
  const navDomRef = useRef(null);
  const location = useLocation();

  const [opened, setOpened] = useState(false);

  const transitionForwardEnd = useCallback((e) => {
    // console.log(e);
    // setIsAnimate(true);
  }, []);
  const transitionBackwardEnd = useCallback((e) => {
    console.log(e);
    setIsAnimate(true);
  }, []);

  const handleDo = (e) => {
    setIsAnimate(false);
    window.scrollTo(0, 0);
    setOpened((opened) => {
      return !opened;
    });
    setIsTransition((isTransition) => {
      return !isTransition;
    });
  };

  const doTransition = (e) => {
    const navDom = navDomRef.current;
    if (opened) {
      gsap.to(navDom, {
        right: `-100%`,
        duration: 1.2,
        ease: Power4.easeOut,
      });
    } else {
      gsap.to(navDom, {
        right: `0%`,
        duration: 1.2,
        ease: Power4.easeOut,
      });
    }
    setOpened((opened) => {
      return !opened;
    });
    setIsTransition((isTransition) => {
      return !isTransition;
    });
  };

  useEffect(() => {
    const navDom = navDomRef.current;
    const mainDom = mainDomRef.current;
    if (opened) {
      gsap.set(document.body, {
        touchAction: `none`,
        overflowY: `hidden`,
      });
      gsap.to(navDom, {
        right: `0%`,
        duration: 1.2,
        ease: Power4.easeOut,
      });
      gsap.to(mainDom, {
        opacity: 0,
      });
    } else {
      gsap.set(document.body, {
        touchAction: `initial`,
        overflowY: `auto`,
      });
      gsap.to(navDom, {
        right: `-100%`,
        duration: 1.2,
        ease: Power4.easeOut,
      });
      gsap.to(mainDom, {
        opacity: 1,
      });
    }
  }, [opened]);

  return (
    <div
      ref={containerDomRef}
      className={css`
        width: 100%;
        position: relative;
        overflow: hidden;
        overflow-y: auto;
      `}
    >
      <div
        className={css`
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 2;
        `}
      >
        <Button onClick={handleDo} variant={'outlined'}>
          {opened ? `Close` : `Open`}
        </Button>
      </div>
      <nav
        ref={navDomRef}
        className={css`
          position: absolute;
          right: -100%;
          width: 100%;
          min-height: 100vh;
          background: wheat;
          color: black;
          z-index: 1;
        `}
      >
        <ul
          className={css`
            width: 100%;
            min-height: 100vh;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            list-style: none;
            gap: 3rem;
            li {
              font-size: 2rem;
              @media (max-width: 768px) {
                font-size: 1rem;
              }
            }
          `}
        >
          <li onClick={doTransition}>
            <Link to={'/'} className={css``}>
              Home
            </Link>
          </li>
          <li onClick={doTransition}>
            <Link to={'/about'} className={css``}>
              About
            </Link>
          </li>
          <li onClick={doTransition}>
            <Link to={'/work'} className={css``}>
              Work
            </Link>
          </li>
          <li onClick={doTransition}>
            <Link to={'/contact'} className={css``}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <MorphTransition
        isAnimate={isTransition}
        transitionForwardEnd={transitionForwardEnd}
        transitionBackwardEnd={transitionBackwardEnd}
      />
      <main ref={mainDomRef}>
        <article>
          <Routes location={location}>
            <Route
              path="/"
              element={<HomePage isAnimate={isAnimate} />}
            ></Route>
            <Route
              path="/about"
              element={<AboutPage isAnimate={isAnimate} />}
            ></Route>
            <Route
              path="/work"
              element={<WorkPage isAnimate={isAnimate} />}
            ></Route>
            <Route
              path="/contact"
              element={<ContactPage isAnimate={isAnimate} />}
            ></Route>
          </Routes>
        </article>
      </main>
      <Footer isAnimate={isAnimate} />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
