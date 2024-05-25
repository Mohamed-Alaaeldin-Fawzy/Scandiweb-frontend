import { Component, createContext, ReactNode } from "react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id?: string) => void;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

class ToastProvider extends Component<
  { children: ReactNode },
  { toasts: Toast[] }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      toasts: [],
    };
  }

  addToast = (toast: Toast) => {
    this.setState((prevState) => ({
      toasts: [...prevState.toasts, toast],
    }));
  };

  removeToast = (id?: string) => {
    this.setState((prevState) => ({
      toasts: prevState.toasts.filter((toast) => toast.id !== id),
    }));
  };

  render() {
    const contextValue = {
      addToast: this.addToast,
      removeToast: this.removeToast,
      toasts: this.state.toasts,
    };

    return (
      <ToastContext.Provider value={contextValue}>
        {this.props.children}
      </ToastContext.Provider>
    );
  }
}

export { ToastProvider, ToastContext };
