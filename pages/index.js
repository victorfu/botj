import Head from 'next/head';
import queryString from 'query-string';
import { lineNotifyClientId, lineNotifyRedirectUrl } from '../config';

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

  const onSendClick = () => {
    if (!liff) return;
    liff
      .sendMessages([
        {
          type: 'text',
          text: generateUrl(),
        },
      ])
      .then(() => {
        console.log('message sent');
      })
      .catch(err => {
        console.log('error', err);
      });
    // liff.closeWindow();
  };

  const generateUrl = () => {
    const data = {
      response_type: 'code',
      client_id: lineNotifyClientId,
      redirect_uri: lineNotifyRedirectUrl,
      scope: 'notify',
      state: Date.now(), // TODO: change to some useful information
    };
    return `https://notify-bot.line.me/oauth/authorize?${queryString.stringify(data)}`;
  };

  return (
    <div>
      <Head>
        <title>Botj</title>
      </Head>
      {isLoggedIn() ? <Profile /> : <LoginButton />}
      <br />
      <button onClick={onSendClick}>Send</button>
    </div>
  );
}
