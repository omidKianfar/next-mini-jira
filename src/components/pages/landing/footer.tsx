import { MyIcon, useRouter } from '../imports';

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

        <div className="mt-4 flex items-center justify-center">
          <MyIcon
            icon="github"
            onClick={() =>
              router.push('https://github.com/omidKianfar/next-mini-jira.git')
            }
            className="mr-8 cursor-pointer text-h1 hover:text-primary-700"
          />

          <MyIcon
            icon="linkedin"
            onClick={() =>
              router.push('https://www.linkedin.com/in/kianfar-omid1990/')
            }
            className="mr-8 cursor-pointer text-h1 text-primary-500 hover:text-primary-700"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
