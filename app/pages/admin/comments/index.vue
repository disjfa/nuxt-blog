<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white mb-2">Comments</h2>
        <p class="text-gray-400">Moderate blog comments</p>
      </div>
    </div>

    <!-- Status Filter -->
    <div class="mb-6">
      <USelect
        v-model="statusFilter"
        :options="['all', 'pending', 'approved', 'spam']"
        placeholder="Filter by status"
        class="w-40"
      />
    </div>

    <!-- Comments Table -->
    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-700 border-b border-gray-600">
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Author</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Post</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Content</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Status</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Date</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="comment in filteredComments"
            :key="comment.id"
            class="border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4">
              <div class="text-white font-medium">
                {{ comment.authorName }}
              </div>
              <div class="text-gray-400 text-sm">
                {{ comment.authorEmail }}
              </div>
            </td>
            <td class="px-6 py-4 text-gray-300">
              {{ comment.postTitle }}
            </td>
            <td class="px-6 py-4 text-gray-400 max-w-xs truncate">
              {{ comment.content }}
            </td>
            <td class="px-6 py-4">
              <UBadge :color="getStatusColor(comment.status)">
                {{ comment.status }}
              </UBadge>
            </td>
            <td class="px-6 py-4 text-gray-400 text-sm">
              {{ formatDate(comment.createdAt) }}
            </td>
            <td class="px-6 py-4 flex gap-2">
              <UButton
                v-if="comment.status !== 'approved'"
                variant="soft"
                color="green"
                size="sm"
                @click="updateCommentStatus(comment.id, 'approved')"
              >
                Approve
              </UButton>
              <UButton
                v-if="comment.status !== 'spam'"
                variant="soft"
                color="yellow"
                size="sm"
                @click="updateCommentStatus(comment.id, 'spam')"
              >
                Spam
              </UButton>
              <UButton variant="soft" color="red" size="sm" @click="deleteComment(comment.id)">
                Delete
              </UButton>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="comments.length === 0" class="px-6 py-12 text-center">
        <UIcon name="i-lucide-message-square" class="w-12 h-12 mx-auto text-gray-600 mb-4" />
        <p class="text-gray-400">No comments yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Comment {
  id: number
  authorName: string
  authorEmail: string
  content: string
  status: string
  postTitle: string
  createdAt: string
}

interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

const comments = ref<Comment[]>([])
const statusFilter = ref('all')

const filteredComments = computed(() => {
  return comments.value.filter((comment) => {
    if (statusFilter.value === 'all') return true
    return comment.status === statusFilter.value
  })
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'yellow',
    approved: 'green',
    spam: 'red',
  }
  return colors[status] || 'gray'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const fetchComments = async () => {
  try {
    const res = await $fetch<ApiResponse<Comment[]>>('/api/admin/comments')
    comments.value = res.data || []
  } catch (error) {
    console.error('Failed to fetch comments:', error)
  }
}

const updateCommentStatus = async (id: number, newStatus: string) => {
  try {
    await $fetch(`/api/admin/comments/${id}`, {
      method: 'PUT',
      body: { status: newStatus },
    })
    const comment = comments.value.find((c) => c.id === id)
    if (comment) comment.status = newStatus
  } catch (error) {
    console.error('Failed to update comment status:', error)
  }
}

const deleteComment = async (id: number) => {
  if (!confirm('Are you sure you want to delete this comment?')) return

  try {
    await $fetch(`/api/admin/comments/${id}`, { method: 'DELETE' })
    comments.value = comments.value.filter((c) => c.id !== id)
  } catch (error) {
    console.error('Failed to delete comment:', error)
  }
}

onMounted(() => {
  fetchComments()
})
</script>
