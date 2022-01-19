import { GraphQLClient, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const likes = async (req, res) => {
  const { name, slug } = req.body;

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
  });

  const query = gql`
    mutation MyMutaion($name: String!, $slug: String!) {
      createLike(
        data: {
          name: $name
          hasLiked: true
          post: { connect: { slug: $slug } }
        }
      ) {
        id
        name
        hasLiked
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    try {
      const id = result.createLike.id;

      const publishQuery = gql`
        mutation PublishLike($id: ID!) {
          publishLike(to: PUBLISHED, where: { id: $id }) {
            id
          }
        }
      `;

      const publishResult = await graphQLClient.request(publishQuery, { id });
      res.status(200).send(publishResult);
    } catch (error) {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default likes;
