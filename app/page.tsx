import DashboardComponent from "@/src/components/pages/dahboard";
import Layout from "./layout";

const DashboardPage: NextPageWithLayout = () => {
  return <DashboardComponent />;
};

DashboardPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
