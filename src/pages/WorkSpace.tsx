import ReactModal from "react-modal";
import GroupMenu from "../components/GroupIcon";
import { useState } from "react";
import WorkspaceForm from "../components/WorkspaceFormModal";

interface WorkSpaceProps {
  name?: string;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ name = "이동현" }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-4/5 h-full p-20 flex-col items-center justify-center">
        <h1 className="h-10 mb-5">
          <span className="hidden text-3xl font-bold text-white md:inline">
            {name} 님의&nbsp;
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
            />
            <button
              type="button"
              className="min-w-20 rounded-md bg-black p-1 text-white hover:bg-opacity-80 drop-shadow-lg"
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
