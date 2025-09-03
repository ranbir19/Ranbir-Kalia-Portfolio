
import React from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  colorClass?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed = 80, colorClass = 'text-white' }) => {
  const [typedText, setTypedText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    setTypedText(''); // Reset before starting
    let cancelled = false;
    
    function typeNext(i = 0) {
      if (cancelled) return;
      
      setTypedText((prev) => prev + text.charAt(i));
      
      if (i + 1 < text.length) {
        // Smoother, more consistent timing with slight variation
        const baseSpeed = speed;
        const variation = Math.floor(Math.random() * 20 - 10); // ±10ms variation
        const currentSpeed = Math.max(40, baseSpeed + variation);
        
        setTimeout(() => typeNext(i + 1), currentSpeed);
      }
    }
    
    typeNext(0);
    return () => { cancelled = true; };
  }, [text, speed]);

  // Blinking cursor effect
  React.useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Smooth cursor blink

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={colorClass}>
      {typedText}
      <span className={`inline-block w-1 h-[1em] ml-1 font-bold ${showCursor ? 'bg-white' : 'bg-transparent'} transition-colors duration-75 shadow-sm`}>
        &nbsp;
      </span>
    </span>
  );
};

export default TypingAnimation;
