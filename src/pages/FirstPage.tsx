import ReactModal from "react-modal";
import GroupMenu from "../components/GroupIcon";
import NewWorkspace from "../components/NewWorkspace";
import { useState } from "react";

function FirstPage({ name = "이동현" }: any) {
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
      width: "600px",
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
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <NewWorkspace closeModal={closeModal} />
        </ReactModal>
        <div className="flex flex-col items-center justify-center w-full min-w-80">
          <p className="text-xl font-bold text-white p-8">초대 코드 입력</p>
          <div className="flex items-center justify-center w-full max-w-md rounded-md border-2 border-black bg-white pl-5 pr-2">
            <input
              type="text"
              className="h-10 w-full focus:outline-none"
              placeholder="https://webChatty/~"
            />
            <button
              type="button"
              className="min-w-20 rounded-md bg-black p-1 text-white"
              style={{ width: 80, marginLeft: 10 }}
            >
              참여
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FirstPage;
