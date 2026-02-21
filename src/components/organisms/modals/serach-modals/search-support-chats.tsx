'use client';

import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useNavigation } from '@/src/hooks/navigation/use-navigation';

// type
import { ModalProps, ChatsType, UserType } from '@/src/types/global';

// redux
import { RootState } from '@/src/store';

// ui
import MyIcon from '../../../atom/icon-components';
import EmptyColumn from '../../../atom/empty-components/empty-column';
import MyImage from '../../../atom/image-components';

// utils
import { stringSlicer } from '@/src/utils/string-slicer';

// libs
import { MessgesRead } from '@/src/libs/chat/read-message';

const SearchSupportChats = ({
  handleClose,
}: Pick<ModalProps, 'handleClose'>) => {
  // hooks
  const navigation = useNavigation();

  // redux
  const chats = useSelector((state: RootState) => state.chats.chats);

  // states
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredChats, setFilteredChats] = useState<ChatsType[]>([]);

  // functions
  const serachHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;

    setSearchValue(value);

    if (!value.trim()) {
      setFilteredChats([]);
      setOpenMenu(false);
      return;
    }

    const query = value.toLowerCase();

    const filtered = chats.filter((chat) => {
      const email = chat?.user.email?.toLowerCase() || '';
      return email.includes(query);
    });

    setFilteredChats(filtered);
    setOpenMenu(true);
  };

  const handelClear = () => {
    setSearchValue('');
    setFilteredChats([]);
    setOpenMenu(false);
  };

  const goToChat = (chatId: string) => {
    MessgesRead({ chatId: chatId, senderType: UserType.Client });

    handleClose();

    navigation.adminSupportChat(chatId);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
        Search Chat
      </h1>

      <div className="relative mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-2 shadow-md">
        <div>
          <MyIcon
            icon="tabler:zoom"
            className="absolute left-3 top-5 text-title text-primary-500"
          />

          {filteredChats.length > 0 && (
            <MyIcon
              icon="material-symbols:close-rounded"
              className="absolute right-3 top-5 cursor-pointer text-title text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-lg border-2 border-primary-400 px-8 py-2 text-bodySm shadow-md focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
          />
        </div>
      </div>

      {openMenu ? (
        filteredChats.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.user.userId}
                className="mb-4 w-full cursor-pointer rounded-lg border-2 border-warning-400 bg-gray-50 p-4 shadow-md"
                onClick={() => goToChat(chat.id)}
              >
                <div className="mb-4 flex items-center justify-start">
                  <div className="mr-4 overflow-hidden">
                    {chat?.user?.photo ? (
                      <MyImage
                        src={chat.user?.photo as string}
                        alt=""
                        fill
                        className="rounded-full object-cover"
                        wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 "
                      />
                    ) : (
                      <div className="h-[40px] w-[40px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
                    )}
                  </div>

                  <p className="text-label text-gray-600">
                    {stringSlicer({
                      string: chat.user?.email as string,
                      slice: 30,
                    })}
                  </p>
                </div>

                <div className="rounded-sm border border-gray-100 p-2 shadow-md">
                  <h6 className="break-words text-label font-semibold">
                    {stringSlicer({
                      string: chat.message.lastMessageText as string,
                      slice: 80,
                    })}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2">
            <EmptyColumn />
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchSupportChats;
