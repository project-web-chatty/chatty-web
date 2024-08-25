import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteWorkspace } from "../../api/workspace/WorkSpaceAPI";
import IconClose from "../../assets/icon/icon_close.png";
import { RootState } from "../../store/store";

interface DeleteWorkspaceProps {
  closeModal: () => void;
  title: string | null;
  workspaceId: number;
}

const DeleteWorkspace: React.FC<DeleteWorkspaceProps> = ({
  closeModal,
  title,
  workspaceId,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const onClickButton = () => {
    // Delete 전 한번 더 권한 확인하기
    if (user.workspaceRole === "ROLE_WORKSPACE_OWNER") {
      deleteWorkspace(workspaceId).then((res) => {
        if (res) {
          closeModal();
          navigate("/workspace");
        }
      });
    }
  };

  return (
    <>
      <div
        className="inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={closeModal}
      >
        <div
          className="w-[540px] h-[290px] bg-white p-8 rounded shadow-lg relative flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{title}</p>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <img src={IconClose} alt="" className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm font-bold">정말로 삭제하시겠어요?</p>
          <div className="mt-[40px]">
            <div className="flex justify-center"></div>
            <div className="flex justify-between mt-10 items-center">
              <button
                className="w-24 bg-white text-sm text-black py-1 px-5 rounded-md border-2 border-black"
                onClick={closeModal}
              >
                취소
              </button>
              <button
                className="w-24 bg-orange text-sm text-white py-1 px-5 rounded-md"
                onClick={onClickButton}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteWorkspace;
