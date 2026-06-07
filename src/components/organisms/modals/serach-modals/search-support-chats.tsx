'use client';

import { ChangeEvent, lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { MessgesRead } from '@/src/libs/chat/read-message';
import { RootState } from '@/src/store';
import EmptyColumn from '@/src/components/atom/empty-components/empty-column';
import MyIcon from '@/src/components/atom/icon-components';
import { ChatsType, ModalProps, UserType } from '@/src/types/global';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';

const AdminSupportUserCard = lazy(
  () => import('@/src/components/molecule/cards/admin-support-user-card')
);

const SearchSupportChats = ({
  handleClose,
}: Pick<ModalProps, 'handleClose'>) => {
  const navigation = useNavigation();

  const chats = useSelector((state: RootState) => state?.chats?.chats);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredChats, setFilteredChats] = useState<ChatsType[]>([]);

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

    handleClose?.();
    navigation.adminSupportChat(chatId);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-subtitle font-bold text-primary-500">
        Search Chat
      </h1>

      <div className="relative mb-4">
        <div>
          <MyIcon
            icon="search"
            className="absolute left-2 top-[15px] text-subtitle text-gray-300"
          />

          {filteredChats.length > 0 && (
            <MyIcon
              icon="close"
              className="absolute right-2 top-[14px] cursor-pointer text-subtitle text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-md border-2 border-primary-500 px-8 py-2 text-bodySm text-gray-600 focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
            autoFocus
          />
        </div>
      </div>

      {openMenu ? (
        filteredChats.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div key={chat.id} className="mb-4">
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <LoadingCircle size={40} />
                    </div>
                  }
                >
                  <AdminSupportUserCard chat={chat} handleClose={handleClose} />
                </Suspense>
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
