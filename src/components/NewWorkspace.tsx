function NewWorkspace() {
  return (
    <div className="flex justify-center items-center h-full w-full max-w-[600px] gap-5 m-10 p-8 bg-white">
      <div className="bg-purple h-full w-full">
        <div className="flex justify-between">
          <h2>새 워크 스페이스 만들기</h2>
          <div>X</div>
        </div>
        <div className="w-full">
          <p>워크스페이스 이름</p>
          <input
            type="text"
            className="h-10 w-full focus:outline-none max-w-md rounded-md border-2 border-black p-5"
            placeholder="팀 이름을 정해주세요."
          />
        </div>
        <div className="w-full">
          <p>소개</p>
          <input
            type="text"
            className="h-10 w-full focus:outline-none max-w-md rounded-md border-2 border-black p-5"
            placeholder="소개글을 작성해주세요."
          />
        </div>
        <div>
          <div>
            <p>로고 업로드</p>
            <img alt="업로드아이콘"></img>
          </div>
          <button
            type="button"
            className="min-w-20 rounded-md bg-black p-1 text-white"
            style={{ width: 80, marginLeft: 10 }}
          >
            생성 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewWorkspace;
