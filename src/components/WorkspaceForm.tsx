import React, { useState } from "react";
import icon_upload from "../assets/icon/icon_upload.png";
import icon_close from "../assets/icon/icon_close.png";

interface WorkspaceFormProps {
  closeModal: () => void;
}

const WorkspaceForm: React.FC<WorkspaceFormProps> = ({ closeModal }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceDescription(e.target.value);
  };

  const handleFormSubmit = () => {
    // 워크스페이스 생성 로직 추가
    console.log("Workspace Name:", workspaceName);
    console.log("Workspace Description:", workspaceDescription);
    closeModal();
  };

  return (
    <div className="flex justify-center items-center max-w-[600px] min-w-[400px] gap-5 bg-white rounded-xl">
      <div className="flex flex-col justify-between items-center gap-5 m-5 w-full">
        <div className="flex justify-between items-center w-full mb-5 relative">
          <h2 className="text-2xl">새 워크 스페이스 만들기</h2>
          <img
            className="w-6 h-6 absolute -top-5 -right-5 cursor-pointer"
            alt="닫기 아이콘"
            src={icon_close}
            onClick={closeModal}
          />
        </div>
        <div className="w-full mb-3">
          <p className="mb-2">워크스페이스 이름</p>
          <input
            type="text"
            className="h-10 w-full focus:outline-none max-w-md rounded-md border-2 border-black p-5"
            placeholder="이름을 정해주세요."
            value={workspaceName}
            onChange={handleNameChange}
          />
        </div>
        <div className="w-full mb-5">
          <p className="mb-2">소개</p>
          <input
            type="text"
            className="h-10 w-full focus:outline-none max-w-md rounded-md border-2 border-black p-5"
            placeholder="소개글을 작성해주세요."
            value={workspaceDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-center items-center">
            <p className="mr-2">로고 업로드</p>
            <img
              className="w-6 cursor-pointer"
              alt="업로드아이콘"
              src={icon_upload}
            />
          </div>
          <button
            type="button"
            className="min-w-20 rounded-md bg-black p-1 text-white pr-3 pl-3 hover:bg-opacity-80 drop-shadow-lg"
            onClick={handleFormSubmit}
          >
            생성 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceForm;
