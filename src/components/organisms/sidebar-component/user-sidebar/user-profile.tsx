import { stringSlicer } from '@/src/utils/string-slicer';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import MyImage from '@/src/components/atom/image-components';
import { sidebarProps } from './type';

const UserProfile = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, 'user' | 'setShowSidebar'>) => {
  const navigation = useNavigation();

  const goProfile = () => {
    navigation.profile();
    setShowSidebar?.(false);
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center">
      <div className="flex cursor-pointer items-center justify-center overflow-hidden">
        {user?.photo ? (
          <MyImage
            src={user?.photo as string}
            alt=""
            fill
            className="rounded-full object-cover"
            wrapperClass="relative h-[80px] w-[80px] rounded-full border-2 border-gray-300 "
            onClick={goProfile}
          />
        ) : (
          <div
            className="h-[80px] w-[80px] rounded-full border-2 border-gray-300 bg-gray-200"
            onClick={goProfile}
          ></div>
        )}
      </div>

      <p className="mt-2 font-semibold text-gray-700">
        {stringSlicer({ string: user?.userName as string, slice: 15 })}
      </p>

      <hr className="mt-6 w-[200px] border border-dashed border-gray-300" />
    </div>
  );
};

export default UserProfile;
