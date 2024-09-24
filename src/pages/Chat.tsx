import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  getWorkspaceChannels,
  getWorkspaceMembers,
} from "../api/workspace/WorkSpaceAPI";
import { User } from "../types/user";
import { Channel } from "../types/workspace";
import IconClip from "../assets/icon/icon_clipicon.png";
import IconSearch from "../assets/icon/icon_search.png";
import IconArrowDown from "../assets/icon/icon_arrowDown.png";
import IconPlusCircle from "../assets/icon/icon_plusCircle.png";
import IconSendMessage from "../assets/icon/icon_sendMessage.png";
import MenuModal from "../components/MenuModal";
import CreateChannel from "../components/Modals/CreateChannelModal";
import ManageMembers from "../components/Modals/ManageMemberModal";
import LeaveWorkspace from "../components/Modals/LeaveWorkspaceModal";
import DeleteWorkspace from "../components/Modals/DeleteWorkspaceModal";
import ChattingContainer from "../components/ChattingContainer";
import EditWorkspaceInfo from "../components/Modals/EditWorkspaceInfoModal";
import CreateInvitationLink from "../components/Modals/CreateInvitationLinkModal";
import { fetchWorkspaceInfo } from "../features/workspaceSlice";
import { fetchUserInfo } from "../features/userSlice";
import { getMessages } from "../api/chat/ChatAPI";
import { Message } from "../types/channel";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const { workspaceId } = state;
  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회
  const currentWorkspace = useSelector((state: RootState) => state.workspace);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null); // chatEndRef ref 변수 정의
  const [input, setInput] = useState<string>(""); //input 상태 변수와 setInput 함수 정의
  const [members, setMembers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isComposing, setIsComposing] = useState<boolean>(false); //조합상태감지를 위한 상태변수. 조합문자란, 아직 완성되지 않은 문자로, 여러 키 입력이 조합되어 최종문자가 만들어지는 과정을 말함(한글, 중국어, 일본어 등). isComposing이 적용되지 않으면, 채팅을 엔터로 입력 시, 마지막 글자가 중복되서 한번 더 채팅으로 보내짐.
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

  const [stompClient, setStompClient] = useState<CompatClient | null>(null);

  useEffect(() => {
    // Root에 user 상태값이 없는 경우(예_ 새로고침) 유저정보 GET해서 Root 상태에 저장하기
    if (!user.id) dispatch(fetchUserInfo());

    // Root에 workspace 상태값이 없는 경우(예_새로고침) uselocation으로 전달해준 workspaceId를 통해 get하여 root상태에 저장하기.
    if (!currentWorkspace.id) {
      if (!workspaceId) {
        navigate(`/workspace/`);
      } else {
        dispatch(fetchWorkspaceInfo(parseInt(workspaceId)));
      }
    }
  }, []);

  useEffect(() => {
    if (!currentWorkspace.id || !user.id) return;

    // current workspace id로
    // 1. workspace에 속한 멤버들 리스트 GET -> 멤버관리 모달에서 사용, 본인이 해당 워크스페이스에서 오너인지 멤버인지 확인하여 isOwner값 변경
    getWorkspaceMembers(currentWorkspace.id).then((members: User[]) => {
      if (members) {
        setMembers(() => members);
        setIsOwner(
          () =>
            members.find((member) => member.id === user.id)?.role ===
            "ROLE_WORKSPACE_OWNER"
        );
      }
    });

    // 2. workspace의 채널들 리스트 GET -> 채널 데이터 바인딩
    getWorkspaceChannels(currentWorkspace.id).then((channels: Channel[]) => {
      if (channels) {
        setChannels(() => channels);
        setCurrentChannel(() => channels[0]);
      }
    });
  }, [currentWorkspace.id, user.id]);

  useEffect(() => {
    if (!currentChannel) return;

    const token = sessionStorage.getItem("accessToken");

    const sockJS = new SockJS("http://localhost:8080/stomp/chat");
    const client = Stomp.over(sockJS);

    client.debug = () => {};
    client.heartbeat.outgoing = 0;
    client.heartbeat.incoming = 0;

    const onConnect = (frame: any) => {
      console.log("Connected! ");
      subscribeToRoom(client, currentChannel.id);
      setStompClient(client);
    };

    const onError = (error: Error) => {
      console.error("Connection error:", error);
    };

    client.activate();
    client.connect(
      {
        Authorization: `Bearer ${token}`,
        channelId: currentChannel.id,
      },
      onConnect,
      onError
    );

    return () => {
      client.disconnect(() => {
        console.log("Disconnected from the server");
      });
    };
  }, [currentChannel?.id]);

  const subscribeToRoom = (client: CompatClient, roomId: number) => {
    setMessages(() => []);
    getMessages(roomId).then((res: Message[]) => {
      setMessages(() => res.reverse());
    });

    client.subscribe(`/topic/channel.${roomId}`, (message: any) => {
      if (message.body) {
        setMessages((prevMessages: Message[]) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      }
    });
  };

  //messages 상태가 변경될 때마다 chatEndRef를 이용해 스크롤을 끝으로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDeleteMember = (memberId: number) => {
    setMembers((members) => members.filter((member) => member.id !== memberId));
  };

  const sendMessage = (message: string) => {
    if (stompClient && message && currentChannel) {
      const messageDto = {
        id: null,
        channelId: currentChannel.id,
        content: message,
      };

      stompClient.send(
        `/pub/chat.message`,
        {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          channelId: currentChannel.id,
        },
        JSON.stringify(messageDto)
      );

      setInput("");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedModal(item);
    toggleMenu();
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const handleChannelChange = (selectedChannel: Channel) => {
    setCurrentChannel(() => selectedChannel);
  };

  //키다운 핸들러(Enter 키 입력 시 메세지 전송)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      if (input.trim()) {
        sendMessage(input);
      }
      e.preventDefault();
    }
  };

  //입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //입력 구성 시작 핸들러
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  //입력 구성 끝 핸들러
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    setInput(e.currentTarget.value);
  };

  return (
    <>
      {/* Channel list */}
      <div className="w-72 min-h-screen flex flex-col justify-between bg-body py-6 px-4">
        <div>
          <div className="flex justify-between items-center w-[100%] h-[30px]">
            <p className="text-xl font-bold text-white">
              {currentWorkspace.name}
            </p>
            <div
              className="flex jusfify-center items-center h-[100%] cursor-pointer"
              onClick={toggleMenu}
            >
              <img
                className="inset-x-0 bottom-0 w-5 h-2 "
                src={IconArrowDown}
                alt=""
              />
            </div>
          </div>
          <div className="border border-white w-full mt-5 "></div>
          <div
            className="py-2 flex flex-col gap-1"
            style={{ overflowY: "auto", height: "calc(100vh - 120px)" }}
          >
            {channels?.map((channel, i) => (
              <div
                className={`flex justify-between p-3 rounded ${channel.name === currentChannel?.name ? "bg-slate-600" : "hover:bg-slate-700 cursor-pointer"}`}
                key={channel.id}
                onClick={() => handleChannelChange(channel)}
              >
                <p className="text-sm font-bold text-white"># {channel.name}</p>
                {/* <p className="text-xs text-gray">5 new messaages</p> */}
              </div>
            ))}
          </div>
          <div className="flex">
            <img className="w-5 h-5" src={IconPlusCircle} alt="" />
            <p className="text-sm text-white ml-5">채널 생성</p>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div
        className="bg-chatting min-h-screen flex flex-col p-6"
        style={{ width: "calc(100vw - 24rem)" }}
      >
        <div className="flex justify-between items-center pb-6">
          <p className="text-xl font-bold text-white">
            # {currentChannel?.name}
          </p>
          <img className="w-5 h-5" src={IconSearch} alt="" />
        </div>
        <div
          id="chatContanier"
          className="px-2 overflow-y-auto"
          style={{ height: "calc(100vh - 172px)" }}
        >
          {messages.map((message: Message, index) => (
            <ChattingContainer
              key={message.id}
              nickname={message.senderNickname}
              profile=""
              chatting={message.content}
              time={message.regDate}
              isMe={user.nickname === message.senderNickname}
            />
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="w-full h-12 bg-white flex items-center justify-between mt-6 rounded-lg px-3">
          <img id="clip" className="w-5 h-5" src={IconClip} alt="" />
          {/*
            1. onKeyDown : 키를 누르기 시작할 때 발생하는 이벤트. 키가 눌려있는 동안 여러 번 발생할 수도 있다.
            2. onKeyUp : 키를 놓을 때 발생하는 이벤트.
            3. onCompositionStart : 사용자가 텍스트 입력을 시작할 때 발생. 주로 입력기가 활성화될 대 발생하며, 다국어 입력 시 조합 문자를 입력하기 시작할 때 트리거 됨.
            4. onCompositionEnd : 사용자가 텍스트 입력을 완료했을 때 발생. 조합 문자가 완성되거나 입력이 종료될 때 트리거 됨.
          */}
          <input
            className="w-full h-12 mx-3 focus:outline-none resize-none flex-1"
            style={{ resize: "none" }}
            placeholder="메세지를 입력해주세요."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onKeyUp={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <button onClick={() => sendMessage(input)}>
            <img id="submit" className="w-5 h-5" src={IconSendMessage} alt="" />
          </button>
        </div>
      </div>

      {/* Channel Name 우측 화살표를 클릭하면 나오는 Menu Options */}
      <MenuModal
        isOwner={isOwner}
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        onMenuItemClick={handleMenuItemClick}
      />
      <ReactModal
        appElement={document.getElementById("root") as HTMLElement}
        isOpen={!!selectedModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {/* 각 Menu Options를 눌렀을 때 나오는 Modal. */}
        {selectedModal &&
          currentWorkspace.id &&
          {
            "새 채널 만들기": (
              <CreateChannel
                workspaceId={currentWorkspace.id}
                title={selectedModal}
                closeModal={closeModal}
              />
            ),
            "워크스페이스 정보 수정": (
              <EditWorkspaceInfo
                workspaceId={currentWorkspace.id}
                title={selectedModal}
                closeModal={closeModal}
              />
            ),
            "멤버 관리하기": (
              <ManageMembers
                isOwner={isOwner}
                title={selectedModal}
                closeModal={closeModal}
                workspaceId={currentWorkspace.id}
                members={members}
                isDeletedMember={(memberId: number) =>
                  handleDeleteMember(memberId)
                }
              />
            ),
            "초대링크 생성하기": (
              <CreateInvitationLink
                workspaceId={currentWorkspace.id}
                title={selectedModal}
                closeModal={closeModal}
              />
            ),
            "워크스페이스 나가기": (
              <LeaveWorkspace
                title={selectedModal}
                closeModal={closeModal}
                workspaceId={currentWorkspace.id}
              />
            ),
            "워크스페이스 삭제": (
              <DeleteWorkspace
                isOwner={isOwner}
                title={selectedModal}
                closeModal={closeModal}
                workspaceId={currentWorkspace.id}
              />
            ),
          }[selectedModal]}
      </ReactModal>
    </>
  );
}

export default Chat;
