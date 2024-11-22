import { useEffect, useRef } from "react";

interface ObserverOption {
    root?: Element | null;
    rootMargin?: string;
    threshold: number | number[];
}

export const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options?: ObserverOption,
) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    });

    return targetRef;
};
