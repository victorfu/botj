function onClick() {}

function liffInit(liffId) {
  liff
    .init({ liffId: liffId })
    .then(() => {
      console.log(liff.getLanguage());
      console.log(liff.getVersion());
      console.log(liff.isInClient());
      console.log(liff.isLoggedIn());
      console.log(liff.getOS());
      console.log(liff.getLineVersion());

      if (liff.isLoggedIn()) {
        // const accessToken = liff.getAccessToken();
        // const settings = {
        //   async: true,
        //   url: 'https://api.line.me/v2/profile',
        //   method: 'GET',
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // };
        // $.ajax(settings).done(function (response) {
        //   $('#displayName').text(response.displayName);
        //   $('#avatar').attr('src', response.pictureUrl);
        // });

        const idToken = liff.getDecodedIDToken();
        $('#displayName').text(idToken.name);
        $('#avatar').attr('src', idToken.picture);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
