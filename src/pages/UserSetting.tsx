import { useState } from "react";
import HomeLogo from "../styles/images/home-logo.png";
import MessageLogo from "../styles/images/message-logo.png";
import UserLogo from "../styles/images/user-logo.png";

function UserSetting() {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);

  const openWorkspaceModal = () => setIsWorkspaceModalOpen(true);
  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  return (
    <div className="flex">
      <div className="w-24 min-h-screen flex flex-col justify-between bg-outerTab">
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
      <div className="bg-chatting min-h-screen w-full py-9 px-11">
        <div>
          <h2 className="text-white font-bold text-4xl">My Account</h2>
          <div className="border border-white w-full my-5"></div>
          <div className="flex bg-lightGray rounded-lg p-12">
            <div id="picture" className="h-full w-12 bg-white">
              <img />
            </div>
            <div>
              <h3 className="font-bold text-3xl">NAME</h3>
              <p>이진</p>
            </div>
            <div>
              <h3 className="font-bold text-3xl">EMAIL</h3>
              <p>abcd@gmail.com</p>
            </div>
            <div>
              <h3 className="font-bold text-3xl">NICKNAME</h3>
              <p>Lee Jin</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold text-4xl">Password</h2>
          <div className="border border-white w-full my-5 max-w-md"></div>
        </div>
        <div>
          <h2 className="text-white font-bold text-4xl">Account Setting</h2>
          <div className="border border-white w-full my-5 max-w-md"></div>
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
