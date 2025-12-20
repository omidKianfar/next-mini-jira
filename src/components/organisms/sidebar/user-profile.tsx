// hooks
import { useNavigation } from "@/src/hooks/navigation";

// ui
import MyImage from "../../atom/image";

// utiles
import { stringSlicer } from "@/src/utils/string-slicer";

// type
import { sidebarProps } from "../type";

const UserProfile = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, "user" | "setShowSidebar">) => {
  // hooks
  const navigation = useNavigation();

  // functions
  const goProfile = () => {
    navigation.profile();
    setShowSidebar(false);
  };
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center">
      <div className="flex cursor-pointer items-center justify-center overflow-hidden">
        {user?.photo ? (
          <MyImage
            src={user?.photo as string}
            alt=""
            fill={true}
            className="rounded-full object-cover"
            wrapperClass="relative h-[80px] w-[80px] rounded-full border-2 border-primary-500 "
            onClick={goProfile}
          />
        ) : (
          <div
            className="h-[80px] w-[80px] rounded-full border-2 border-primary-500 bg-gray-200"
            onClick={goProfile}
          ></div>
        )}
      </div>

      <p className="mt-2 font-semibold capitalize text-primary-700">
        {stringSlicer({ string: user?.userName as string, slice: 60 })}
      </p>

      <hr className="mt-6 w-[200px] border border-dotted border-gray-300" />
    </div>
  );
};

export default UserProfile;
