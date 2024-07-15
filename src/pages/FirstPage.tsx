import GroupMenu from "../components/GroupIcon";
import NewWorkspace from "../components/NewWorkspace";

function FirstPage({ name = "이동현" }: any) {
  const newmember = true;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-4/5 h-full p-20 flex-col items-center justify-center">
        <h1 className="h-10 mb-5">
          <span className="hidden text-3xl font-bold text-white md:inline">
            {name} 님의&nbsp;
          </span>
          <span className="text-3xl font-bold text-orange">워크 스페이스</span>
        </h1>
        {/* <GroupMenu /> */}
        <NewWorkspace />
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
export default FirstPage;
