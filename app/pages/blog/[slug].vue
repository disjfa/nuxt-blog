<template>
  <div class="container mx-auto space-y-6">
    <UButton to="/blog" variant="ghost" color="neutral" size="sm" icon="i-lucide-arrow-left">
      Back to blog
    </UButton>

    <div v-if="post" class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ post.title }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatDate(post.publishedAt || post.createdAt) }}
          <span v-if="post.author">• {{ post.author }}</span>
        </p>
      </div>

      <div class="prose dark:prose-invert max-w-none">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="renderedContent" />
      </div>
    </div>

    <div v-else class="text-sm text-gray-500 dark:text-gray-400">Post not found.</div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'

defineOptions({
  name: 'BlogPostPage',
})

interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

interface PostDetail {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  createdAt: string
  publishedAt: string | null
  author?: string | null
}

const route = useRoute()
const slug = route.params.slug as string

const { data } = useFetch<ApiResponse<PostDetail>>(`/api/posts/${slug}`)

const post = computed(() => data.value?.data || null)

const markdown = new MarkdownIt({
  linkify: true,
  breaks: true,
})

const renderedContent = computed(() => (post.value ? markdown.render(post.value.content) : ''))

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
</script>
