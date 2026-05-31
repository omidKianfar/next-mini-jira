import { useNavigation } from '@/src/hooks/navigation/use-navigation';

interface LogoProps {
  small?: boolean;
}

const Logo = ({ small }: LogoProps) => {
  const navigation = useNavigation();

  return (
    <div
      className="flex cursor-pointer items-center justify-center py-2"
      onClick={navigation.landing}
    >
      <h1
        className={`p-1 pr-1 ${small ? 'text-title' : 'text-h4'} font-bold text-warning-500 lg:${small ? 'text-h3' : 'text-h1'}`}
      >
        Mini
      </h1>

      <h1
        className={`rounded-sm bg-primary-900 px-2 font-inter ${small ? 'text-title' : 'text-h4'} font-bold text-white shadow-md lg:${small ? 'text-h3' : 'text-h1'}`}
      >
        Jira
      </h1>
    </div>
  );
};

export default Logo;
