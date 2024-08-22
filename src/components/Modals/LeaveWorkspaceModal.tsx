interface LeaveWorkspaceProps {
  closeModal: () => void;
  title: string | null;
}

const LeaveWorkspace: React.FC<LeaveWorkspaceProps> = ({
  closeModal,
  title,
}) => {
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
          <div className="pt-10">
            <div className="flex justify-center">
              <p className="text-sm font-bold">정말로 나가시겠어요?</p>
            </div>
            <div className="flex justify-between mt-10 items-center">
              <button className="w-24 bg-white text-sm text-black py-1 px-5 rounded-md border-2 border-black">
                취소
              </button>
              <button className="w-24 bg-orange text-sm text-white py-1 px-5 rounded-md">
                나가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveWorkspace;
