import React from "react";

interface ButtonModalProps {
  closeModal: () => void;
  setting: string;
  onConfirm: () => void;
}

const ButtonModal: React.FC<ButtonModalProps> = ({
  closeModal,
  setting,
  onConfirm,
}) => {
  const buttonLabel = setting === "로그아웃" ? "로그아웃" : "계정 삭제";

  return (
    <div className="flex justify-center items-center bg-body py-10 px-14">
      <div className="flex flex-col justify-between items-center w-full gap-10">
        <div>
          <p className="text-white text-3xl">정말로 {setting}하시겠어요?</p>
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
            className="min-w-28 rounded-md bg-orange px-5 py-2 text-white hover:bg-opacity-80 drop-shadow-lg font-semibold"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonModal;
