"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface TitleInputProps {
  initialTitle: string;
  onTitleChange: (newTitle: string) => void;
  placeholder: string;
}

export function TitleInput({
  initialTitle,
  onTitleChange,
  placeholder,
}: TitleInputProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInitialMount = useRef(true);

  // Set initial content and focus on mount
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = initialTitle;
      titleRef.current.focus();
      isInitialMount.current = false;

      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false); // false = ke akhir
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [initialTitle]);

  // Handle input changes
  const handleInput = () => {
    if (!titleRef.current) return;

    // Get the selection and range to save the cursor position
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(titleRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    const newTitle = titleRef.current.textContent || "";
    onTitleChange(newTitle); // Update parent state, but do not set innerHTML here
  };

  // Prevent new line on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Optional: Logic to move focus to the next block
    }
  };

  return (
    <h1
      ref={titleRef}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={cn(
        "text-primary relative w-full resize-none bg-transparent text-xl font-bold tracking-tight break-words lg:text-4xl",
        "focus:ring-0 focus:outline-none",
        // Custom class for placeholder, defined in globals.css
        "[&[data-placeholder]:empty:before]:empty:before]:absolute [&[data-placeholder]:empty:before]:content-[attr(data-placeholder)]"
      )}
      data-placeholder={placeholder}
    />
  );
}
