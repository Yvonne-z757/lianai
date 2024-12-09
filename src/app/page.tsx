'use client';

import { useState, useCallback } from 'react';
import NameInput from '@/components/home/NameInput';
import TestButton from '@/components/home/TestButton';
import ProductIntro from '@/components/home/ProductIntro';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [loading, setLoading] = useState(false);
  
  const validateName = (name: string) => {
    if (!name) return '姓名不能为空';
    if (name.length < 2) return '姓名至少需要2个字符';
    if (name.length > 10) return '姓名不能超过10个字符';
    return '';
  };

  const handleTest = useCallback(async () => {
    const error1 = validateName(name1);
    const error2 = validateName(name2);
    
    if (error1 || error2) return;
    
    setLoading(true);
    try {
      // TODO: 实现测试逻辑
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('测试失败:', error);
      // 可以添加错误提示
    } finally {
      setLoading(false);
    }
  }, [name1, name2]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-900">
        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              AI姓名缘分测试
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              探索你们的姓名中隐藏的缘分密码
            </p>
          </div>

          {/* 输入区域 */}
          <div className="max-w-md mx-auto mb-12 space-y-6">
            <NameInput
              label="第一个人的姓名"
              value={name1}
              onChange={setName1}
              error={name1 ? validateName(name1) : ''}
            />
            <NameInput
              label="第二个人的姓名"
              value={name2}
              onChange={setName2}
              error={name2 ? validateName(name2) : ''}
            />
            <TestButton
              onClick={handleTest}
              disabled={!name1 || !name2 || !!validateName(name1) || !!validateName(name2)}
              loading={loading}
            />
          </div>

          {/* 产品说明区域 */}
          <ProductIntro />
        </main>
        <ThemeToggle />
      </div>
    </ErrorBoundary>
  );
}
