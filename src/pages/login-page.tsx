import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

const username = "";
const password = "";

const LoginPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";
  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get("username") != null;
  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>Login {from}</p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            defaultValue={username}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={password}
            required
          />
        </div>
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
};

export default LoginPage;
