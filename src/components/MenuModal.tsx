import React, { useState, useRef, useEffect } from "react";
import Modal from "../components/Modal";

function MenuModal({ isOpen, onClose, onMenuItemClick }: any) {
  if (!isOpen) return null; // 모달이 열려있지 않으면(null을 반환하여) 아무것도 렌더링하지 않음

  const handleItemClick = (item: string) => {
    // 메뉴 항목 클릭 시 호출되는 함수
    onMenuItemClick(item); // 클릭된 항목 이름을 onMenuItemClick 콜백 함수로 전달
  };

  return (
    <div className="absolute top-16 left-28 w-64 bg-outerTab shadow-lg rounded-md">
      <ul>
        {/* 목록 시작 */}
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("새 채널 만들기")}
          // 클릭 시 "새 채널 만들기" 항목 전달
        >
          채널 생성
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("워크스페이스 이름 변경하기")}
          // 클릭 시 "워크스페이스 이름 변경하기" 항목 전달
        >
          서버 이름 변경
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("멤버 관리하기")}
          // 클릭 시 "멤버 관리하기" 항목 전달
        >
          멤버 관리
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("초대링크 생성하기")}
          // 클릭 시 "초대링크 생성하기" 항목 전달
        >
          초대 링크
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("워크스페이스 나가기")}
          // 클릭 시 "워크스페이스 나가기" 항목 전달
        >
          서버 나가기
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("워크스페이스 삭제하기")}
          // 클릭 시 "워크스페이스 삭제하기" 항목 전달
        >
          서버 삭제
        </li>
      </ul>
    </div>
  );
}

export default MenuModal;
