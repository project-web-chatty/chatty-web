import { useState } from "react";
import HomeLogo from "../assets/icon/icon_home.png";
import MessageLogo from "../assets/icon/icon_message.png";
import UserLogo from "../assets/icon/icon_profile-person.png";
import ProfileImg from "../assets/icon/icon_profile-person.png";

function UserSetting() {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);

  const openWorkspaceModal = () => setIsWorkspaceModalOpen(true);
  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  return (
    <div className="flex">
      <div className="w-24 h-screen fixed flex flex-col justify-between bg-outerTab">
        <div className="mx-auto mt-6 bg-white w-10 h-10 rounded-md"></div>
        <div className="mx-auto mb-6">
          <div
            className="bg-white inset-x-0 bottom-0 rounded-xl mb-6"
            onClick={openWorkspaceModal}
          >
            <img className="w-10 h-10" src={MessageLogo} alt="" />
          </div>
          <img
            className="inset-x-0 bottom-0 w-10 h-10 mb-6"
            src={HomeLogo}
            alt=""
          />
          <img className="inset-x-0 bottom-0 w-10 h-10" src={UserLogo} alt="" />
        </div>
      </div>
      <div className="absolute left-24 flex flex-col gap-10 bg-chatting min-h-screen w-[calc(100%-96px)] py-9 px-11 ">
        <div className="min-w-[448px]">
          <h2 className="text-white font-bold text-4xl">My Account</h2>
          <div className="border border-white w-full my-5"></div>
          <div className="flex bg-lightGray rounded-lg p-12">
            <div id="picture" className="h-full bg-white mr-20">
              <img
                className="h-full w-full max-w-52 min-w-40"
                src={ProfileImg}
                alt="프로필 미지정 이미지"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <div className="w-[8px] h-[8px] bg-green rounded-[50%] mr-1"></div>
                    <div className="text-[10px]">Online</div>
                  </div>
                  <h3 className="font-bold text-3xl min-w-52">NAME</h3>
                </div>
                <p>이진</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-bold text-3xl min-w-52">NICKNAME</h3>
                <p>Lee Jin</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-bold text-3xl min-w-52">EMAIL</h3>
                <p>abcd@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-md">
          <h2 className="text-white font-bold text-4xl">Password</h2>
          <div className="border border-white w-full my-5"></div>
          <button
            type="button"
            className="h-12 w-full rounded-lg bg-white p-2 hover:bg-opacity-50 drop-shadow-lg border-2 border-black font-semibold"
          >
            비밀번호 변경하기
          </button>
        </div>
        <div className="max-w-md">
          <h2 className="text-white font-bold text-4xl">Account Setting</h2>
          <div className="border border-white w-full my-5 "></div>
          <div className="flex justify-between gap-5">
            <button
              type="button"
              className="h-12 w-full rounded-lg bg-white p-2 hover:bg-opacity-50 drop-shadow-lg border-2 border-black font-semibold"
            >
              로그아웃
            </button>
            <button
              onClick={() => {}}
              type="button"
              className="h-12 w-full rounded-lg p-2 hover:bg-opacity-50 drop-shadow-lg border-2 border-black bg-orange text-white font-semibold"
            >
              계정 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
