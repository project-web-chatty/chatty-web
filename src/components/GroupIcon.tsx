import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import icon_pencil from "../assets/icon/icon_pencil.png";
import basic_img from "../assets/image/basic_img.jpg";

export interface IGroupIcon {
  profileImg: string;
  name: string;
  id: number;
}

const GroupIcon: React.FC<IGroupIcon & { onClick: () => void }> = ({
  profileImg,
  name,
  onClick,
}) => (
  <div
    className="flex flex-col items-center justify-self-auto cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-[80px] h-[80px] bg-white rounded-3xl">
      <img src={profileImg} className="rounded-3xl" />
    </div>
    <p className="text-white text-xs font-semibold mt-2">{name}</p>
  </div>
);

interface GroupMenuProps {
  openModal: () => void;
}

const GroupMenu: React.FC<GroupMenuProps> = ({ openModal }) => {
  const navigate = useNavigate();
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspaces
  );

  const [workspaceList, setWorkspaceList] = useState();

  const openWorkSpace = useCallback(
    (workspaceId?: number) => {
      if (!!workspaceId) {
        navigate(`/home`);
      }
    },
    [navigate]
  );

  return (
    <div className="flex flex-wrap justify-evenly items-center h-full w-full max-w-[600px] gap-5 pt-8 pb-8 ">
      {workspaces.map((workspace, index) => (
        <GroupIcon
          key={index}
          profileImg={workspace.profileImg ?? basic_img}
          name={workspace.name}
          id={workspace.id}
          onClick={() => openWorkSpace(workspace.id)}
        />
      ))}
      <GroupIcon
        profileImg={icon_pencil}
        name="새 그룹 만들기"
        id={0}
        onClick={openModal}
      />
    </div>
  );
};

export default GroupMenu;
