const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const user = async (req, res) => {
  const { photo } = req.body;
  await fetch(`${graphqlAPI}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `url=${encodeURIComponent(photo)}`,
  }).then((data) => {
    res.status(200).json(data);
  });
};

export default user;
