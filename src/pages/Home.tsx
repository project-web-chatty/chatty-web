import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";
import ReactModal from "react-modal";
import IconClip from "../assets/icon/icon_clipicon.png";
import IconSearch from "../assets/icon/icon_search.png";
import IconUpload from "../assets/icon/icon_upload.png";
import IconHome from "../assets/icon/icon_home.png";
import IconUser from "../assets/icon/icon_user.png";
import ImgBasic from "../assets/image/basic_img.jpg";
import IconArrowDown from "../assets/icon/icon_arrowDown.png";
import IconMessage from "../assets/icon/icon_message.png";
import IconPlusCircle from "../assets/icon/icon_plusCircle.png";
import IconSendMessage from "../assets/icon/icon_sendMessage.png";
import {
  getWorkspaceInfo,
  getWorkspaceMembers,
  getWorkspaceChannels,
} from "../api/workspace/WorkSpaceAPI";
import { getUserInfo } from "../api/user/UserAPI";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, setRole } from "../features/userSlice";
import { fetchWorkspaceInfo } from "../features/workspaceSlice";
import { User } from "../types/user";
import { Channel, ResponseWorkspace } from "../types/workspace";
import DropdownMenu from "../components/DropdownMenu";
import DropdownItem from "../components/DropdownItem";
import ChattingContainer from "../components/ChattingContainer";
import Modal from "../components/Modal"; //기본 Modal 컴포넌트
import MenuModal from "../components/MenuModal"; //Channel Name 우측 화살표를 누르면 나오는 메뉴 Options
import ManageMembers from "../components/Modals/ManageMemberModal";
import CreateChannel from "../components/Modals/CreateChannelModal";
import LeaveWorkspace from "../components/Modals/LeaveWorkspaceModal";
import DeleteWorkspace from "../components/Modals/DeleteWorkspaceModal";
import EditWorkspaceInfo from "../components/Modals/EditWorkspaceInfoModal";
import CreateInvitationLink from "../components/Modals/CreateInvitationLinkModal";

// TODO : Response타입 정해지면 수정 필요. (현재는 임시)
interface Message {
  id: number | null;
  channelId: number;
  senderNickname: string;
  senderUsername: string;
  content: string;
  regDate: any;
}

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const { workspaceId } = state;

  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회
  const currentWorkspace = useSelector((state: RootState) => state.workspace);

  const chatEndRef = useRef<HTMLDivElement>(null); // chatEndRef ref 변수 정의
  const workspaceListRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState<string>(""); //input 상태 변수와 setInput 함수 정의
  const [client, setClient] = useState<Client | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isComposing, setIsComposing] = useState<boolean>(false); //조합상태감지를 위한 상태변수. 조합문자란, 아직 완성되지 않은 문자로, 여러 키 입력이 조합되어 최종문자가 만들어지는 과정을 말함(한글, 중국어, 일본어 등). isComposing이 적용되지 않으면, 채팅을 엔터로 입력 시, 마지막 글자가 중복되서 한번 더 채팅으로 보내짐.
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isWorkspaceListOpen, setIsWorkspaceListOpen] =
    useState<boolean>(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceListPosition, setWorkspaceListPosition] = useState({
    top: 0,
    left: 0,
  });

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
  useEffect(() => {
    dispatch(fetchUserInfo());

    if (currentWorkspace.id) {
      getWorkspaceMembers(currentWorkspace.id).then((res) => {
        if (res) {
          setMembers(() => res);
          const filteredUser = res.filter((member) => member.id === user.id)[0];
          filteredUser && dispatch(setRole(filteredUser.role));
        }
      });
    }
    localStorage.removeItem("CurrentWorkspaceId");
  }, [user.id]);

  useEffect(() => {
    let requestWorkspaceId;

    if (currentWorkspace.id) {
      requestWorkspaceId = currentWorkspace.id;
    } else {
      const isExistLocalstorageValue =
        localStorage.getItem("CurrentWorkspaceId");

      if (isExistLocalstorageValue) {
        requestWorkspaceId = parseInt(isExistLocalstorageValue);
      } else {
        requestWorkspaceId = workspaceId;
      }
    }

    dispatch(fetchWorkspaceInfo(requestWorkspaceId));
    localStorage.setItem(
      "CurrentWorkspaceId",
      JSON.stringify(requestWorkspaceId)
    );

    getWorkspaceMembers(requestWorkspaceId).then((res) => {
      if (res) {
        setMembers(() => res);
        const filteredUser = res.filter((member) => member.id === user.id)[0];
        filteredUser && dispatch(setRole(filteredUser.role));
        console.log(user);
      }
    });

    getWorkspaceChannels(parseInt(requestWorkspaceId)).then(
      (channels: Channel[]) => {
        if (channels) {
          setChannels(() => channels);
          setSelectedChannel(() => channels[0]);
        }
      }
    );
  }, [currentWorkspace.id]);

  // useEffect(() => {
  //   const savedWorkspaceId = localStorage.getItem("CurrentWorkspaceId");
  //   if (!!savedWorkspaceId) {
  //     getWorkspaceInfo(parseInt(savedWorkspaceId)).then(
  //       (workspace: ResponseWorkspace) => {
  //         dispatch(fetchWorkspaceInfo(workspace.id));
  //       }
  //     );

  //     getWorkspaceMembers(parseInt(savedWorkspaceId)).then((res) => {
  //       if (res) {
  //         setMembers(() => res);
  //         const filteredUser = res.filter((member) => member.id === user.id)[0];
  //         filteredUser && dispatch(setRole(filteredUser.role));
  //       }
  //     });

  //     getWorkspaceChannels(parseInt(savedWorkspaceId)).then(
  //       (channels: Channel[]) => {
  //         if (channels) {
  //           setChannels(() => channels);
  //           setSelectedChannel(() => channels[0]);
  //         }
  //       }
  //     );
  //   } else {
  //     getWorkspaceInfo(workspaceId).then((workspace: ResponseWorkspace) => {
  //       dispatch(fetchWorkspaceInfo(workspace.id));
  //     });
  //   }
  // }, [localStorage.getItem("CurrentWorkspaceId")]);

  useEffect(() => {
    if (!selectedChannel) return;

    const token = sessionStorage.getItem("accessToken");

    const stompClient = new Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
    });

    stompClient.onConnect = (frame) => {
      setMessages(() => []); // TODO : 채팅내역 데이터 받아와서 담아주기

      stompClient.subscribe(
        `/topic/channel.${selectedChannel.id}`,
        (message: IMessage) => {
          if (message.body) {
            setMessages((prevMessages: Message[]) => [
              ...prevMessages,
              JSON.parse(message.body),
            ]);
          }
          console.log(message);
        }
      );
    };

    stompClient.onDisconnect = () => {
      console.log("Disconnected");
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [selectedChannel]);

  //messages 상태가 변경될 때마다 chatEndRef를 이용해 스크롤을 끝으로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDeleteMember = (memberId: number) => {
    setMembers((members) => members.filter((member) => member.id !== memberId));
  };

  const handleWorkspaceSwitch = (selectedWorkspaceId?: number) => {
    if (selectedWorkspaceId) {
      getWorkspaceInfo(selectedWorkspaceId).then((res) => {
        dispatch(fetchWorkspaceInfo(selectedWorkspaceId));
      });
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

  const sendMessage = (message: string) => {
    if (client && client.connected && selectedChannel) {
      // TODO : 메세지 형식 변경됨에 따라 추가수정 필요(아래 형식은 임시로 사용한다고 함)
      const chatMessage = {
        id: selectedChannel.id,
        senderNickname: user.nickname,
        senderUsername: user.username,
        content: message,
      };

      client.publish({
        destination: `/pub/chat.message.${selectedChannel.id}`,
        body: JSON.stringify(chatMessage),
      });

      setInput("");
    }
  };

  const openWorkspaceModal = () => setIsWorkspaceModalOpen(true);

  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);

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
    setSelectedChannel(() => selectedChannel);
  };

  //키다운 핸들러(Enter 키 입력 시 메세지 전송)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing && !!input.length) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  //입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  //입력 구성 시작 핸들러
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  //입력 구성 끝 핸들러
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    setIsComposing(false);
    setInput(e.currentTarget.value);
  };

  return (
    <div className="flex">
      {/* 맨 좌측 탭 */}
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
            className="bg-white inset-x-0 bottom-0 rounded-xl mb-6"
            onClick={openWorkspaceModal}
          >
            <img className="w-10 h-10" src={IconMessage} alt="" />
          </div>
          <img
            className="inset-x-0 bottom-0 w-10 h-10 mb-6"
            src={IconHome}
            alt=""
          />
          <img className="inset-x-0 bottom-0 w-10 h-10" src={IconUser} alt="" />
        </div>
      </div>
      {/* 두번째 탭 */}
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
                className={`flex justify-between p-3 rounded ${channel.name === selectedChannel?.name ? "bg-slate-600" : "hover:bg-slate-700 cursor-pointer"}`}
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
      {/* 세번째 탭 */}
      <div
        className="bg-chatting min-h-screen flex flex-col p-6"
        style={{ width: "calc(100vw - 24rem)" }}
      >
        <div className="flex justify-between items-center pb-6">
          <p className="text-xl font-bold text-white">
            # {selectedChannel?.name}
          </p>
          <img className="w-5 h-5" src={IconSearch} alt="" />
        </div>
        <div
          id="chatContanier"
          className="px-2 overflow-y-auto"
          style={{ height: "calc(100vh - 172px)" }}
        >
          {messages.map(
            ({ id, senderUsername, senderNickname, content, regDate }) => (
              <>
                <ChattingContainer // TODO : 추후 response타입 변경에 따라 수정 필요.
                  key={id}
                  nickname={senderNickname}
                  profile=""
                  chatting={content}
                  time={regDate}
                  isMe={user.nickname === senderNickname}
                />
              </>
            )
          )}
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
          <textarea
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
      {/* 맨 좌측(첫번째)탭의 연필 로고를 클릭하면 나오는 Modal, 새 워크스페이스 만들기 모달 */}
      <Modal
        isOpen={isWorkspaceModalOpen}
        onClose={closeWorkspaceModal}
        title={"새 워크스페이스 만들기"}
      >
        <div className="py-5">
          <p className="text-sm">워크스페이스 이름</p>
          <input
            type="text"
            className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
            placeholder="이름을 정해주세요."
          />
          <p className="text-sm mt-5">소개</p>
          <input
            type="text"
            className="border-2 border-black w-full p-2 rounded-md text-sm focus:outline-none mt-2"
            placeholder="소개글을 작성해주세요."
          />
          <div className="flex justify-between mt-5 items-center">
            <div className="flex">
              <p className="text-sm">로고 업로드</p>
              <img id="clip" className="w-5 h-5 ml-5" src={IconUpload} alt="" />
            </div>
            <button className="bg-black text-sm text-white py-1 px-5 rounded-md">
              생성 하기
            </button>
          </div>
        </div>
      </Modal>
      {/* Channel Name 우측 화살표를 클릭하면 나오는 Menu Options */}
      <MenuModal
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
                title={selectedModal}
                closeModal={closeModal}
                workspaceId={currentWorkspace.id}
              />
            ),
          }[selectedModal]}
      </ReactModal>
    </div>
  );
}

export default Home;
