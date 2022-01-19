import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { FeaturedPosts } from "../sections";
import { getCategories, getFeaturedPosts, getPosts } from "../services";

const Home = ({ posts, categories, featuredPosts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog App with graph CMS</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <FeaturedPosts featuredPosts={featuredPosts} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.node.title} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  const categories = await getCategories();
  const featuredPosts = await getFeaturedPosts();
  return {
    props: {
      posts,
      categories,
      featuredPosts,
    },
    revalidate: 1
  };
}
