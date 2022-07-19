import {css} from '@emotion/css';
import gsap from 'gsap';
import {useEffect, useRef, memo, useMemo} from 'react';
import * as d3 from 'd3';
import {samples} from 'culori';

const MorphTransition = ({
  isAnimate,
  transitionForwardEnd,
  transitionBackwardEnd,
}) => {
  const pathDomRef = useRef(null);

  const tl = useMemo(() => {
    return gsap.timeline({
      paused: true,
      onComplete: function () {
        transitionForwardEnd(`foward done`);
      },
      onReverseComplete: function () {
        transitionBackwardEnd(`backward done`);
      },
    });
  }, []);

  useEffect(() => {
    const pathDom = pathDomRef.current;
    tl.set(pathDom, {
      attr: {d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'},
    })
      .to(
        pathDom,
        {
          attr: {d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z'},
          ease: 'power4.in',
          duration: 0.5,
        },
        0
      )
      .to(pathDom, {
        attr: {d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z'},
        ease: 'power2',
        duration: 0.3,
      })
      .set(pathDom, {
        attr: {d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'},
        ease: 'power2',
        duration: 0.3,
      })
      .to(pathDom, {
        attr: {d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z'},
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(pathDom, {
        attr: {d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'},
        duration: 0.3,
        ease: 'power4',
      });
  }, []);

  const colorScaler = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, 0.25, 0.5, 0.75, 1])
      .range(['#73A9AD', '#90C8AC', '#C4DFAA', '#F5F0BB', '#F2D7D9'])
      .interpolate(d3.interpolateRgb.gamma(2.2));
  }, []);

  useEffect(() => {
    if (isAnimate) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isAnimate]);

  return (
    <svg
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100vw;
        min-height: 100vh;
        pointer-events: none;
      `}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {samples(10)
            .map((n) => {
              return {t: n};
            })
            .map((info) => {
              return {
                t: info.t,
                color: colorScaler(info.t),
              };
            })
            .map((info, index) => {
              return (
                <stop
                  key={index}
                  offset={`${info.t * 100}%`}
                  stopColor={info.color}
                  stopOpacity={1}
                />
              );
            })}
        </linearGradient>
      </defs>
      <g fill={`url(#gradient)`}>
        <path
          ref={pathDomRef}
          vectorEffect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </g>
    </svg>
  );
};

export default memo(MorphTransition);
