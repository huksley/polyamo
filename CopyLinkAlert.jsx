import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

export const CopyLinkAlert = forwardRef(({ show, timeout }, ref) => {
  const [showNotification, setShowNotification] = useState(show ?? false);

  useEffect(() => {
    let timeoutId = undefined;
    if (showNotification) {
      timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, timeout ?? 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [timeout, showNotification]);

  const handleCopy = useCallback((clipboard) => {
    setShowNotification(true);
    navigator.clipboard.writeText(clipboard);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      const impl = {
        copy: (clipboard) => {
          handleCopy(clipboard);
        },
      };
      return impl;
    },
    [handleCopy]
  );

  return showNotification ? (
    <div className="fixed top-4 right-4 opacity-100 transition-opacity duration-500 ease-in-out">
      <div className="Alert px-3 py-2 rounded-md flex items-center">
        <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" />
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <span>Link copied to clipboard</span>
      </div>
    </div>
  ) : null;
});

CopyLinkAlert.displayName = "CopyLinkAlert";
