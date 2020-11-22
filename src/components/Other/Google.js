import React from "react";
import GoogleLogin from "react-google-login";

// Fetchin The Response From Google
const successGoogle = (response) => {
  console.log("Success :");
  console.log(response);
  console.log(response.profileObj);
};
// Fetchin The Response From Google
const errorGoogle = (response) => {
  console.log("Error :");
  console.log(response);
};
export default function Google() {
  return (
    <>
      <GoogleLogin
        clientId="758049090218-vdhngnim4hjs2es3h4r0moolp09n6usd.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className="btn btn-ghost"
            type="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              src={require("../../assets/images/google.png")}
              alt="Google"
            ></img>
            Log in with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={successGoogle}
        onFailure={errorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

// const logoutGoogle = (response) => {
//   console.log("Logout");
//   console.log(response);
// };
// export default function GLogout() {
//   return (
//     <div>
//       <GoogleLogout buttonText="Logout" onLogoutSuccess={logoutGoogle} />
//     </div>
//   );
// }
