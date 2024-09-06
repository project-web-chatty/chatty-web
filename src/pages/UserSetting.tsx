import { useState, useEffect } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import HomeLogo from "../assets/icon/icon_home.png";
import MessageLogo from "../assets/icon/icon_message.png";
import IconUser from "../assets/icon/icon_user_black.svg";
import ReactModal from "react-modal";
import ButtonModal from "../components/ButtonModal";
import PasswordEditingModal from "../components/PasswordEditingModal";
import axios from "axios";
import { useNavigate } from "react-router";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

function UserSetting() {
  const user = useSelector((state: RootState) => state.user); // 유저 상태 조회

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalSetting, setModalSetting] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();

  useEffect(() => {
    // 로그인 상태 확인
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/"); // 로그인 페이지로 리디렉션
    }
  }, [navigate]);

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
            <div id="picture" className="h-full bg-white mr-20">
              <img
                className="h-full w-full max-w-52 min-w-40"
                src={user.profileImg ?? IconUser}
                alt="프로필 이미지"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <div className="w-[8px] h-[8px] bg-green rounded-[50%] mr-1"></div>
                    <div className="text-[10px]">Online</div>
                  </div>
                  <h3 className="font-bold text-3xl min-w-52">NAME</h3>
                </div>
                <p>{user.username}</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-bold text-3xl min-w-52">NICKNAME</h3>
                <p>{user.nickname}</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-bold text-3xl min-w-52">EMAIL</h3>
                <p>{user.email ?? "-"}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
