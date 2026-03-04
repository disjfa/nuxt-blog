<template>
  <div class="container mx-auto">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Dashboard</h2>
      <p class="text-gray-400">Welcome to your blog admin panel</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Total Posts</p>
            <p class="text-3xl font-bold text-white mt-2">{{ stats.posts }}</p>
          </div>
          <UIcon name="i-lucide-file-text" class="w-10 h-10 text-blue-500" />
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Categories</p>
            <p class="text-3xl font-bold text-white mt-2">{{ stats.categories }}</p>
          </div>
          <UIcon name="i-lucide-tags" class="w-10 h-10 text-green-500" />
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Authors</p>
            <p class="text-3xl font-bold text-white mt-2">{{ stats.authors }}</p>
          </div>
          <UIcon name="i-lucide-users" class="w-10 h-10 text-purple-500" />
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Comments</p>
            <p class="text-3xl font-bold text-white mt-2">{{ stats.comments }}</p>
          </div>
          <UIcon name="i-lucide-message-square" class="w-10 h-10 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 class="text-xl font-bold text-white mb-4">Database Status</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-gray-300">Database Connection</span>
          <div class="flex items-center gap-2">
            <div v-if="dbStatus" class="w-3 h-3 bg-green-500 rounded-full" />
            <div v-else class="w-3 h-3 bg-red-500 rounded-full" />
            <span :class="dbStatus ? 'text-green-500' : 'text-red-500'">
              {{ dbStatus ? 'Connected' : 'Disconnected' }}
            </span>
          </div>
        </div>
        <p v-if="dbMessage" class="text-sm text-gray-400">{{ dbMessage }}</p>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-bold text-white mb-4">Quick Actions</h3>
      <div class="flex flex-wrap gap-3">
        <UButton to="/admin/posts">
          <UIcon name="i-lucide-plus" class="w-4 h-4" />
          New Post
        </UButton>
        <UButton to="/admin/categories" color="success">
          <UIcon name="i-lucide-plus" class="w-4 h-4" />
          New Category
        </UButton>
        <UButton to="/admin/authors" color="warning">
          <UIcon name="i-lucide-plus" class="w-4 h-4" />
          New Author
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

interface Stats {
  posts: number
  categories: number
  authors: number
  comments: number
}

const { data: healthData } = useFetch<ApiResponse<unknown>>('/api/health')
const { data: statsData } = useFetch<ApiResponse<Stats>>('/api/admin/stats')

const stats = computed(() => ({
  posts: statsData.value?.data?.posts || 0,
  categories: statsData.value?.data?.categories || 0,
  authors: statsData.value?.data?.authors || 0,
  comments: statsData.value?.data?.comments || 0,
}))

const dbStatus = computed(() => healthData.value?.status === 'success' || false)
const dbMessage = computed(() => healthData.value?.message || '')
</script>
