import React from "react";
import EditWorkspaceInfo from "./Modals/EditWorkspaceInfoModal";

function MenuModal({ isOpen, onClose, onMenuItemClick }: any) {
  if (!isOpen) return null; // 모달이 열려있지 않으면(null을 반환하여) 아무것도 렌더링하지 않음

  const handleItemClick = (item: string) => {
    // 메뉴 항목 클릭 시 호출되는 함수
    onMenuItemClick(item); // 클릭된 항목 이름을 onMenuItemClick 콜백 함수로 전달
  };

  const menuList = [
    { name: "채널 생성", modalTitle: "새 채널 만들기" },
    { name: "워크스페이스 정보 수정", modalTitle: "워크스페이스 정보 수정" },
    { name: "멤버 관리", modalTitle: "멤버 관리하기" },
    { name: "초대 링크", modalTitle: "초대링크 생성하기" },
    { name: "서버 나가기", modalTitle: "워크스페이스 나가기" },
    { name: "서버 삭제하기", modalTitle: "워크스페이스 삭제" },
  ];

  return (
    <div className="absolute top-16 left-28 w-64 bg-outerTab shadow-lg rounded-md">
      <ul>
        {menuList.map((menu, i) => {
          return (
            <li
              key={i}
              className="p-4 hover:text-orange cursor-pointer text-white"
              onClick={() => handleItemClick(menu.modalTitle)}
            >
              {menu.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MenuModal;
