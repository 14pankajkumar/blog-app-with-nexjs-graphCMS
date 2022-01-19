import { PostCard, Categories } from "../../components";
import { getCategories, getCategoryPost } from "../../services";

const Category = ({ posts, categories }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const posts = await getCategoryPost(slug);
  const categories = await getCategories();

  return {
    props: {
      posts,
      categories,
    },
  };
}
