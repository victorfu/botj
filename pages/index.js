import Head from 'next/head';

export default function Home(props) {
  const { liff, liffError } = props;
  if (liff) {
    console.log(liff.getVersion());
  }

  const DisplayName = () => {
    const idToken = liff?.getDecodedIDToken();
    return (
      <div>
        <div>Name: {idToken?.name}</div>
        <img height={150} src={idToken?.picture}></img>
      </div>
    );
  };

  const onClick = () => {
    liff.login();
  };

  return (
    <div>
      <Head>
        <title>Botj</title>
      </Head>
      <DisplayName />
      <button onClick={onClick}>Login</button>
    </div>
  );
}
