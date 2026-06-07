import { Suspense } from 'react';
import PageLoading from '@/src/components/common/page-loading';
import AboutComponent from '@/src/components/pages/about';

const AboutPage = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <AboutComponent />
    </Suspense>
  );
};

export default AboutPage;
