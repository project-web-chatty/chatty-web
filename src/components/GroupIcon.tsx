import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import icon_pencil from "../assets/icon/icon_pencil.png";
import basic_img from "../assets/image/basic_img.jpg";
import { getWorkspaceInfo } from "../api/workspace/WorkSpaceAPI";
import { fetchWorkspaceInfo } from "../features/workspaceSlice";
import { ResponseWorkspace } from "../types/workspace";

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
    <div className="flex items-center justify-center w-[80px] h-[80px] bg-white rounded-3xl overflow-hidden">
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
  const dispatch = useDispatch<AppDispatch>();
  const workspaces = useSelector((state: RootState) => state.user.myWorkspaces);

  const openWorkSpace = useCallback(
    (workspaceId?: number) => {
      if (!!workspaceId) {
        getWorkspaceInfo(workspaceId).then((workspace: ResponseWorkspace) => {
          dispatch(fetchWorkspaceInfo(workspace.id));
        });
        navigate(`/home`, { state: { workspaceId: workspaceId } });
      }
    },
    [navigate]
  );

  return (
    <div className="flex flex-wrap justify-evenly items-center h-full w-full max-w-[600px] gap-5 pt-8 pb-8 ">
      {workspaces?.map((workspace, index) => (
        <GroupIcon
          key={workspace.id}
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
