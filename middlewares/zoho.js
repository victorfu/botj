const zohoMiddleware = (req, res) => {
  const body = req.body;
  const data = new URLSearchParams();
  data.append('message', `收到 ${body.sender} email (${body.fromAddress}), subject: ${body.subject}`);

  if (!body.subject.includes('dentall-SaaS is at risk of suspension')) {
    return res.status(200).end();
  }

  const token = process.env.ZOHO_TOKEN;

  fetch('https://notify-api.line.me/api/notify', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
    body: data,
  }).then(responseData => {
    res.status(200).end();
  });
};

module.exports = {
  zohoMiddleware,
};
