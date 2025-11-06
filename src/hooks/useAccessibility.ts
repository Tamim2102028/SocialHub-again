import { useEffect, useRef } from "react";

/**
 * Custom hook to manage focus trap within a component
 * Useful for modals and dialogs
 */
export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTab);
    };
  }, [isActive]);

  return containerRef;
};

/**
 * Custom hook to restore focus when component unmounts
 * Useful for modals
 */
export const useRestoreFocus = () => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;

    return () => {
      previousActiveElement.current?.focus();
    };
  }, []);
};

/**
 * Custom hook for keyboard navigation (arrow keys)
 */
export const useKeyboardNavigation = (
  items: number,
  onSelect: (index: number) => void
) => {
  const currentIndex = useRef<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        currentIndex.current = Math.min(currentIndex.current + 1, items - 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        currentIndex.current = Math.max(currentIndex.current - 1, 0);
        break;
      case "Enter":
        e.preventDefault();
        if (currentIndex.current >= 0) {
          onSelect(currentIndex.current);
        }
        break;
      case "Escape":
        e.preventDefault();
        currentIndex.current = -1;
        break;
      default:
        return;
    }
  };

  return { handleKeyDown, currentIndex: currentIndex.current };
};
