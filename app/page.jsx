import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">IA-powered prompts</span>
      </h1>
      <p className="desc text-center">
        Prompting tool to discover and share prompts for users and what ever
      </p>
      <Feed />
    </section>
  );
};
export default Home;
