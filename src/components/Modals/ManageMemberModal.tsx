import { User } from "../../types/user";
import IconClose from "../../assets/icon/icon_close.png";
import IconUser from "../../assets/icon/icon_user_black.svg";
import IconMenu from "../../assets/icon/icon_menu.png";
import { useRef, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteMember } from "../../api/workspace/WorkSpaceAPI";

interface ManageMembersProps {
  isOwner: boolean;
  closeModal: () => void;
  title: string | null;
  workspaceId: number;
  members: User[];
  isDeletedMember: (memberId: number) => void;
}

const ManageMembers: React.FC<ManageMembersProps> = ({
  isOwner,
  closeModal,
  title,
  workspaceId,
  members,
  isDeletedMember,
}) => {
  const user = useSelector((state: RootState) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menu = ["프로필", "관리자 지정", "추방하기"];

  const daysAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();

    const differenceIntime = today.getTime() - date.getTime();
    const differenceInDays = Math.floor(
      differenceIntime / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      return "오늘";
    } else if (differenceInDays === 1) {
      return "1일 전";
    } else {
      return `${differenceInDays} 일 전`;
    }
  };

  const monthsAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();

    const yearDiff = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const differenceInMonths = yearDiff * 12 + monthDiff;

    if (differenceInMonths === 0) {
      return "This month";
    } else if (differenceInMonths === 1) {
      return "1 month ago";
    } else {
      return `${differenceInMonths} months ago`;
    }
  };

  const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();

    const differenceInTime = today.getTime() - date.getTime();
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    const yearDiff = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const differenceInMonths = yearDiff * 12 + monthDiff;

    if (differenceInDays < 30) {
      return daysAgo(dateString); // 30일 미만은 일 단위로
    } else {
      return monthsAgo(dateString); // 30일 이상은 월 단위로
    }
  };

  const handleRightClick = (
    event: MouseEvent<HTMLDivElement>,
    memberId: number
  ) => {
    event.preventDefault();
    setSelectedMemberId(memberId);

    setMenuPosition({
      top: event.clientY - (window.innerHeight - 300) / 2,
      left: event.clientX - (window.innerWidth - 600) / 2 - 100,
    });

    setMenuVisible((menuVisible) => !menuVisible);
  };

  const handleMenuClick = (action: string) => {
    if (action === "추방하기" && selectedMemberId) {
      deleteMember(workspaceId, selectedMemberId).then((res) => {
        if (res) {
          isDeletedMember(selectedMemberId);
          setMenuVisible(false);
        }
      });
    }
  };

  return (
    <>
      <div
        className="overflow-hidden inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={closeModal}
      >
        <div
          className="w-[600px] h-[300px] bg-white p-8 rounded shadow-lg flex flex-col gap-6"
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
          {menuVisible && (
            <div
              ref={menuRef}
              className="bg-slate-800 text-white absolute shadow-lg rounded p-1"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              <ul className="text-center">
                {menu.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="p-2 hover:bg-slate-700 text-sm cursor-pointer"
                      onClick={() => handleMenuClick(item)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <section className="flex flex-col overflow-hidden">
            <div className="text-center p-2 grid grid-cols-[36px_1fr_1fr_1fr_60px_36px] bg-slate-100 p-2 border-b border-slate-500">
              <div></div>
              <div>이름</div>
              <div>가입시기</div>
              <div>계정 생성일</div>
              <div>역할</div>
              <div></div>
            </div>
            <div className="overflow-scroll">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="text-center p-2 grid grid-cols-[36px_1fr_1fr_1fr_60px_36px] bg-slate-100 p-2"
                >
                  <div className="w-full flex items-center justify-center">
                    <img
                      className="w-5"
                      src={member.profileImg ?? IconUser}
                      alt=""
                    />
                  </div>
                  <div>{member.nickname}</div>
                  <div>{member.joinDate && timeAgo(member.joinDate)}</div>
                  <div>{timeAgo(member.createdDate)}</div>
                  <div>
                    {member.role === "ROLE_WORKSPACE_OWNER" ? "오너" : "멤버"}
                  </div>
                  <div className="w-full flex items-center justify-center">
                    {isOwner && (
                      <img
                        className="w-3 cursor-pointer"
                        src={IconMenu}
                        alt=""
                        onClick={(e) => handleRightClick(e, member.id)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ManageMembers;
