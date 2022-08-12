import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "antd";
import Input from "@iso/components/uielements/input";
import Checkbox from "@iso/components/uielements/checkbox";
import IntlMessages from "@iso/components/utility/intlMessages";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
import ApiAction from "@api/action";
import { formError } from "@api/form";
import SignInStyleWrapper from "./SignIn.styles";

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  let { from } = location.state || { from: { pathname: "/dashboard" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const onFinish = async (values) => {
    const { result, data } = await ApiAction.post("auth/sign-in", {
      email: values.email,
      password: values.password,
      role: "admin",
    });
    if (result) {
      const accessToken = data.data.accessToken;
      dispatch(login(accessToken));
      dispatch(clearMenu());
      history.push("/dashboard/payment-manage");
      return;
    }
    formError(form, values, "email", data);
  };

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <Form form={form} onFinish={onFinish}>
              <div className="isoInputWrapper">
                <Form.Item name="email" rules={[{ required: true }]}>
                  <Input
                    size="large"
                    type="email"
                    placeholder="Email"
                    autoComplete="true"
                  />
                </Form.Item>
              </div>

              <div className="isoInputWrapper">
                <Form.Item name="password" rules={[{ required: true }]}>
                  <Input
                    size="large"
                    type="password"
                    placeholder="Password"
                    autoComplete="false"
                  />
                </Form.Item>
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
              </div>
              <div className="isoInputWrapper isoOtherLogin">
                <button type="submit" className="btnAuthZero">
                  <IntlMessages id="page.signInButton" />
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
