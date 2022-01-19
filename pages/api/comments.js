// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const comments = async (req, res) => {
  const { name, email, slug, comment } = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    try {
      const commentId = result.createComment.id;

      const publishQuery = gql`
        mutation PublishComment($id: ID!) {
          publishComment(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `;

      const publishResult = await graphQLClient.request(publishQuery, {id: commentId});
      return res.status(200).send(publishResult);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default comments;
