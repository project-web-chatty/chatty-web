interface IGroupIcon {
  icon: string;
  text: string;
}

const GroupIcon = ({ icon, text }: IGroupIcon) => (
  <div className="flex flex-col items-center justify-self-auto">
    <div className="flex items-center justify-center w-[80px] h-[80px] bg-white rounded-3xl">
      <img src={icon} />
    </div>
    <p className="text-white text-xs font-semibold mt-2">{text}</p>
  </div>
);

export default GroupIcon;
