import React from "react";

interface CheckoutModalProps {
  message?: string;
  isSuccess?: boolean;
  handleClose: () => void;
}

class CheckoutModal extends React.Component<CheckoutModalProps> {
  render() {
    const { message = "there was an error", isSuccess = false } = this.props;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg min-w-80 text-center">
          <h2 className="text-xl font-bold mb-4">
            {isSuccess ? "Success" : "Error"}
          </h2>
          <p className="mb-6">{message}</p>
          <button
            className={`${
              isSuccess
                ? "bg-green-500 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-700"
            } text-white py-2 px-4 rounded`}
            onClick={this.props.handleClose}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default CheckoutModal;
