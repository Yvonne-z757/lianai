import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '测试分析 - 测试结果展示与分析',
  description: '测试结果的可视化展示、数据分析、报告生成等功能',
};

export default function TestAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧筛选区 */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        {children}
      </aside>
      
      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto">
        {/* 顶部操作区 */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-800">
          {/* 操作组件将在这里实现 */}
        </div>
        
        {/* 内容区域 */}
        <div className="p-6">
          {children}
        </div>
      </main>
      
      {/* 右侧详情区 */}
      <aside className="w-80 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
        {/* 详情组件将在这里实现 */}
      </aside>
    </div>
  );
} 