"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full bg-grey-5">
      <div className="py-10 px-4">
        <h1 className="text-2xl font-bold text-center text-grey-90 mb-10">
          The New Flanagan Flooring Portal
        </h1>

        <div className="flex flex-col small:flex-row gap-6 max-w-4xl mx-auto mb-12">
          {/* Left column - Login / Register form */}
          <div className="flex-1 border border-grey-20 bg-white">
            <div className="border-b border-grey-20 px-8 py-4">
              <h2 className="text-base text-grey-40 text-center">
                {currentView === "sign-in" ? "Returning Customer" : "Create a Trade Account"}
              </h2>
            </div>
            <div className="p-8">
              {currentView === "sign-in" ? (
                <Login setCurrentView={setCurrentView} />
              ) : (
                <Register setCurrentView={setCurrentView} />
              )}
            </div>
          </div>

          {/* Right column - Why Create a Trade Account */}
          <div className="flex-1 border border-grey-20 bg-white">
            <div className="border-b border-grey-20 px-8 py-4">
              <h2 className="text-base text-grey-40 text-center">
                Why Create A Trade Account
              </h2>
            </div>
            <div className="p-8 flex flex-col items-center text-center gap-y-5">
              <div className="w-14 h-14 text-grey-30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
              <p className="text-sm text-grey-50 leading-relaxed">
                Flanagan Flooring Distributors is a trade-only platform, exclusively
                serving flooring professionals and businesses across the UK and Ireland.
              </p>
              <p className="text-sm text-grey-50 leading-relaxed">
                By registering for an account, you&apos;ll gain access to live stock
                availability, trade-only pricing, exclusive promotions, and a fast,
                streamlined ordering experience. You can also view your order history,
                download invoices, and manage multiple delivery addresses.
              </p>
              <p className="text-sm text-grey-50 leading-relaxed">
                If you&apos;re an existing trade customer, please sign in to access your account.
              </p>
              <p className="text-sm text-grey-50 leading-relaxed">
                New trade customers can register online. Once submitted, your account
                will be reviewed and activated by our team within 1 working day.
              </p>
              <p className="text-sm text-grey-50 leading-relaxed">
                For any questions or assistance, please{" "}
                <LocalizedClientLink
                  href="/content/contact"
                  className="text-flanagan-orange hover:underline"
                >
                  contact our customer support team
                </LocalizedClientLink>
                .
              </p>
              {currentView === "sign-in" && (
                <button
                  onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                  className="mt-2 px-8 py-3 bg-flanagan-orange text-white rounded-full hover:bg-flanagan-orange-dark transition-colors duration-200 font-semibold text-sm uppercase tracking-wider"
                >
                  Apply For A Trade Account
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional info section below - matching original portal */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-xl font-bold text-grey-90 mb-6">
            Why Create A Trade Account
          </h2>
          <div className="flex flex-col gap-y-4">
            <p className="text-sm text-grey-50 leading-relaxed">
              Flanagan Flooring Distributors is a trade-only platform, exclusively serving
              flooring professionals and businesses across the UK and Ireland.
            </p>
            <p className="text-sm text-grey-50 leading-relaxed">
              By registering for an account, you&apos;ll gain access to live stock availability,
              trade-only pricing, exclusive promotions, and a fast, streamlined ordering experience.
              You can also view your order history, download invoices, and manage multiple delivery addresses.
            </p>
            <p className="text-sm text-grey-50 leading-relaxed">
              If you&apos;re an existing trade customer, please sign in to access your account.
            </p>
            <p className="text-sm text-grey-50 leading-relaxed">
              New trade customers can register online. Once submitted, your account will be reviewed and
              activated by our team within 1 working day.
            </p>
            <p className="text-sm text-grey-50 leading-relaxed">
              For any questions or assistance, please{" "}
              <LocalizedClientLink
                href="/content/contact"
                className="text-flanagan-orange hover:underline"
              >
                contact our customer support team
              </LocalizedClientLink>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
