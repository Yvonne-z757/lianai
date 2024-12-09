'use client';

import { useState } from 'react';
import { TestResult, QueryCondition } from '@/types/test-analysis';
import FilterPanel from '@/components/test-analysis/FilterPanel';

// 模拟数据
const mockTestResults: TestResult[] = [
  {
    id: '1',
    name: '登录功能测试',
    status: 'pass',
    duration: 1500,
    startTime: new Date('2024-03-10T10:00:00'),
    endTime: new Date('2024-03-10T10:00:01.5'),
    environment: '测试环境',
    version: 'v1.0.0',
    executor: '张三',
    metadata: {},
  },
  {
    id: '2',
    name: '注册功能测试',
    status: 'fail',
    duration: 2000,
    startTime: new Date('2024-03-10T10:01:00'),
    endTime: new Date('2024-03-10T10:01:02'),
    environment: '测试环境',
    version: 'v1.0.0',
    executor: '李四',
    failureReason: '验证码发送失败',
    metadata: {},
  },
  // 添加更多模拟数据...
];

export default function TestAnalysisPage() {
  const [testResults, setTestResults] = useState<TestResult[]>(mockTestResults);
  const [filteredResults, setFilteredResults] = useState<TestResult[]>(mockTestResults);

  // 处理筛选条件变化
  const handleFilterChange = (conditions: QueryCondition[]) => {
    if (conditions.length === 0) {
      setFilteredResults(testResults);
      return;
    }

    const filtered = testResults.filter(result => {
      return conditions.every((condition, index) => {
        if (index > 0 && condition.logic === 'or') {
          // TODO: 实现 OR 逻辑
          return true;
        }

        const value = result[condition.field as keyof TestResult];
        switch (condition.operator) {
          case 'eq':
            return value === condition.value;
          case 'ne':
            return value !== condition.value;
          case 'like':
            return String(value).includes(condition.value);
          case 'in':
            return condition.value.split(',').includes(String(value));
          default:
            return true;
        }
      });
    });

    setFilteredResults(filtered);
  };

  return (
    <>
      {/* 左侧筛选面板 */}
      <div className="h-full">
        <FilterPanel onFilterChange={handleFilterChange} />
      </div>

      {/* 主内容区 */}
      <div className="space-y-6">
        {/* 数据可视化区域 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 通过率卡片 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              测试通过率
            </h3>
            <div className="text-3xl font-bold text-green-500">
              {Math.round((filteredResults.filter(r => r.status === 'pass').length / filteredResults.length) * 100)}%
            </div>
          </div>

          {/* 总执行时间卡片 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              总执行时间
            </h3>
            <div className="text-3xl font-bold text-blue-500">
              {Math.round(filteredResults.reduce((sum, r) => sum + r.duration, 0) / 1000)}s
            </div>
          </div>

          {/* 测试用例数量卡片 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              测试用例数量
            </h3>
            <div className="text-3xl font-bold text-purple-500">
              {filteredResults.length}
            </div>
          </div>
        </section>
        
        {/* 测试结果表格区域 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    测试名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    执行时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    环境
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    执行人
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {result.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${result.status === 'pass' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                          result.status === 'fail' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'}`}>
                        {result.status === 'pass' ? '通过' : 
                         result.status === 'fail' ? '失败' : 
                         result.status === 'error' ? '错误' : '跳过'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {result.duration}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {result.environment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {result.executor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
} 