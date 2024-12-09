# 项目技术架构设计

## 技术栈

- **框架**: Next.js 15.0.4
- **开发语言**: TypeScript
- **UI 框架**: React 19
- **样式解决方案**: Tailwind CSS
- **代码规范**: ESLint
- **构建工具**: Turbopack (开发环境) 
.
├── src/
│ ├── app/
│ │ ├── layout.tsx # 全局布局
│ │ ├── page.tsx # 首页
│ │ ├── globals.css # 全局样式
│ │ └── fonts/ # 本地字体文件
│ ├── components/ # 组件目录
│ └── pages/ # 页面目录
├── public/ # 静态资源
├── next.config.ts # Next.js 配置
├── tailwind.config.ts # Tailwind 配置
├── tsconfig.json # TypeScript 配置
├── postcss.config.mjs # PostCSS 配置
└── package.json # 项目依赖

## 技术要点

### 1. 现代化开发环境
- 使用 TypeScript 进行类型安全的开发
- ESLint 配置确保代码质量
- 支持 Hot Module Replacement (HMR)

### 2. 样式解决方案
- Tailwind CSS 用于原子化 CSS
- CSS 变量实现主题切换
- 支持深色模式
- PostCSS 处理样式转换

### 3. 字体优化
- 使用 next/font/local 加载本地字体
- Geist Sans 和 Geist Mono 字体支持
- 支持可变字重 (100-900)

### 4. 路由系统
- 基于 Next.js App Router
- 文件系统路由
- 支持布局嵌套

### 5. 性能优化
- 图片自动优化 (next/image)
- 字体文件本地化
- 自动代码分割

### 6. 开发工具链
- Turbopack 用于快速开发
- TypeScript 类型检查
- ESLint 代码检查
- 路径别名支持 (@/*)

## 环境变量
- 支持 .env 文件配置
- 开发/生产环境分离

## 部署
- 支持 Vercel 平台快速部署
- 静态资源优化
- 自动化构建流程