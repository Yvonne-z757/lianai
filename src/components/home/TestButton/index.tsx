import { motion, HTMLMotionProps } from 'framer-motion';

interface TestButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const MotionButton = motion.button as React.ComponentType<
  HTMLMotionProps<"button"> & 
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function TestButton({ onClick, disabled, loading }: TestButtonProps) {
  return (
    <MotionButton
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative w-full sm:w-auto px-8 py-3 rounded-lg font-medium
        transition-all duration-200 overflow-hidden
        ${disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg'
        }
      `}
    >
      <div className="relative flex items-center justify-center">
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{loading ? '分析中...' : '开始测试'}</span>
      </div>
      {!disabled && !loading && (
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200" />
      )}
    </MotionButton>
  );
} 