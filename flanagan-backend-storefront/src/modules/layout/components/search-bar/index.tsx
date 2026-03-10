"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

type Category = {
  id: string
  name: string
  handle: string
}

type SearchBarProps = {
  categories: Category[]
}

const SearchBar = ({ categories }: SearchBarProps) => {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const params = new URLSearchParams()
    params.set("q", query.trim())
    if (selectedCategory) {
      params.set("category", selectedCategory)
    }
    router.push(`/store?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full h-10 rounded-sm overflow-hidden border border-white/20 focus-within:border-flanagan-orange transition-colors"
    >
      <div className="relative flex items-center bg-white border-r border-grey-20">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-full appearance-none bg-transparent pl-3 pr-7 text-sm text-grey-70 font-medium focus:outline-none cursor-pointer"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.handle}>
              {cat.name}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-grey-40 absolute right-2 pointer-events-none"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search store"
        className="flex-1 h-full px-4 bg-white text-sm focus:outline-none placeholder:text-grey-40"
      />
      <button
        type="submit"
        className="h-full w-11 bg-flanagan-orange hover:bg-flanagan-orange-dark transition-colors flex items-center justify-center shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar
