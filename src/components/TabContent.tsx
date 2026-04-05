"use client";

import { useState, useEffect, useRef } from "react";

interface TabContentProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export default function TabContent({ children, isVisible }: TabContentProps) {
  const [show, setShow] = useState(isVisible);
  const [animate, setAnimate] = useState(isVisible ? "enter" : "exit");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Clear any pending exit timer
      if (timerRef.current) clearTimeout(timerRef.current);
      setShow(true);
      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        setAnimate("enter");
      });
    } else {
      setAnimate("exit");
      // Wait for animation to finish, then unmount
      timerRef.current = setTimeout(() => {
        setShow(false);
      }, 250);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible]);

  if (!show) return null;

  return (
    <div className={`tab-content tab-${animate}`}>
      {children}
    </div>
  );
}
