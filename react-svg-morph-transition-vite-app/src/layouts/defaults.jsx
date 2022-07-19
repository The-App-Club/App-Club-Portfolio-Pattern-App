import {cx, css} from '@emotion/css';
import {duration} from '@mui/material';
import {motion} from 'framer-motion';

const motionConfig = {
  initial: {
    x: 0,
    y: 30,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hide: {
    x: 0,
    y: 30,
    opacity: 0,
  },
};

const Layout = ({children, className = css``}) => {
  return (
    <motion.div
      variants={motionConfig}
      initial={'initial'}
      animate={'animate'}
      transition={{
        duration: 0.4,
        ease: `easeOut`,
      }}
      exit={'hide'}
      className={cx(
        css`
          position: relative;
          width: 100%;
          height: 100%;
        `,
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export {Layout};
