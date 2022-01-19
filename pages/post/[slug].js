import {
  Categories,
  PostDetail,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { getPostDetails, getCategories, getComments } from "../../services";
import { AdjacentPosts } from "../../sections";

const Post = ({ post, categories, comments }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          <CommentsForm slug={post.slug} />
          <Comments comments={comments} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const data = await getPostDetails(slug);
  const categories = await getCategories();
  const comments = await getComments(slug);
  return {
    props: {
      post: data,
      categories,
      comments,
    },
  };
}
