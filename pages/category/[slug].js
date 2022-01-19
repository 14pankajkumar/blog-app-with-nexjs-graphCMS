import { useRouter } from "next/router";
import { PostCard, Categories, Loader } from "../../components";
import { getCategories, getCategoryPost } from "../../services";

const category = ({ posts, categories }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
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

export default category;

export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);
  const categories = await getCategories();

  return {
    props: {
      posts,
      categories,
    },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
