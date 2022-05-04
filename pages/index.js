import Head from 'next/head';

export default function Home(props) {
  const { liff, liffError } = props;

  const isLoggedIn = () => {
    return liff?.isLoggedIn();
  };

  const Profile = () => {
    const idToken = liff?.getDecodedIDToken();
    return (
      <div>
        <div>Name: {idToken?.name}</div>
        <img height={150} src={idToken?.picture}></img>
        <div>
          <LogoutButton />
        </div>
      </div>
    );
  };

  const onLoginClick = () => {
    liff.login();
  };

  const onLogoutClick = () => {
    liff.logout();
    location?.reload();
  };

  const LoginButton = () => {
    return <button onClick={onLoginClick}>Login</button>;
  };

  const LogoutButton = () => {
    return <button onClick={onLogoutClick}>Logout</button>;
  };

  return (
    <div>
      <Head>
        <title>Botj</title>
      </Head>
      {isLoggedIn() ? <Profile /> : <LoginButton />}
    </div>
  );
}
