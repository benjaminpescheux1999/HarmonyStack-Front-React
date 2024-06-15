import { cn } from "../../utils/cn";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TypingAnimation({
  text,
  duration = 50,
  className,
  cursorClassName,
}: {
  text: string;
  duration?: number;
  className?: string;
  cursorClassName?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [lastWord, setLastWord] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const lastSpaceIndex = text.lastIndexOf(" ") + 1;
  const textRef = useRef(text);

  useEffect(() => {
    if (text !== textRef.current) {
      setDisplayedText("");
      setLastWord("");
      setI(0);
      textRef.current = text;
    }

    const typingEffect = setInterval(() => {
      if (i < lastSpaceIndex) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else if (i >= lastSpaceIndex && i < text.length) {
        setLastWord((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text, lastSpaceIndex]);

  return (
    <h1
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {displayedText}
      <span className="text-blue dark:text-blue">{lastWord}</span>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </h1>
  );
}
