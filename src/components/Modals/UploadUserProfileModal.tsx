import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateUserProfileImg } from "../../api/user/UserAPI";
import { fetchUserInfo, UserState } from "../../features/userSlice";
import IconUpload from "../../assets/icon/icon_upload_white.png";

interface UploadUserProfileProps {
  closeModal: () => void;
}

const UploadUserProfileModal: React.FC<UploadUserProfileProps> = ({
  closeModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [profileImg, setProfileImg] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const submit = () => {
    if (!!uploadFile) {
      updateUserProfileImg(uploadFile).then((res) => {
        dispatch(fetchUserInfo());
      });
    }
    closeModal();
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImg(event.target.result as BinaryType);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="w-[400px] h-[400px] bg-body py-6 px-8 flex flex-col items-center justify-between gap-4">
      <span className="text-3xl font-bold text-white">
        프로필 이미지 업로드
      </span>

      <div className="bg-slate-800 w-full h-[200px] rounded flex items-center justify-center">
        {profileImg ? (
          <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
            <img
              className="h-full cursor-pointer"
              alt="profile-img"
              src={profileImg}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="mr-2 text-white">파일 선택하기</p>
            <input
              type="file"
              onChange={handleIconChange}
              className="hidden"
              id="icon-upload"
              accept=".jpg, .png, .gif, .jpeg"
            />
            <label htmlFor="icon-upload">
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                <img
                  className="w-auto cursor-pointer"
                  alt="업로드아이콘"
                  src={IconUpload}
                />
              </div>
            </label>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <button
          onClick={closeModal}
          className="min-w-28 w-full rounded-md bg-white px-5 py-2 hover:bg-opacity-80 drop-shadow-lg font-semibold"
        >
          취소
        </button>
        <button
          className="min-w-28 w-full rounded-md bg-purple px-5 py-2 text-white hover:bg-opacity-80 drop-shadow-lg font-semibold"
          onClick={submit}
        >
          변경하기
        </button>
      </div>
    </div>
  );
};

export default UploadUserProfileModal;
