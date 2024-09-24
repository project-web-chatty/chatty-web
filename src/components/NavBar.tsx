import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceInfo } from "../api/workspace/WorkSpaceAPI";
import { fetchWorkspaceInfo } from "../features/workspaceSlice";
import { AppDispatch, RootState } from "../store/store";
import IconHome from "../assets/icon/icon_home.png";
import IconUser from "../assets/icon/icon_user.png";
import ImgBasic from "../assets/image/basic_img.jpg";
import IconMessage from "../assets/icon/icon_message.png";
import DropdownMenu from "./DropdownMenu";
import DropdownItem from "./DropdownItem";
import { useNavigate } from "react-router";

interface NavBarProps {
  createWorkspaceClick: () => void;
  userSettingsClick: () => void;
}

const NavBarComponent: React.FC<NavBarProps> = ({
  createWorkspaceClick,
  userSettingsClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회

  const currentWorkspace = useSelector((state: RootState) => state.workspace);

  const workspaceListRef = useRef<HTMLDivElement>(null);
  const [isWorkspaceListOpen, setIsWorkspaceListOpen] =
    useState<boolean>(false);
  const [workspaceListPosition, setWorkspaceListPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleWorkspaceSwitch = (selectedWorkspaceId?: number) => {
    if (selectedWorkspaceId) {
      dispatch(fetchWorkspaceInfo(selectedWorkspaceId));
    } else {
      if (workspaceListRef.current) {
        setWorkspaceListPosition({
          top:
            workspaceListRef.current.offsetHeight +
            workspaceListRef.current.offsetTop,
          left: workspaceListRef.current.offsetLeft,
        });
      }
    }
    setIsWorkspaceListOpen((isWorkspaceListOpen) => !isWorkspaceListOpen);
  };

  const navigateToHome = () => {
    navigate(`/workspace`);
  };

  return (
    <div className="w-24 min-h-screen flex flex-col justify-between bg-outerTab">
      <div
        className="mx-auto mt-6 bg-white w-10 h-10 rounded-md  overflow-hidden cursor-pointer"
        onClick={() => handleWorkspaceSwitch()}
        ref={workspaceListRef}
      >
        <img src={currentWorkspace.profileImg ?? ImgBasic} alt="" />
      </div>
      {
        <DropdownMenu
          isOpen={isWorkspaceListOpen}
          style={{
            top: workspaceListPosition.top,
            left: workspaceListPosition.left,
          }}
        >
          {user.myWorkspaces?.map((workspace, index) => {
            return (
              <DropdownItem
                key={workspace.id}
                id={workspace.id}
                isSelected={workspace.id === currentWorkspace.id}
                name={workspace.name}
                img={workspace.profileImg ?? ImgBasic}
                onClick={(id) => handleWorkspaceSwitch(id)}
              ></DropdownItem>
            );
          })}
        </DropdownMenu>
      }
      <div className="mx-auto mb-6">
        <div
          className="bg-white inset-x-0 bottom-0 rounded-xl mb-6 cursor-pointer"
          onClick={createWorkspaceClick}
        >
          <img className="w-10 h-10" src={IconMessage} alt="" />
        </div>
        <img
          className="inset-x-0 bottom-0 w-10 h-10 mb-6 cursor-pointer"
          src={IconHome}
          alt=""
          onClick={navigateToHome}
        />
        <img
          className="inset-x-0 bottom-0 w-10 h-10 cursor-pointer"
          src={IconUser}
          alt=""
          onClick={userSettingsClick}
        />
      </div>
    </div>
  );
};

export default NavBarComponent;
