"use client"

import { ComponentPropsWithoutRef, PropsWithChildren, useEffect, useRef, useState } from "react";

interface AnimatedTextProps extends PropsWithChildren, ComponentPropsWithoutRef<"div"> {
  delay?: number;
}

export default function AnimatedText({ children, delay = 0, ...rest }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elementToObserve = textRef.current;

    if (!elementToObserve) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {

        setTimeout(() => {
          if (entry.isIntersecting) {
            setIsVisible(true); 
          }
        }, delay)
      },
      {
        threshold: 0.9,
      }
    );

    observer.observe(elementToObserve);

    // Clean up observer on component unmount
    return () => {
      observer.unobserve(elementToObserve);
    };
  }, []);

  return (
    <div {...rest} ref={textRef}>
      <div className={`text-white opacity-0 transform transition-all duration-700 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-9'
        }`}>
        {children}
      </div>
    </div>
  );
}
