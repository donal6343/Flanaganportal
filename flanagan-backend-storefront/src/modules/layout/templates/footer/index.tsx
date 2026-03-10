import Image from "next/image"
import { listCategories } from "@lib/data/categories"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const productCategories = await listCategories()

  const topLevelCategories = productCategories?.filter(
    (c) => !c.parent_category
  ) || []

  return (
    <footer className="border-t border-ui-border-base w-full bg-grey-5">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-16">
          {/* Company info and newsletter */}
          <div className="flex flex-col gap-y-4 max-w-xs">
            <LocalizedClientLink
              href="/"
              className="flex items-center"
            >
              <Image
                src="/flan-logo.png"
                alt="Flanagan Flooring Distributors"
                width={180}
                height={45}
                className="h-10 w-auto brightness-0"
              />
            </LocalizedClientLink>
            <div className="mt-4">
              <span className="text-sm font-semibold text-ui-fg-base">Newsletter</span>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Enter your email here..."
                  className="flex-1 px-3 py-2 border border-ui-border-base rounded-l text-sm focus:outline-none focus:border-flanagan-orange"
                />
                <button className="px-4 py-2 bg-flanagan-orange text-white rounded-r hover:bg-flanagan-orange-dark transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-4">
            {/* Information links */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base font-semibold uppercase text-xs tracking-wider">
                Information
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/content/contact" className="hover:text-ui-fg-base">
                    Contact Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/content/why-us" className="hover:text-ui-fg-base">
                    Why Us?
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/content/brochures" className="hover:text-ui-fg-base">
                    Brochures & Downloads
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* My Account links */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base font-semibold uppercase text-xs tracking-wider">
                My Account
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/account" className="hover:text-ui-fg-base">
                    Account Overview
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/account/orders" className="hover:text-ui-fg-base">
                    Orders
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Customer Service links */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base font-semibold uppercase text-xs tracking-wider">
                Customer Service
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/content/shipping-returns" className="hover:text-ui-fg-base">
                    Shipping & Returns
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/content/terms" className="hover:text-ui-fg-base">
                    Terms & Conditions
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Social / Follow */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base font-semibold uppercase text-xs tracking-wider">
                Follow Us
              </span>
              <div className="flex gap-x-3 mt-1">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ui-fg-subtle hover:text-flanagan-orange transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ui-fg-subtle hover:text-flanagan-orange transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ui-fg-subtle hover:text-flanagan-orange transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-8 justify-between text-ui-fg-muted border-t border-ui-border-base pt-6">
          <Text className="txt-compact-small">
            &copy; {new Date().getFullYear()} Flanagan Flooring Distributors. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
