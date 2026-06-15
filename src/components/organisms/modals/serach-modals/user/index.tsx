'use client';

import { useState } from 'react';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import { ModalProps, MyUserType } from '@/src/types/global';

const SearchUsers = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<MyUserType[]>([]);
  const [user, setUser] = useState<MyUserType | null>(null);
  const [step, setStep] = useState<number>(1);

  return (
    <div className="w-full">
      <div>
        {step == 1 ? (
          <Step1
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            filteredUsers={filteredUsers}
            setFilteredUsers={setFilteredUsers}
            setUser={setUser}
            setStep={setStep}
            handleClose={handleClose!}
          />
        ) : (
          <Step2
            setStep={setStep}
            setUser={setUser}
            user={user}
            handleClose={handleClose!}
          />
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
