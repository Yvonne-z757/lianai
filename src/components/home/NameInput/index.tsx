import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface NameInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const NAME_REGEX = /^[\u4e00-\u9fa5a-zA-Z\s]{2,10}$/;

const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div"> & React.HTMLAttributes<HTMLDivElement>>;
const MotionP = motion.p as React.ComponentType<HTMLMotionProps<"p"> & React.HTMLAttributes<HTMLParagraphElement>>;

export default function NameInput({ label, value, onChange, error }: NameInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setIsDirty(true);
    onChange(val);
  }, [onChange]);

  const validateInput = (value: string) => {
    if (!value) return '姓名不能为空';
    if (!NAME_REGEX.test(value)) return '请输入2-10个汉字或字母';
    return '';
  };

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.addEventListener('animationend', () => {
        input.classList.remove('shake');
      });
    }
  }, []);

  return (
    <MotionDiv 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            ${isFocused ? 'border-pink-500 ring-2 ring-pink-100' : 'border-gray-200'} 
            ${error && isDirty ? 'border-red-500 bg-red-50 shake' : ''}
            focus:outline-none
            placeholder-gray-400
            text-gray-800
          `}
          placeholder="请输入姓名..."
        />
        <AnimatePresence>
          {error && isDirty && (
            <MotionP 
              className="mt-1 text-sm text-red-500 flex items-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </MotionP>
          )}
        </AnimatePresence>
      </div>
    </MotionDiv>
  );
} 