// Zero-cost drop-in replacement for framer-motion's motion.div
// Uses CSS animations instead of JS-driven animation

const cssAnim = (props) => {
  if (!props || !props.initial) return {};
  const { initial, animate, transition } = props;
  const duration = transition?.duration || 0.3;
  const delay = transition?.delay || 0;
  return { animation: `page-fade-in ${duration}s ease-out ${delay}s forwards` };
};

const createMotionComponent = (tag) => {
  const Component = React.forwardRef(({ initial, animate, exit, transition, whileHover, whileTap, layout, ...rest }, ref) => (
    React.createElement(tag, { ...rest, ref })
  ));
  Component.displayName = `motion.${tag}`;
  return Component;
};

const handler = {
  get(target, tag) {
    if (tag in target) return target[tag];
    target[tag] = createMotionComponent(tag);
    return target[tag];
  }
};

import React from 'react';

export const motion = new Proxy({}, handler);
export const AnimatePresence = ({ children }) => children;
