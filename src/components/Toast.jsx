import { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 bg-cyan text-void font-mono text-sm px-5 py-3 rounded-md shadow-cyan z-[9999] animate-fade-in-up">
      {message}
    </div>
  );
};

export default Toast;
