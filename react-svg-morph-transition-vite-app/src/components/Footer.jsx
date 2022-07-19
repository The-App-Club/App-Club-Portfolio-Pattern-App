import {css} from '@emotion/css';

const Footer = ({isAnimate}) => {
  return (
    <footer
      className={css`
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        opacity: ${isAnimate ? 1 : 0};
      `}
    >
      Bye
    </footer>
  );
};

export {Footer};
