import { useRouter } from 'next/navigation';
import MyIcon from '../../atom/icon-components';

const FooterComponent = () => {
  const router = useRouter();

  return (
    <footer className="border-t border-gray-100 bg-white py-6 text-center">
      <div className="mx-auto max-w-[500px] px-4">
        <p className="text-gray-400">
          © 2026 <span className="text-gray-900">Mini Jira</span>. Crafted with
          passion by
          <span className="ml-1 font-bold text-gray-500">Omid Kianfar</span>.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
