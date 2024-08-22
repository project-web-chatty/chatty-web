import React, { useState } from "react";
import icon_upload from "../../assets/icon/icon_upload.png";
import {
  updateWorkspaceDescription,
  updateWorkspaceProfileImg,
} from "../../api/workspace/WorkSpaceAPI";
import { useDispatch } from "react-redux";
import { fetchWorkspaceInfo } from "../../features/workspaceSlice";
import { AppDispatch } from "../../store/store";

interface EditWorkspaceInfoProps {
  closeModal: () => void;
  title: string | null;
  workspaceId: number;
}

const EditWorkspaceInfo: React.FC<EditWorkspaceInfoProps> = ({
  closeModal,
  title,
  workspaceId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");
  const [workspaceIcon, setWorkspaceIcon] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceDescription(e.target.value);
  };

  const submit = () => {
    if (!!workspaceDescription) {
      updateWorkspaceDescription(workspaceId, workspaceDescription).then(
        (res) => {}
      );
    }
    if (!!uploadFile) {
      updateWorkspaceProfileImg(workspaceId, uploadFile).then((res) => {
        dispatch(fetchWorkspaceInfo(workspaceId));
      });
    }
    closeModal();
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

  return (
    <>
      <div
        className="inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={closeModal}
      >
        <div
          className="w-96 bg-white p-8 rounded shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">{title}</p>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div className="py-5">
            <p className="text-sm">워크스페이스 소개</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
              placeholder="워크스페이스 소개글입니다."
              value={workspaceDescription}
              onChange={changeInput}
            />
            <div className="flex justify-between mt-5 items-center">
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
                className="bg-purple text-sm text-white py-1 px-5 rounded-md"
                onClick={submit}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditWorkspaceInfo;
