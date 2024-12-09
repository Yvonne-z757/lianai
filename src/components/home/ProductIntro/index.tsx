import { motion, HTMLMotionProps } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div"> & React.HTMLAttributes<HTMLDivElement>>;
const MotionH2 = motion.h2 as React.ComponentType<HTMLMotionProps<"h2"> & React.HTMLAttributes<HTMLHeadingElement>>;
const MotionP = motion.p as React.ComponentType<HTMLMotionProps<"p"> & React.HTMLAttributes<HTMLParagraphElement>>;
const MotionLi = motion.li as React.ComponentType<HTMLMotionProps<"li"> & React.HTMLAttributes<HTMLLIElement>>;

export default function ProductIntro() {
  return (
    <MotionDiv 
      className="max-w-2xl mx-auto text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <MotionH2 
        className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
        variants={item}
      >
        AI姓名缘分测试
      </MotionH2>
      <MotionP 
        className="text-gray-600 mb-8 leading-relaxed"
        variants={item}
      >
        基于先进的AI技术，从姓名中分析两个人的缘分契合度。通过解读姓名的五行属性、字符能量等维度，为您提供专业的缘分分析。
      </MotionP>
      <MotionDiv 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
        variants={item}
      >
        <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="font-medium mb-3 text-gray-800">分析维度</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {['姓名五行属性', '字符能量解读', '性格特质推断', '缘分契合预测'].map((item, index) => (
              <MotionLi 
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2" />
                {item}
              </MotionLi>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="font-medium mb-3 text-gray-800">测试结果</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {['总体契合度分数', '缘分等级评定', '核心特质匹配', '关系发展建议'].map((item, index) => (
              <MotionLi 
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                {item}
              </MotionLi>
            ))}
          </ul>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
} 