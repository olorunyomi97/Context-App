import React from "react";
import SocialLogin from "react-social-login";

//image
import googleIcon from "assets/icons/google.png";

class GoogleButton extends React.Component {
  render() {
    return (
      <button
        className="social-btn btn bg-grey black-text text-base font-semibold py-3 w-full rounded"
        //@ts-ignore
        onClick={this.props.triggerLogin}
        {...this.props}
      >
        <div className="flex justify-center items-center">
          <img
            className="mr-2"
            src={googleIcon}
            alt=""
            width={20}
            height={10}
          />

          {this.props["children"]}
        </div>
      </button>
    );
  }
}

export default SocialLogin(GoogleButton);
