import path from "path";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

export default function SocialLoginRedirection() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;

    const accessToken = url.searchParams.get("accessToken");
    const refreshToken = url.searchParams.get("refreshToken");

    if (pathname === "/oauth2/success" && !!(accessToken && refreshToken)) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      return navigate("/workspace");
    } else {
      console.log("로그인 실패");
      return navigate("/");
    }
  }, []);

  return <></>;
}
