import icon_pencil from "../assets/icon/icon_pencil.png";
import GroupIcon from "../components/GroupIcon";

function FirstPage() {
  const newmember = true;
  if (newmember || true) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex w-4/5 h-full p-20 flex-col items-center justify-center">
          <div className="h-10 mb-5">
            <span className="hidden text-3xl font-bold text-white md:inline">
              이동현 님의&nbsp;
            </span>
            <span className="text-3xl font-bold text-orange">
              워크 스페이스
            </span>
          </div>
          <div className="flex flex-wrap justify-evenly items-center h-full w-full max-w-[600px] gap-5 pt-8 pb-8">
            {Array.from({ length: 1 }).map((_, index) => (
              <GroupIcon key={index} icon={icon_pencil} text="새 그룹 만들기" />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center w-full min-w-80">
            <p className="text-xl font-bold text-white p-8">초대 코드 입력</p>
            <div className="flex items-center justify-center w-full max-w-md rounded-md border-2 border-black bg-white pl-5 pr-2">
              <input
                type="text"
                className="h-10 w-full focus:outline-none"
                placeholder="https://webChatty/~"
              />
              <button
                type="button"
                className="min-w-20 rounded-md bg-black p-1 text-white"
                style={{ width: 80, marginLeft: 10 }}
              >
                참여
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FirstPage;
