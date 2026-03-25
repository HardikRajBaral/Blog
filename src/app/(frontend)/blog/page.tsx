import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import SortFilter from '@/components/SortFilter'
import SearchBar from '@/components/SearchBar'

export const dynamic = 'force-dynamic'
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; search?: string }>
}) {
  const payload = await getPayload({ config })
  const { sort: sortParam, search: searchParam } = await searchParams

  const sort = sortParam ?? 'newest'
  const search = searchParam ?? ''
  const { docs: posts } = await payload.find({
    collection: 'blogs',
    sort:
      sort === 'oldest'? 'createdAt'
        : sort === 'az'? 'title'
        : sort === 'za' ? '-title'
        : '-createdAt',
    where: {
      ...(search && {
        title: { contains: search },
      }),
    },
    depth: 1,
  })

  return (
    <main className="max-w-8xl mx-auto px-6 md:px-12 lg:px-16 py-16">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-12 text-left">All Posts</h1>
      <div className=" flex items-center gap-3 mb-8 ">
        <SearchBar />
        <SortFilter />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Thumbnail */}
            {post.thumbnail && typeof post.thumbnail === 'object' ? (
              <div className="relative w-full h-48">
                <Image
                  src={post.thumbnail.url!}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              // 👇 fallback if no thumbnail
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-6 gap-4">
              {/* Title */}
              <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>
              {/* Description */}
              {post.description && (
                <p className="text-sm text-gray-500 flex-1">{post.description}</p>
              )}
              <h3 className="text-sm text-gray-500">{post.author}</h3>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                {/* Date */}
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                {/* Read more */}
                <span className="text-xs font-semibold text-blue-500 group-hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
