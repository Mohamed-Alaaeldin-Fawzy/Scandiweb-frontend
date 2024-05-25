import { Component, Context } from "react";
import { Toast, ToastContextType } from "../context/ToasterContext";
import { ToastContext } from "../context/ToasterContext";

type ToastContainerState = {
  progress: { [key: string]: number };
  isMouseOver: { [key: string]: boolean };
};

class ToastContainer extends Component<{}, ToastContainerState> {
  static contextType = ToastContext as Context<ToastContextType>;
  declare context: ToastContextType;
  interval: any = null;

  state: ToastContainerState = {
    progress: {},
    isMouseOver: {},
  };

  componentDidMount() {
    this.interval = setInterval(this.updateProgress, 100);
  }

  componentDidUpdate(_prevProps: {}, prevState: ToastContainerState): void {
    if (prevState.isMouseOver !== this.state.isMouseOver) {
      this.updateProgress();
    }

    if (prevState.progress !== this.state.progress) {
      this.context.toasts.forEach((toast: Toast) => {
        if (this.state.progress[toast.id] >= 100) {
          this.context.removeToast(toast.id);
          this.setState({ ...this.state, progress: {} });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.context.toasts.forEach((toast: Toast) => {
      if (
        this.state.progress[toast.id] >= 100 &&
        !this.state.isMouseOver[toast.id]
      ) {
        this.context.removeToast(toast.id);
      }
    });

    this.setState({ ...this.state, progress: {} });
  }

  updateProgress = () => {
    this.setState((prevState) => {
      const newProgress = { ...prevState.progress };
      this.context.toasts.forEach((toast: Toast) => {
        if (newProgress[toast.id] === undefined) {
          newProgress[toast.id] = 0;
        }
        if (newProgress[toast.id] < 100 && !prevState.isMouseOver[toast.id]) {
          newProgress[toast.id] += 5;
        }
      });
      return { progress: newProgress };
    });
  };

  handleMouseOver = (toastId: string) => {
    this.setState((prevState) => ({
      isMouseOver: { ...prevState.isMouseOver, [toastId]: true },
    }));
  };

  handleMouseLeave = (toastId: string) => {
    setTimeout(() => {
      this.setState((prevState) => ({
        isMouseOver: { ...prevState.isMouseOver, [toastId]: false },
      }));
    }, 1000);
  };

  render() {
    const { toasts, removeToast } = this.context as ToastContextType;

    return (
      <div className="fixed bottom-20 left-5 z-10 flex w-72 flex-col space-y-2">
        {toasts.map((toast: Toast) => (
          <div
            key={toast.id}
            className={`flex flex-col rounded p-4 opacity-95 shadow-lg
              ${toast.type === "error" && "bg-red-500"}
              ${toast.type === "success" && "bg-green-500"}
            `}
            onMouseOver={() => this.handleMouseOver(toast.id)}
            onMouseLeave={() => this.handleMouseLeave(toast.id)}
          >
            <div className="flex items-center justify-between pb-2">
              <p className="font-bold text-white">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-zinc-200 hover:text-zinc-600"
              >
                x
              </button>
            </div>
            <div className="h-1 w-full bg-zinc-300">
              <div
                className="h-1 bg-white transition-all duration-75"
                style={{ width: `${this.state.progress[toast.id] || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ToastContainer;
