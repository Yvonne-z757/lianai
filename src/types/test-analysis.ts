// 从文档中提取的数据模型定义
export interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'error' | 'skip';
  duration: number;
  startTime: Date;
  endTime: Date;
  environment: string;
  version: string;
  executor: string;
  failureReason?: string;
  logs?: string[];
  screenshots?: string[];
  video?: string;
  metadata: Record<string, any>;
}

export interface AnalysisDimension {
  id: string;
  name: string;
  type: 'category' | 'numeric' | 'datetime';
  field: string;
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max';
  filters?: Filter[];
  sort?: 'asc' | 'desc';
}

export interface QueryCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'like' | 'in';
  value: any;
  logic: 'and' | 'or';
}

export interface Filter {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'like' | 'in';
  value: any;
} 