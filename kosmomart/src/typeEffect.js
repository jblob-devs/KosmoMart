export function typeEffect({
  fullText,
  setText,
  delay = 80,         // typing speed
  deleteDelay = 20,   // deleting speed (faster than typing)
  pause = 1000,       // pause between typing and deleting
  onComplete = () => {},
  loop = false
}) {
  const lines = fullText.split('\n');
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  let interval = setInterval(runTyping, delay);

  function runTyping() {
    setText(prev => {
      const currentLine = lines[lineIndex];

      if (!deleting && charIndex <= currentLine.length) {
        const next = currentLine.slice(0, charIndex);
        charIndex++;
        return next;
      }

      if (!deleting && charIndex > currentLine.length) {
        // done typing, start deleting after pause
        deleting = true;
        charIndex = currentLine.length;
        clearInterval(interval);
        setTimeout(() => {
          interval = setInterval(runTyping, deleteDelay);
        }, pause);
        return currentLine;
      }

      if (deleting && charIndex >= 0) {
        const next = currentLine.slice(0, charIndex);
        charIndex--;
        return next;
      }

      if (deleting && charIndex < 0) {
        // done deleting, go to next line
        deleting = false;
        lineIndex++;
        charIndex = 0;

        if (lineIndex >= lines.length) {
          if (loop) {
            lineIndex = 0;
          } else {
            clearInterval(interval);
            onComplete();
            return '';
          }
        }

        clearInterval(interval);
        setTimeout(() => {
          interval = setInterval(runTyping, delay);
        }, pause);
        return '';
      }

      return prev;
    });
  }

  return () => clearInterval(interval);
}