import React, { useState, useRef, useEffect } from "react";
import Modal from "../components/Modal";

function MenuModal({ isOpen, onClose, onMenuItemClick }: any) {
  if (!isOpen) return null;

  const handleItemClick = (item: string) => {
    onMenuItemClick(item);
  };

  return (
    <div className="absolute top-16 left-28 w-64 bg-outerTab shadow-lg rounded-md">
      <ul>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("새 채널 만들기")}
        >
          채널 생성
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("워크스페이스 이름 변경하기")}
        >
          서버 이름 변경
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("멤버 관리하기")}
        >
          멤버 관리
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("초대 링크 생성하기")}
        >
          초대 링크
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("워크스페이스 나가기")}
        >
          서버 나가기
        </li>
        <li
          className="p-4 hover:text-orange cursor-pointer text-white"
          onClick={() => handleItemClick("워크스페이스 삭제하기")}
        >
          서버 삭제
        </li>
      </ul>
    </div>
  );
}

export default MenuModal;
