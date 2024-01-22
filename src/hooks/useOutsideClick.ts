import { useRef, useEffect } from 'react';

function useOutsideClick(handler: () => void, listenCapturing: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: Event) {
      if (!ref.current) return;
      const targetNode = e.target as Node;
      if (!ref.current.contains(targetNode)) handler();
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return { ref };
}

export default useOutsideClick;
