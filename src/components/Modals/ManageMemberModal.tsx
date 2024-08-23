import { User } from "../../types/user";
import IconClose from "../../assets/icon/icon_close.png";
import IconUser from "../../assets/icon/icon_user_black.svg";

interface ManageMembersProps {
  closeModal: () => void;
  title: string | null;
  members: User[];
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
          className="w-[540px] h-[290px] bg-white p-8 rounded shadow-lg relative flex flex-col "
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

          <div className="grow flex flex-col mt-[8px]">
            <div className="h-[130px] grid grid-cols-2 auto-rows-max gap-3 grow p-4 overflow-scroll bg-lightGray rounded-lg mt-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center bg-white w-full h-fit justify-between rounded-md pt-1 pr-3 pb-1 pl-2 items-center"
                >
                  <div className="w-5 h-5 rounded-xl border border-slate-900">
                    <img
                      className=""
                      src={member.profileImg ?? IconUser}
                      alt=""
                    />
                  </div>
                  <p className="text-xs mx-3 grow">{member.nickname}</p>
                  <button className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>
              ))}
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
