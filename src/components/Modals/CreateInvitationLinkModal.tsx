import { useEffect, useState } from "react";
import { getWorkspaceInvitationLink } from "../../api/workspace/WorkSpaceAPI";
import IconLink from "../../assets/icon/icon_link.png";
import IconCopy from "../../assets/icon/icon_copy.png";
import IconClose from "../../assets/icon/icon_close.png";
import IconCheck from "../../assets/icon/icon_check.png";

interface CreateInvitationLinkProps {
  closeModal: () => void;
  title: string | null;
  workspaceId: number;
}

const CreateInvitationLink: React.FC<CreateInvitationLinkProps> = ({
  closeModal,
  title,
  workspaceId,
}) => {
  const [code, setCode] = useState<string>("");
  const [copyIcon, setCopyIcon] = useState(IconCopy);

  useEffect(() => {
    getWorkspaceInvitationLink(workspaceId).then(
      (res: string) => res && setCode(res)
    );
  }, []);

  // 복사 기능 구현 함수
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyIcon(IconCheck);
      setTimeout(() => setCopyIcon(IconCopy), 500);
    });
  };

  return (
    <>
      <div
        className="inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={closeModal}
      >
        <div
          className="w-[540px] h-[290px] bg-white p-8 rounded shadow-lg relative"
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
          <div className="mt-[40px]">
            <p className="text-base mb-[8px]">초대링크</p>
            <div className="flex w-full items-center ">
              <div className="flex border-2 border-black w-full p-2 rounded-md items-center mr-3">
                <input
                  type="text"
                  className="w-full text-sm focus:outline-none"
                  placeholder="초대링크를 입력해주세요."
                  value={code}
                  readOnly
                />
                <img className="w-4 h-4" src={IconLink} alt="" />
              </div>
              <div>
                {/* {copyIcon !== CheckIcon && <span>복사 완료!</span>} */}
                <img
                  className="w-4 h-4 cursor-pointer"
                  onClick={handleCopyClick}
                  src={copyIcon}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvitationLink;
