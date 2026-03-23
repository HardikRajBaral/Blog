// app/blog/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blogs',
    sort: '-createdAt', 
    depth: 1,
  })

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">All Posts</h1>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
          >
            {/* Thumbnail */}
            {post.thumbnail && typeof post.thumbnail === 'object' && (
              <Image
                src={post.thumbnail.url!}
                alt={post.title}
                width={120}
                height={80}
                className="rounded-lg object-cover"
              />
            )}

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}