import { useNavigate } from "react-router-dom"

export const useRedirectUser = (role) => {
  const navigate = useNavigate()

  const redirectUser = (role) => {
    switch (role) {
      case "ROLE_USER":
        navigate("/user")
        break
      case "ROLE_ADMIN":
        navigate("/admin")
        break
      default:
        navigate("/")
        break
    }
  }
  return redirectUser;
}