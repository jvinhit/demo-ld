
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
let el = document.createElement('div');
let mounted = false;

export default function ({ visible, children}) {
  useEffect(() => {
    if (visible) {
      document.body.appendChild(el);
      mounted = true;
    } else {
      clear();
    }
    return clear;
  }, [visible]);

  const clear = () => {
    if (mounted) {
      document.body.removeChild(el);
      el = document.createElement('div');
      mounted = false;
    }
  };
  if (!visible) return null;
  return createPortal(children, el);
}
