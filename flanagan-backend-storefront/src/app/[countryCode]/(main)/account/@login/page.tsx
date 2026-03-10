import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Flanagan Flooring Distributors | Login",
  description: "Sign in to access the Flanagan Flooring trade portal.",
}

export default function Login() {
  return <LoginTemplate />
}
