import icon_pencil from "../assets/icon/icon_pencil.png";
import logo_coupang from "../assets/logo/logo_coupang.png";
import logo_toss from "../assets/logo/logo_toss.png";
import { Link } from "react-router-dom";

export interface IGroupIcon {
  icon: string;
  text: string;
}

const GroupIcon = ({ icon, text }: IGroupIcon) => (
  <Link
    to={"/newworkspace"}
    className="flex flex-col items-center justify-self-auto"
  >
    <div className="flex items-center justify-center w-[80px] h-[80px] bg-white rounded-3xl">
      <img src={icon} />
    </div>
    <p className="text-white text-xs font-semibold mt-2">{text}</p>
  </Link>
);

const workspaces: IGroupIcon[] = [
  { icon: logo_coupang, text: "쿠팡" },
  { icon: logo_toss, text: "토스팀" },
];

const GroupMenu = () => {
  return (
    <div className="flex flex-wrap justify-evenly items-center h-full w-full max-w-[600px] gap-5 pt-8 pb-8">
      {workspaces.map((item, index) => (
        <GroupIcon key={index} icon={item.icon} text={item.text} />
      ))}
      <GroupIcon icon={icon_pencil} text="새 그룹 만들기" />
    </div>
  );
};

export default GroupMenu;
