import Layout from "../layout";
import SignupComponent from "@/src/components/pages/auth/signup";

const SignupPage: NextPageWithLayout = () => {
  return <SignupComponent />;
};

SignupPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default SignupPage;
