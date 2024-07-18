import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import icon_pencil from "../assets/icon/icon_pencil.png";
import logo_coupang from "../assets/logo/logo_coupang.png";
import logo_toss from "../assets/logo/logo_toss.png";

export interface IGroupIcon {
  icon: string;
  text: string;
  route?: string;
}

const GroupIcon = ({
  icon,
  text,
  onClick,
}: IGroupIcon & { onClick: () => void }) => (
  <div
    className="flex flex-col items-center justify-self-auto"
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-[80px] h-[80px] bg-white rounded-3xl">
      <img src={icon} alt={text} />
    </div>
    <p className="text-white text-xs font-semibold mt-2">{text}</p>
  </div>
);

const workspaces: IGroupIcon[] = [
  { icon: logo_coupang, text: "쿠팡", route: "/workspace/coupang" },
  { icon: logo_toss, text: "토스팀", route: "/workspace/toss" },
];

interface GroupMenuProps {
  openModal: () => void;
}

const GroupMenu = ({ openModal }: GroupMenuProps) => {
  const navigate = useNavigate();

  const openWorkSpace = useCallback(
    (route?: string) => {
      if (route) {
        navigate(route);
      }
    },
    [navigate]
  );

  return (
    <div className="flex flex-wrap justify-evenly items-center h-full w-full max-w-[600px] gap-5 pt-8 pb-8">
      {workspaces.map((item, index) => (
        <GroupIcon
          key={index}
          icon={item.icon}
          text={item.text}
          onClick={() => openWorkSpace(item.route)}
        />
      ))}
      <GroupIcon icon={icon_pencil} text="새 그룹 만들기" onClick={openModal} />
    </div>
  );
};

export default GroupMenu;
