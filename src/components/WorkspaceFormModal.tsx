import React, { useState } from "react";
import { useDispatch } from "react-redux";
import icon_upload from "../assets/icon/icon_upload.png";
import icon_close from "../assets/icon/icon_close.png";
import { addWorkspace } from "../features/workspaceSlice";
import { createWorkspace } from "../api/workspace/WorkSpaceAPI";

interface WorkspaceFormProps {
  closeModal: () => void;
}

const WorkspaceForm: React.FC<WorkspaceFormProps> = ({ closeModal }) => {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [workspaceIcon, setWorkspaceIcon] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceDescription(e.target.value);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setWorkspaceIcon(event.target.result as BinaryType);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFormSubmit = () => {
    setIsPreviewOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (workspaceName && workspaceDescription) {
      const newWorkspace = {
        profileImg: workspaceIcon,
        name: workspaceName,
        id: 0,
      };

      createWorkspace({
        name: workspaceName,
        description: workspaceDescription,
        file: uploadFile,
      }).then((res) => {
        if (res.data.isSuccess) {
          dispatch(addWorkspace(newWorkspace));
          closeModal();
        }
      });
    }
  };

  const handleCancelSubmit = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
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
              <input
                type="file"
                onChange={handleIconChange}
                className="hidden"
                id="icon-upload"
              />
              <label htmlFor="icon-upload">
                <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                  <img
                    className="w-auto cursor-pointer"
                    alt="업로드아이콘"
                    src={uploadFile ? workspaceIcon : icon_upload}
                  />
                </div>
              </label>
            </div>
            <button
              type="button"
              className={`min-w-20 rounded-md bg-black p-1 text-white pr-3 pl-3 hover:bg-opacity-80 drop-shadow-lg  ${
                (!workspaceName || !workspaceDescription) &&
                "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleFormSubmit}
              disabled={!workspaceName || !workspaceDescription}
            >
              생성 하기
            </button>
          </div>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-md">
            <h2 className="text-xl mb-4">이대로 진행하시겠습니까?</h2>
            <div className="flex flex-col items-center justify-self-auto p-5">
              <div className="flex items-center justify-center w-[80px] h-[80px] bg-gray bg-opacity-10 rounded-3xl">
                <img src={workspaceIcon} alt={workspaceName} />
              </div>
              <p className="text-xs font-semibold mt-2">{workspaceName}</p>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 px-4 py-2 rounded-md"
                onClick={handleCancelSubmit}
              >
                아니오
              </button>
              <button
                className="bg-blue-500 px-4 py-2 rounded-md"
                onClick={handleConfirmSubmit}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspaceForm;
