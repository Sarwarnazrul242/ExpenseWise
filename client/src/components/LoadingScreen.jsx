import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const phrases = [
      "Setting up your financial dashboard...",
      "Preparing smart insights...",
      "Optimizing your budget...",
      "Ready to track your expenses!"
    ];
    let currentPhrase = 0;
    let currentChar = 0;
    let progressValue = 0;

    const textInterval = setInterval(() => {
      if (currentChar < phrases[currentPhrase].length) {
        setText(phrases[currentPhrase].substring(0, currentChar + 1));
        currentChar++;
      } else {
        currentPhrase = (currentPhrase + 1) % phrases.length;
        currentChar = 0;
      }
    }, 50);

    const progressInterval = setInterval(() => {
      if (progressValue < 100) {
        progressValue += 1;
        setProgress(progressValue);
      } else {
        clearInterval(progressInterval);
        clearInterval(textInterval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              ExpenseWise
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-light">{text}</p>
        </div>

        <div className="w-[300px] h-[2px] bg-gray-800 rounded-full relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-600/50 blur-sm"></div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-400 font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
};
