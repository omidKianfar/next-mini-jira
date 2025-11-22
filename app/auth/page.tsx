import AuthPageComponent from "@/src/components/pages/auth";
import Layout from "../layout";

const AuthPage: NextPageWithLayout = () => {
  return <AuthPageComponent />;
};

AuthPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default AuthPage;
