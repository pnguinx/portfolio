"use client";

import { ChatRequestOptions } from "ai";
import { motion } from "framer-motion";
import { ArrowUp, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import StyleSelector from "./style-selector";

interface ChatBottombarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  stop: () => void;
  input: string;
  isToolInProgress: boolean;
  disabled?: boolean;
  selectedStyle: "polite" | "concise" | "versatile" | "creative";
  onStyleChange: (
    style: "polite" | "concise" | "versatile" | "creative"
  ) => void;
}

export default function ChatBottombar({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  isToolInProgress,
  disabled = false,
  selectedStyle,
  onStyleChange,
}: ChatBottombarProps) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing &&
      !isToolInProgress &&
      input.trim()
    ) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    if (inputRef.current && !isLoading && !isToolInProgress) {
      inputRef.current.focus();
    }
  }, [isLoading, isToolInProgress]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 px-3 md:px-6 lg:px-8
                 bg-background/80 backdrop-blur-md border-t border-border/30
                 pt-2 pb-[max(8px,env(safe-area-inset-bottom))]"  // reduced pt-3 → pt-2
    >
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="relative group">
            <div
              className={`flex items-end rounded-xl border shadow-md   // rounded-2xl → rounded-xl, shadow-lg → shadow-md
                          py-1 pr-1.5 pl-3 gap-1.5 transition-all duration-300  // py-2 → py-1, pr-2 → pr-1.5, pl-4 → pl-3
                          bg-card/90 backdrop-blur-xl
                          ${isFocused
                            ? "border-primary/50 shadow-primary/10 shadow-md"
                            : "border-border/60 hover:border-border"
                          }`}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  disabled
                    ? "chat limit reached"
                    : isToolInProgress
                      ? "tool in progress..."
                      : "ask me anything..."
                }
                className={`flex-1 border-none bg-transparent focus:outline-none
                            resize-none leading-relaxed lowercase
                            text-xs md:text-sm          // smaller on mobile
                            placeholder:text-muted-foreground/60
                            ${disabled ? "font-medium text-destructive" : "text-foreground"}`}
                disabled={isToolInProgress || isLoading || disabled}
                rows={1}
                style={{ minHeight: "32px", maxHeight: "100px" }}  // 44px → 32px on mobile
              />

              <div className="flex items-center gap-1.5 flex-shrink-0 mb-0.5">
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onStyleChange={onStyleChange}
                  disabled={disabled}
                />

                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || isToolInProgress || disabled}
                  className="bg-primary text-primary-foreground hover:bg-primary/90
                             flex items-center justify-center rounded-lg
                             w-7 h-7 md:w-8 md:h-8 flex-shrink-0  // 40px → 28px mobile, 32px web
                             transition-all duration-200
                             disabled:opacity-50 hover:scale-105 active:scale-95
                             shadow-sm hover:shadow-md"
                  onClick={(e) => {
                    if (isLoading) {
                      e.preventDefault();
                      stop();
                    }
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 md:h-3.5 md:w-3.5 animate-spin" />
                  ) : (
                    <ArrowUp className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
          </div>
        </form>
      </div>
    </motion.div>
  );
}