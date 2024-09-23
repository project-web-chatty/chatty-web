import React, { useState } from "react";
import IconUpload from "../assets/icon/icon_upload.png";
import Modal from "../components/Modal"; //기본 Modal 컴포넌트
import NavBarComponent from "../components/NavBar";
import UserSetting from "./UserSetting";
import Chat from "./Chat";

function Home() {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [openUserSettings, setOpenUserSettings] = useState(false);

  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);

  return (
    <div className="flex">
      {/* 맨 좌측 네비게이션 */}
      <NavBarComponent
        createWorkspaceClick={() => setIsWorkspaceModalOpen((prev) => !prev)}
        userSettingsClick={() => setOpenUserSettings((prev) => !prev)}
      ></NavBarComponent>

      {/* 네비게이션 바의 연필 로고를 클릭하면 나오는 Modal, 새 워크스페이스 만들기 모달 */}
      <Modal
        isOpen={isWorkspaceModalOpen}
        onClose={closeWorkspaceModal}
        title={"새 워크스페이스 만들기"}
      >
        <div className="py-5">
          <p className="text-sm">워크스페이스 이름</p>
          <input
            type="text"
            className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
            placeholder="이름을 정해주세요."
          />
          <p className="text-sm mt-5">소개</p>
          <input
            type="text"
            className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
            placeholder="소개글을 작성해주세요."
          />
          <div className="flex justify-between mt-5 items-center">
            <div className="flex">
              <p className="text-sm">로고 업로드</p>
              <img id="clip" className="w-5 h-5 ml-5" src={IconUpload} alt="" />
            </div>
            <button className="bg-black text-sm text-white py-1 px-5 rounded-md">
              생성 하기
            </button>
          </div>
        </div>
      </Modal>

      {/* 네비게이션에서 user settings 클릭 시, UserSetting 페이지로 이동 */}
      {openUserSettings ? <UserSetting></UserSetting> : <Chat></Chat>}
    </div>
  );
}

export default Home;
