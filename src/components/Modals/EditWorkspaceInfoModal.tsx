interface EditWorkspaceInfoProps {
  closeModal: () => void;
  title: string | null;
}

const EditWorkspaceInfo: React.FC<EditWorkspaceInfoProps> = ({
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
          <div className="py-5">
            <p className="text-sm">서버 이름</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
              placeholder="이름을 정해주세요."
            />
            <div className="flex justify-end mt-5 items-center">
              <button className="bg-purple text-sm text-white py-1 px-5 rounded-md">
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
