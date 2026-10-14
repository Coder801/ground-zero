import { useEffect, useRef, type DependencyList } from "react";

/**
 * Smooth-scrolls the returned ref's element to its bottom whenever `deps`
 * change — keeps the newest item (e.g. a chat message) in view as a thread grows.
 */
export function useScrollToBottom<T extends HTMLElement>(deps: DependencyList) {
    const ref = useRef<T>(null);
    useEffect(() => {
        ref.current?.scrollTo({
            top: ref.current.scrollHeight,
            behavior: "smooth",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return ref;
}
