import HomeComponent from "@/src/components/pages/home";
import Layout from "./layout";

const HomePage: NextPageWithLayout = () => {
  return <HomeComponent />;
};

HomePage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
