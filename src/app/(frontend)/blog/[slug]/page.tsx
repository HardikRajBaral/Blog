// app/blog/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blogs',
    where: {
      slug: { equals: slug },
    },
    depth: 1,
  })

  const post = docs[0]
  if (!post) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link href="/blog" className="text-sm text-gray-500 hover:text-black mb-6 inline-block">
        ← Back to Blogs
      </Link>

      {/* Thumbnail */}
      {post.thumbnail && typeof post.thumbnail === 'object' && (
        <Image
          src={post.thumbnail.url!}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-xl object-cover w-full mb-8"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

      {/* Date */}
      <p className="text-sm text-gray-400 mb-8 border-b pb-4">
        {new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {/* Blog Body */}
      <article className="prose prose-lg max-w-none">
        <RichText data={post.body} />
      </article>
    </main>
  )
}
