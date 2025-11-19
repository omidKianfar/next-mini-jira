import BoardsComponent from "@/src/components/pages/boards";
import Layout from "../layout";

const BoardsPage: NextPageWithLayout = () => {
  return <BoardsComponent />;
};

BoardsPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default BoardsPage;
