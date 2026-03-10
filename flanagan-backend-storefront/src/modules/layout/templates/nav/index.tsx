import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { listCategories } from "@lib/data/categories"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchBar from "@modules/layout/components/search-bar"

export default async function Nav() {
  const [regions, locales, currentLocale, productCategories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories(),
  ])

  const topLevelCategories = productCategories?.filter(
    (c) => !c.parent_category
  ) || []

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Top bar - black background */}
      <header className="relative mx-auto bg-flanagan-dark">
        <nav className="content-container flex items-center justify-between w-full h-20">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <div className="h-full small:hidden mr-3">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <LocalizedClientLink
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              data-testid="nav-store-link"
            >
              <Image
                src="/flan-logo.png"
                alt="Flanagan Flooring Distributors"
                width={200}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Center: Search bar */}
          <div className="hidden small:flex flex-1 max-w-xl mx-8">
            <SearchBar categories={topLevelCategories} />
          </div>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-x-5 shrink-0">
            <LocalizedClientLink
              className="hidden small:flex flex-col items-center gap-y-0.5 text-white/80 hover:text-white transition-colors"
              href="/account"
              data-testid="nav-account-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-[10px]">My account</span>
            </LocalizedClientLink>
            <div className="text-white">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="text-white/80 hover:text-white flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>

      {/* Category navigation bar */}
      <div className="bg-flanagan-orange">
        <div className="content-container flex items-center">
          {/* All Categories label */}
          <div className="hidden small:flex items-center gap-x-2 pr-6 py-3 border-r border-white/30 mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span className="text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
              All Categories
            </span>
          </div>
          <ul className="flex items-center gap-x-6 overflow-x-auto no-scrollbar py-3 text-white">
            {topLevelCategories.map((category) => (
              <li key={category.id} className="whitespace-nowrap">
                <LocalizedClientLink
                  href={`/categories/${category.handle}`}
                  className="hover:text-flanagan-dark transition-colors duration-200 uppercase text-[11px] font-semibold tracking-wider"
                >
                  {category.name}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
