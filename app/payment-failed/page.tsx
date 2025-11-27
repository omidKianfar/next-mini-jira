import Layout from "../layout";
import PaymentFailedComponent from "@/src/components/pages/auth/signup/steps/payment-page/payment-fail";

const PaymentFailedPage: NextPageWithLayout = () => {
  return <PaymentFailedComponent />;
};

PaymentFailedPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default PaymentFailedPage;
