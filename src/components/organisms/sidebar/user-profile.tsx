import MyImage from "../../atom/image";
import { stringSlicer } from "../../utils/string-slicer";
import { useNavigation } from "@/src/hooks/navigation";
import { sidebarProps } from "../type";

const UserProfile = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, "user" | "setShowSidebar">) => {
  const navigation = useNavigation();

  const goProfile = () => {
    navigation.profile();
    setShowSidebar(false);
  };
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center">
      <div className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-primary-500 bg-gray-200">
        <MyImage
          src={user?.photo as string}
          alt=""
          fill={true}
          className="object-cover"
          wrapperClass="relative w-full h-full"
          onClick={goProfile}
        />
      </div>

      <p className="mt-2 capitalize text-primary-500">
        {stringSlicer({ string: user?.userName as string, slice: 60 })}
      </p>
    </div>
  );
};

export default UserProfile;
