import React, { ErrorInfo, ReactNode } from 'react';
interface Props {
  children?: ReactNode;
  fallback: React.ElementType;
  id?: string;
}

interface State {
  hasError: boolean;
  info: Error | null;
  id?: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      info: null,
      id: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.log('error: ', error);
    // console.log('errorInfo: ', errorInfo);
  }

  render() {
    const { hasError, info } = this.state;

    const { children } = this.props;

    if (this.props.id !== this.state.id) {
      this.setState({ hasError: false, info: null, id: this.props.id });
    }

    if (hasError) {
      return (
        <button
          onClick={() => {
            this.setState({ hasError: false, info: null });
          }}
        >
          <this.props.fallback error={info} />
        </button>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
