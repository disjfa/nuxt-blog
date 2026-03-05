<template>
  <div class="space-y-10">
    <UPageSection>
      <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="post in posts" :key="post.id" class="h-full">
          <template #header>
            <div class="space-y-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ post.title }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatDate(post.publishedAt || post.createdAt) }}
              </p>
              <p v-if="post.author" class="text-xs text-gray-500 dark:text-gray-400">
                By {{ post.author }}
              </p>
            </div>
          </template>

          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ post.excerpt || 'Read the full post for details.' }}
          </p>

          <template #footer>
            <UButton :to="`/blog/${post.slug}`" variant="ghost" color="primary" size="sm">
              Read more
            </UButton>
          </template>
        </UCard>
      </div>

      <div v-else class="text-sm text-gray-500 dark:text-gray-400">No posts published yet.</div>
    </UPageSection>

    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500 dark:text-gray-400">Page {{ page }} of {{ pageCount }}</p>
      <div class="flex items-center gap-2">
        <UButton variant="soft" :disabled="page <= 1" @click="page = page - 1">Prev</UButton>
        <UButton variant="soft" :disabled="page >= pageCount" @click="page = page + 1">
          Next
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
  meta?: {
    total: number
    page: number
    limit: number
    pageCount: number
  }
}

interface PostSummary {
  id: number
  title: string
  slug: string
  excerpt: string | null
  createdAt: string
  publishedAt: string | null
  author?: string | null
}

const route = useRoute()
const router = useRouter()

const page = ref(Math.max(1, Number(route.query.page) || 1))
const pageSize = ref(9)

watch(
  () => route.query.page,
  (value) => {
    const next = Math.max(1, Number(value) || 1)
    if (next !== page.value) page.value = next
  }
)

watch(page, (value) => {
  router.replace({ query: { ...route.query, page: value } })
})

const { data } = useFetch<ApiResponse<PostSummary[]>>('/api/posts', {
  query: computed(() => ({
    page: page.value,
    limit: pageSize.value,
  })),
})

const posts = computed(() => data.value?.data || [])
const pageCount = computed(() => data.value?.meta?.pageCount || 1)

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
</script>
