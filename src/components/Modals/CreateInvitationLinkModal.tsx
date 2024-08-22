import LinkLogo from "../../assets/icon/icon_link.png";
import CopyLogo from "../../assets/icon/icon_copy.png";
import { useEffect, useState } from "react";
import { getWorkspaceInvitationLink } from "../../api/workspace/WorkSpaceAPI";

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
  const [invitationLink, setInvitationLink] = useState<string>("");

  useEffect(() => {
    getWorkspaceInvitationLink(workspaceId).then(
      (res: string) => res && setInvitationLink(res)
    );
  }, []);

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
            <p className="text-sm">초대링크</p>
            <div className="flex w-full items-center mt-2">
              <div className="flex border-2 border-black w-full p-2 rounded-md items-center mr-3">
                <input
                  type="text"
                  className="w-full text-sm focus:outline-none"
                  placeholder="초대링크를 입력해주세요."
                  value={invitationLink}
                />
                <img className="w-3 h-3" src={LinkLogo} alt="" />
              </div>
              <img className="w-3 h-3" src={CopyLogo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvitationLink;
