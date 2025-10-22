import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log real errors, not Figma infrastructure errors
    if (!error.message?.includes('figma.com') && 
        !error.stack?.includes('figma.com')) {
      console.error('Application Error:', error, errorInfo);
      
      this.setState({
        error,
        errorInfo,
      });
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-white">Something went wrong</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                An unexpected error occurred in the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="text-red-400 font-mono text-sm">
                  {this.state.error.message}
                </p>
              </div>
              
              {this.state.errorInfo && (
                <details className="text-sm text-slate-400">
                  <summary className="cursor-pointer hover:text-slate-300">
                    Show error details
                  </summary>
                  <pre className="mt-2 bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-auto text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button onClick={this.handleReset} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="border-slate-700 hover:bg-slate-800"
              >
                Go to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
