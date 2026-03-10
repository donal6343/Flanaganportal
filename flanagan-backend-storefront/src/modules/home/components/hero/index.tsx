import Image from "next/image"
import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="w-full border-b border-ui-border-base relative bg-flanagan-dark">
      <div className="content-container py-16 small:py-24">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <Image
            src="/flan-logo.png"
            alt="Flanagan Flooring Distributors"
            width={280}
            height={70}
            className="h-16 w-auto"
          />
          <Heading
            level="h1"
            className="text-3xl leading-10 text-white font-semibold"
          >
            The Flanagan Flooring Portal
          </Heading>
          <p className="text-base text-grey-30 max-w-lg">
            Flanagan Flooring Distributors is a trade-only platform, exclusively
            serving flooring professionals and businesses across the UK and Ireland.
          </p>
          <div className="flex gap-4 mt-4">
            <LocalizedClientLink
              href="/account"
              className="px-6 py-3 bg-flanagan-orange text-white rounded hover:bg-flanagan-orange-dark transition-colors duration-200 font-medium text-sm"
            >
              Sign In
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="px-6 py-3 border border-grey-60 text-white rounded hover:bg-grey-80 transition-colors duration-200 font-medium text-sm"
            >
              Browse Products
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
