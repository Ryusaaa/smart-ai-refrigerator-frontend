// client/src/components/common/ScrollReveal.jsx
// React Bits inspired ScrollReveal component for smooth entry on scroll
import React, { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.55,
  blur = 6,
  scale = 0.96,
  className = '',
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const transitionStyle = {
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
                 transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
                 filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px) scale(1)' : `translateY(${y}px) scale(${scale})`,
    filter: isVisible ? 'blur(0px)' : `blur(${blur}px)`,
    willChange: 'opacity, transform, filter',
  };

  return (
    <div ref={domRef} style={transitionStyle} className={className}>
      {children}
    </div>
  );
}
