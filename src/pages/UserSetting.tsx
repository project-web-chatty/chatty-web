import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ButtonModal from "../components/ButtonModal";
import { useNavigate } from "react-router";
import { updateUserInfo } from "../api/user/UserAPI";
import { fetchUserInfo } from "../features/userSlice";
import PasswordEditingModal from "../components/PasswordEditingModal";
import UploadUserProfileModal from "../components/Modals/UploadUserProfileModal";
import IconUser from "../assets/icon/icon_user_black.svg";
import IconPencil from "../assets/icon/icon_pencil.png";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

function UserSetting() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalSetting, setModalSetting] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isProfileUploadModalOpen, setIsProfileUploadModalOpen] =
    useState(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();

  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const userFields = ["name", "nickname", "introduction"];

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const handleImageClick = () => {
    setIsProfileUploadModalOpen(true);
    setIsProfileHovered(false);
  };

  const handleActiveInput = (target: "nickname" | "introduction") => {
    setInputValue("");

    switch (target) {
      case "nickname":
        setIsEditingIntroduction(false);
        setIsEditingNickname(true);
        break;
      case "introduction":
        setIsEditingIntroduction(true);
        setIsEditingNickname(false);
    }
  };

  const handleUserInfoChange = (target: "nickname" | "introduction") => {
    if (!inputValue) return;

    switch (target) {
      case "nickname":
        setIsEditingNickname(false);
        updateUserInfo({ nickname: inputValue }).then((res) => {
          if (res) {
            dispatch(fetchUserInfo());
          }
        });

        break;
      case "introduction":
        setIsEditingIntroduction(false);
        updateUserInfo({ introduction: inputValue }).then((res) => {
          if (res) {
            dispatch(fetchUserInfo());
          }
        });
    }
  };

  const openModal = (setting: string) => {
    setModalSetting(setting);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalSetting("");
  };

  // 로그아웃
  const logoutHandler = async () => {
    console.log("Logging out...");

    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await apiClient.post(
        `/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        // Access token 삭제
        sessionStorage.removeItem("accessToken");

        // 쿠키에서 refreshToken 제거
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";

        // 로그아웃 후 리디렉션
        navigate("/");
      } else {
        console.error("Logout failed: ", response.data.message);
      }
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  // 계정 삭제
  const deleteAccountHandler = async () => {
    console.log("Deleting account...");
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await apiClient.delete(`/api/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.isSuccess) {
        // Access token 삭제
        sessionStorage.removeItem("access_token");

        // 쿠키에서 refreshToken 제거
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";

        // 로그아웃 후 리디렉션
        navigate("/");
      } else {
        console.error("Logout failed: ", response.data.message);
      }
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  // 비밀번호 변경
  const passwordChangeHandler = async () => {
    console.log("Changing password...");
    try {
      const response = await apiClient.post(`/api/auth/password`, {
        oldPassword,
        newPassword,
      });
      closePasswordModal();
    } catch {}
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#2F3645",
      border: "none",
      borderRadius: "10px",
    },
  };

  return (
    <div className="flex">
      <div className="absolute left-24 flex flex-col gap-10 bg-chatting min-h-screen w-[calc(100%-96px)] py-9 px-11">
        <div className="min-w-[448px]">
          <h2 className="text-white font-bold text-4xl">My Account</h2>
          <div className="border border-white w-full my-5"></div>
          <div className="flex bg-lightGray rounded-lg p-12">
            <div className="relative flex flex-col items-center justify-center gap-4 mr-20">
              <div
                id="picture"
                className="w-[200px] h-[200px] bg-white flex items-center justify-center overflow-hidden rounded-md cursor-pointer"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
                onClick={handleImageClick}
              >
                <img
                  src={user.profileImg ?? IconUser}
                  alt="Profile"
                  className={`w-full h-full object-cover transition ${
                    isProfileHovered ? "brightness-50" : ""
                  }`}
                />
              </div>
              {isProfileHovered && (
                <span className="absolute flex items-center justify-center text-white pointer-events-none">
                  이미지 업로드
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between w-full my-2">
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-bold text-3xl min-w-[230px]">NAME</h3>
                <span className="grow pl-4">{user.username}</span>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <h3 className="font-bold text-3xl min-w-[230px]">NICKNAME</h3>
                {!isEditingNickname ? (
                  <>
                    <span className="grow pl-4">{user.nickname}</span>
                    <button
                      className="text-gray-500 w-6 h-6 hover:text-gray-700"
                      onClick={() => handleActiveInput("nickname")}
                    >
                      <img src={IconPencil} alt="" className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <div className="flex p-2 bg-slate-200 rounded-md grow">
                    <input
                      className="max-w-full grow px-2 bg-slate-200 focus:outline-none"
                      type="text"
                      placeholder={user.nickname ?? ""}
                      value={inputValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputValue(e.target.value)
                      }
                    />
                    <button
                      className={`w-max px-4 rounded-md text-white ${inputValue ? "bg-slate-600 hover:bg-opacity-50" : "bg-slate-400"}`}
                      onClick={() => handleUserInfoChange("nickname")}
                      disabled={!inputValue}
                    >
                      완료
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-bold text-3xl min-w-[230px]">
                  INTRODUCTION
                </h3>
                {!isEditingIntroduction ? (
                  <>
                    <span className="grow pl-4">
                      {user.introduction ?? "-"}
                    </span>
                    <button
                      className="text-gray-500 w-6 h-6 hover:text-gray-700"
                      onClick={() => handleActiveInput("introduction")}
                    >
                      <img src={IconPencil} alt="" className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <div className="flex p-2 bg-slate-200 rounded-md grow">
                    <input
                      className="max-w-full grow px-2 bg-slate-200 focus:outline-none"
                      type="text"
                      placeholder={user.introduction ?? ""}
                      value={inputValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputValue(e.target.value)
                      }
                    />
                    <button
                      className="w-max px-4 bg-slate-600 rounded-md text-white hover:bg-opacity-50"
                      onClick={() => handleUserInfoChange("introduction")}
                    >
                      완료
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md">
          <h2 className="text-white font-bold text-4xl">Password</h2>
          <div className="border border-white w-full my-5"></div>
          <button
            type="button"
            className="h-12 w-full rounded-lg bg-white p-2 hover:bg-opacity-50 drop-shadow-lg border-2 border-black font-semibold"
            onClick={openPasswordModal}
          >
            비밀번호 변경하기
          </button>
        </div>
        <div className="max-w-md">
          <h2 className="text-white font-bold text-4xl">Account Setting</h2>
          <div className="border border-white w-full my-5"></div>
          <div className="flex justify-between gap-5">
            <button
              onClick={() => openModal("로그아웃")}
              type="button"
              className="h-12 w-full rounded-lg bg-white p-2 hover:bg-opacity-50 drop-shadow-lg border-2 border-black font-semibold"
            >
              로그아웃
            </button>
            <button
              onClick={() => openModal("계정 삭제")}
              type="button"
              className="h-12 w-full rounded-lg p-2 hover:bg-opacity-50 drop-shadow-lg border-2 border-black bg-orange text-white font-semibold"
            >
              계정 삭제
            </button>
            <ReactModal
              appElement={document.getElementById("root") as HTMLElement}
              isOpen={isOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <ButtonModal
                setting={modalSetting}
                closeModal={closeModal}
                onConfirm={
                  modalSetting === "로그아웃"
                    ? logoutHandler
                    : deleteAccountHandler
                }
              />
            </ReactModal>
            <ReactModal
              appElement={document.getElementById("root") as HTMLElement}
              isOpen={isPasswordModalOpen}
              onRequestClose={closePasswordModal}
              style={customStyles}
            >
              <PasswordEditingModal
                closeModal={closePasswordModal}
                setting="비밀번호 수정"
                onConfirm={passwordChangeHandler}
              />
            </ReactModal>

            {/* User Profile Img 업로드 */}
            <ReactModal
              appElement={document.getElementById("root") as HTMLElement}
              isOpen={isProfileUploadModalOpen}
              onRequestClose={() => setIsProfileUploadModalOpen(false)}
              style={customStyles}
            >
              <UploadUserProfileModal
                closeModal={() => setIsProfileUploadModalOpen(false)}
              />
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
