import Layout from "../layout";
import PaymentSuccessComponent from "@/src/components/pages/auth/signup/steps/payment-page/payment-success";

const PaymentSuccessPage: NextPageWithLayout = () => {
  return <PaymentSuccessComponent />;
};

PaymentSuccessPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default PaymentSuccessPage;
