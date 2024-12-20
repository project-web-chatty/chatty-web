import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

import GroupMenu from "../components/GroupIcon";
import WorkspaceForm from "../components/WorkspaceFormModal";
import { fetchUserInfo } from "../features/userSlice";
import { joinWorkspace } from "../api/workspace/WorkSpaceAPI";

interface WorkSpaceProps {
  name?: string;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ name: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode]: [string, any] = useState("");

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const join = () => {
    joinWorkspace(code);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-4/5 h-full p-20 flex-col items-center justify-center">
        <h1 className="h-10 mb-5">
          <span className="hidden text-3xl font-bold text-white md:inline">
            {user?.username} 님의&nbsp;
          </span>
          <span className="text-3xl font-bold text-orange">워크 스페이스</span>
        </h1>
        <GroupMenu openModal={openModal} />
        <ReactModal
          appElement={document.getElementById("root") as HTMLElement}
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <WorkspaceForm closeModal={closeModal} />
        </ReactModal>
        <div className="flex flex-col items-center justify-center w-full min-w-80">
          <p className="text-xl font-bold text-white p-8">초대 코드 입력</p>
          <div className=" flex items-center justify-center w-full max-w-md rounded-md border-2 border-black bg-white pl-5 pr-2">
            <input
              type="text"
              className="h-10 w-full focus:outline-none"
              placeholder="https://webChatty/~"
              value={code}
              onChange={changeCode}
            />
            <button
              type="button"
              className="min-w-20 rounded-md bg-black p-1 text-white hover:bg-opacity-80 drop-shadow-lg"
              onClick={join}
            >
              참여
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
