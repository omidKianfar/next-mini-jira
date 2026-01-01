"use client";

import { Component } from "react";

// type
import { ErrorBoundaryProps, ErrorBoundaryState } from "../type";

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // state
  state: ErrorBoundaryState = { hasError: false };

  // functions
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Global ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-screen w-full items-center justify-center text-error-500">
            Something went wrong.
          </div>
        )
      );
    }

    return this.props.children;
  }
}
