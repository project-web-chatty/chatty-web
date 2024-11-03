import React from "react";

interface PasswordEditingModalProps {
  closeModal: () => void;
  setting: string;
  onConfirm: () => void;
}

const PasswordEditingModal: React.FC<PasswordEditingModalProps> = ({
  closeModal,
  setting,
  onConfirm,
}) => {
  const buttonLabel = setting === "로그아웃" ? "로그아웃" : "계정 삭제";

  return (
    <div className="flex justify-center items-center bg-body py-10 px-14">
      <div className="flex flex-col justify-between items-center w-full gap-10">
        <div>
          <p className="text-white text-3xl">비밀번호 수정하기</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex">
            <p className="min-w-48 text-white ">현재 비밀번호</p>
            <input type="password" className="rounded-md w-44 px-2" />
          </div>
          <div className="flex">
            <p className="min-w-48 text-white">새로운 비밀번호</p>
            <input type="password" className="rounded-md w-44 px-2" />
          </div>
          <div className="flex">
            <p className="min-w-48 text-white">새로운 비밀번호 확인</p>
            <input type="password" className="rounded-md w-44 px-2" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            onClick={closeModal}
            type="button"
            className="min-w-28 rounded-md bg-white px-5 py-2 hover:bg-opacity-80 drop-shadow-lg font-semibold"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="min-w-28 rounded-md bg-purple px-5 py-2 text-white hover:bg-opacity-80 drop-shadow-lg font-semibold"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditingModal;
