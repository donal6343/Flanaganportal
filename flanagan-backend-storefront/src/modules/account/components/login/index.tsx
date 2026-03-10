import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full flex flex-col"
      data-testid="login-page"
    >
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-5">
          <div>
            <label className="block text-sm font-bold text-grey-90 mb-2">
              Email:
            </label>
            <input
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="email-input"
              className="w-full h-11 px-3 border border-grey-30 rounded-none text-sm focus:outline-none focus:border-flanagan-orange bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-grey-90 mb-2">
              Password:
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
              className="w-full h-11 px-3 border border-grey-30 rounded-none text-sm focus:outline-none focus:border-flanagan-orange bg-white"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <label className="flex items-center gap-x-2 text-sm text-grey-50 cursor-pointer">
            <input type="checkbox" className="border-grey-30 rounded-none" />
            Remember me?
          </label>
          <LocalizedClientLink
            href="/account/forgot-password"
            className="text-sm text-grey-50 hover:text-flanagan-orange"
          >
            Forgot password?
          </LocalizedClientLink>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <div className="flex justify-center mt-8">
          <SubmitButton
            data-testid="sign-in-button"
            className="!bg-flanagan-orange hover:!bg-flanagan-orange-dark !rounded-full !px-10 !py-3 !text-sm !font-semibold !uppercase !tracking-wider"
          >
            Log In
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default Login
