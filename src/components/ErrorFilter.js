import React from "react";
import App from "../App";
export default class ErrorFilter extends React.Component {
  state = {
    hasError: false,
  };
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px" }}>
          <div>Sorry!</div>
          <div>An unexpected error has occurred.</div>
          <div>Please send your feedback to the email below.</div>
          <div>drrobot409@gmail.com</div>
        </div>
      );
    }
    return (
      <div>
        <App />
      </div>
    );
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
}
