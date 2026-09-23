import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useScrollReveal
 * High-performance IntersectionObserver hook for scroll-triggered animations.
 * Supports both callback refs `ref={refCallback}` and RefObjects `useScrollReveal(ref, options)`.
 */
export function useScrollReveal(refOrOptions, maybeOptions) {
  let initialRef = null;
  let options = {};

  if (refOrOptions && typeof refOrOptions === 'object' && 'current' in refOrOptions) {
    initialRef = refOrOptions;
    options = maybeOptions || {};
  } else if (typeof refOrOptions === 'object') {
    options = refOrOptions || {};
  }

  const {
    threshold = 0.08,
    rootMargin = '0px 0px -30px 0px',
    once = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);
  const observerRef = useRef(null);

  const attachObserver = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      nodeRef.current = node;

      if (!node) return;

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setIsVisible(true);
        return;
      }

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (once) {
                observer.disconnect();
                observerRef.current = null;
              }
            } else if (!once) {
              setIsVisible(false);
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [threshold, rootMargin, once]
  );

  // Callback ref function passed directly to JSX `ref={refCallback}`
  const refCallback = useCallback(
    (node) => {
      attachObserver(node);
    },
    [attachObserver]
  );

  // If passed an existing RefObject like useScrollReveal(myRef, options)
  useEffect(() => {
    if (initialRef) {
      if (initialRef.current) {
        attachObserver(initialRef.current);
      }
      const checkTimer = setTimeout(() => {
        if (initialRef.current && !observerRef.current) {
          attachObserver(initialRef.current);
        }
      }, 50);
      return () => clearTimeout(checkTimer);
    }
  }, [initialRef, attachObserver]);

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [refCallback, isVisible];
}

/**
 * useScrollRevealItem
 * Convenience hook returning [refCallback, isVisible] for individual animated elements.
 */
export function useScrollRevealItem(options = {}) {
  return useScrollReveal(options);
}
