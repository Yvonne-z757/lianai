'use client';

import { useState } from 'react';
import { QueryCondition } from '@/types/test-analysis';

interface FilterPanelProps {
  onFilterChange: (conditions: QueryCondition[]) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [conditions, setConditions] = useState<QueryCondition[]>([]);
  const [savedFilters, setSavedFilters] = useState<{name: string; conditions: QueryCondition[]}[]>([]);

  // 字段选项
  const fieldOptions = [
    { label: '测试名称', value: 'name' },
    { label: '执行状态', value: 'status' },
    { label: '执行环境', value: 'environment' },
    { label: '执行人', value: 'executor' },
    { label: '版本', value: 'version' },
  ];

  // 操作符选项
  const operatorOptions = [
    { label: '等于', value: 'eq' },
    { label: '不等于', value: 'ne' },
    { label: '包含', value: 'like' },
    { label: '在...中', value: 'in' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* 快速搜索 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          快速搜索
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          placeholder="搜索测试名称..."
        />
      </div>

      {/* 条件列表 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            筛选条件
          </label>
          <button
            onClick={() => {
              setConditions([
                ...conditions,
                {
                  field: 'name',
                  operator: 'eq',
                  value: '',
                  logic: 'and',
                },
              ]);
            }}
            className="text-sm text-pink-600 hover:text-pink-700"
          >
            添加条件
          </button>
        </div>
        
        {conditions.map((condition, index) => (
          <div key={index} className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            {/* 逻辑运算符 */}
            {index > 0 && (
              <select
                value={condition.logic}
                onChange={(e) => {
                  const newConditions = [...conditions];
                  newConditions[index].logic = e.target.value as 'and' | 'or';
                  setConditions(newConditions);
                  onFilterChange(newConditions);
                }}
                className="w-20 text-sm border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="and">且</option>
                <option value="or">或</option>
              </select>
            )}
            
            {/* 字段选择 */}
            <select
              value={condition.field}
              onChange={(e) => {
                const newConditions = [...conditions];
                newConditions[index].field = e.target.value;
                setConditions(newConditions);
                onFilterChange(newConditions);
              }}
              className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            >
              {fieldOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* 操作符选择 */}
            <select
              value={condition.operator}
              onChange={(e) => {
                const newConditions = [...conditions];
                newConditions[index].operator = e.target.value as QueryCondition['operator'];
                setConditions(newConditions);
                onFilterChange(newConditions);
              }}
              className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            >
              {operatorOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* 值输入 */}
            <input
              type="text"
              value={condition.value}
              onChange={(e) => {
                const newConditions = [...conditions];
                newConditions[index].value = e.target.value;
                setConditions(newConditions);
                onFilterChange(newConditions);
              }}
              className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="输入值..."
            />

            {/* 删除按钮 */}
            <button
              onClick={() => {
                const newConditions = conditions.filter((_, i) => i !== index);
                setConditions(newConditions);
                onFilterChange(newConditions);
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              删除
            </button>
          </div>
        ))}
      </div>

      {/* 保存的筛选条件 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            已保存的筛选条件
          </label>
          <button
            onClick={() => {
              const name = prompt('请输入筛选条件名称');
              if (name) {
                setSavedFilters([
                  ...savedFilters,
                  { name, conditions: [...conditions] },
                ]);
              }
            }}
            className="text-sm text-pink-600 hover:text-pink-700"
          >
            保存当前条件
          </button>
        </div>
        
        <div className="space-y-2">
          {savedFilters.map((filter, index) => (
            <button
              key={index}
              onClick={() => {
                setConditions(filter.conditions);
                onFilterChange(filter.conditions);
              }}
              className="w-full text-left p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 