interface ManageMembersProps {
  closeModal: () => void;
  title: string | null;
  members: any[];
}

const ManageMembers: React.FC<ManageMembersProps> = ({
  closeModal,
  title,
  members,
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
          <div>
            <div className="p-5 flex items-center bg-lightGray rounded-lg mt-3">
              <div className="flex flex-wrap gap-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center ml-2">
                    <img
                      className="w-5 h-5 rounded-xl"
                      src={member.profile}
                      alt=""
                    />
                    <p className="text-xs mx-3">{member.nickname}</p>
                    <button className="text-gray-500 hover:text-gray-700 mr-4">
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
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

export default ManageMembers;
