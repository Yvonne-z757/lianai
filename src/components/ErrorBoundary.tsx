import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white dark:from-pink-900 dark:to-gray-900">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              抱歉，出现了一些问题
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              请刷新页面重试，或联系我们寻求帮助
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 