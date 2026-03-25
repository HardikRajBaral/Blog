import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import SortFilter from '@/components/SortFilter'
import Pagination from '@/components/Pagination'
export const dynamic = 'force-dynamic'

export default async function HomePage({searchParams}:{searchParams:Promise<{sort?:string,search?:string,page?:string}>}) {
  
  const payload = await getPayload({ config })
  const {sort:sortParam,search:searchParam,page:pageParam}=await searchParams
  const sort = sortParam ?? 'newest'
  const search = searchParam ?? ''
  const page=Number(pageParam) || 1
  const { docs: posts ,totalPages} = await payload.find({
    collection: 'blogs',
    limit: 4,
    depth: 1,
    page:page,
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
  })

  return (
    <main className="max-w-8xl mx-auto px-6 md:px-12 lg:px-16 py-16">  {/* 👈 added this */}
      
      <h1 className="text-5xl font-bold mb-12 text-left">Latest Posts</h1>
      <div className="flex items-center gap-3 mb-8 ">
        <SearchBar />
        <SortFilter/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col h-full rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Thumbnail */}
            {post.thumbnail && typeof post.thumbnail === 'object' ? (
              <div className="relative w-full h-48 shrink-0">
                <Image
                  src={post.thumbnail.url!}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-full h-48 shrink-0 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-6 gap-3">

              {/* Title */}
              <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>

              {/* Description */}
              {post.description && (
                <p className="text-sm text-gray-500 flex-1">
                  {post.description}
                </p>
              )}
              <h3 className='text-sm text-gray-500'>{post.author}</h3>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <span className="text-xs font-semibold text-blue-500 group-hover:underline">
                  Read more →
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages}/>
    </main>
  )
}
