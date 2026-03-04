<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white mb-2">Posts</h2>
        <p class="text-gray-400">Manage your blog posts</p>
      </div>
      <UButton to="/admin/posts/new" color="blue" icon="i-lucide-plus"> New Post </UButton>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex gap-4">
      <UInput
        v-model="search"
        placeholder="Search posts..."
        icon="i-lucide-search"
        class="flex-1"
      />
      <USelect
        v-model="statusFilter"
        :items="['all', 'draft', 'published', 'archived']"
        class="w-40"
      />
    </div>

    <!-- Posts Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Title</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Author</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Created</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in filteredPosts"
            :key="post.id"
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 text-gray-900 dark:text-white">
              {{ post.title }}
            </td>
            <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
              {{ post.author || 'Unknown' }}
            </td>
            <td class="px-6 py-4">
              <UBadge :color="getStatusColor(post.status)">
                {{ post.status }}
              </UBadge>
            </td>
            <td class="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
              {{ formatDate(post.createdAt) }}
            </td>
            <td class="px-6 py-4 flex gap-2">
              <UButton :to="`/admin/posts/${post.id}`" variant="soft" color="blue" size="sm">
                Edit
              </UButton>
              <UButton variant="soft" color="red" size="sm" @click="deletePost(post.id)">
                Delete
              </UButton>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="posts.length === 0" class="px-6 py-12 text-center">
        <UIcon name="i-lucide-file-text" class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p class="text-gray-500 dark:text-gray-400">No posts yet. Create your first post!</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
      <div class="text-sm text-gray-400">
        Showing {{ pageStart }}-{{ pageEnd }} of {{ total }} posts
      </div>
      <div class="flex items-center gap-3">
        <USelect
          v-model="pageSize"
          :items="[5, 10, 20, 50]"
          class="w-24"
        />
        <div class="flex items-center gap-2">
          <UButton
            variant="soft"
            :disabled="page === 1"
            @click="page = page - 1"
          >
            Prev
          </UButton>
          <span class="text-sm text-gray-300">Page {{ page }} of {{ pageCount }}</span>
          <UButton
            variant="soft"
            :disabled="page >= pageCount"
            @click="page = page + 1"
          >
            Next
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Post {
  id: number
  title: string
  slug: string
  status: string
  createdAt: string
  author?: string
}

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

const search = ref('')
const statusFilter = ref('all')
const page = ref(1)
const pageSize = ref(10)

const { data: postsData, refresh } = useFetch<ApiResponse<Post[]>>('/api/admin/posts', {
  query: computed(() => ({
    page: page.value,
    limit: pageSize.value,
  })),
})

const posts = computed(() => postsData.value?.data || [])
const total = computed(() => postsData.value?.meta?.total || 0)
const pageCount = computed(() => postsData.value?.meta?.pageCount || 1)
const pageStart = computed(() => (total.value === 0 ? 0 : (page.value - 1) * pageSize.value + 1))
const pageEnd = computed(() => Math.min(page.value * pageSize.value, total.value))

watch(pageSize, () => {
  page.value = 1
})

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || post.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: 'yellow',
    published: 'green',
    archived: 'gray',
  }
  return colors[status] || 'gray'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const deletePost = async (id: number) => {
  if (!confirm('Are you sure you want to delete this post?')) return

  try {
    await $fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (error) {
    console.error('Failed to delete post:', error)
  }
}
</script>
