<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white mb-2">Authors</h2>
        <p class="text-gray-400">Manage blog authors</p>
      </div>
      <UButton color="blue" icon="i-lucide-plus" @click="showForm = true"> New Author</UButton>
    </div>

    <!-- Authors Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="author in authors"
        :key="author.id"
        class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition"
      >
        <div class="flex items-start gap-4">
          <div
            v-if="author.avatar"
            class="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0"
            :style="{ backgroundImage: `url(${author.avatar})` }"
          />
          <div
            v-else
            class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0"
          />

          <div class="flex-1">
            <h3 class="text-white font-semibold">
              {{ author.name }}
            </h3>
            <p class="text-gray-400 text-sm">
              {{ author.email }}
            </p>
          </div>
        </div>

        <p v-if="author.bio" class="text-gray-400 text-sm mt-3">
          {{ author.bio }}
        </p>

        <div class="flex gap-2 mt-4">
          <UButton variant="soft" color="blue" size="sm" @click="editAuthor(author)">
            Edit
          </UButton>
          <UButton variant="soft" color="red" size="sm" @click="deleteAuthor(author.id)">
            Delete
          </UButton>
        </div>
      </div>
    </div>

    <div v-if="authors.length === 0" class="text-center py-12">
      <UIcon name="i-lucide-users" class="w-12 h-12 mx-auto text-gray-600 mb-4" />
      <p class="text-gray-400">No authors yet. Create your first author!</p>
    </div>

    <!-- Form Modal -->
    <UModal v-model:open="showForm" prevent-close :ui="{ width: 'w-full sm:max-w-md' }">
      <template #title>
        <span class="sr-only">Category</span>
      </template>
      <template #content>
        <div class="p-6">
          <h3 class="text-xl font-bold text-white mb-4">
            {{ editingId ? 'Edit Author' : 'New Author' }}
          </h3>

          <form class="space-y-4" @submit.prevent="saveAuthor">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <UInput v-model="authorForm.name" placeholder="Author name" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <UInput v-model="authorForm.email" type="email" placeholder="author@example.com" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Bio</label>
              <UTextarea v-model="authorForm.bio" placeholder="Author biography" rows="3" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
              <UInput v-model="authorForm.avatar" placeholder="https://example.com/avatar.jpg" />
            </div>

            <div class="flex gap-3 pt-4">
              <UButton type="submit" color="blue" class="flex-1" :loading="saving">
                Save Author
              </UButton>
              <UButton
                type="button"
                variant="soft"
                color="gray"
                class="flex-1"
                @click="showForm = false"
              >
                Cancel
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Author {
  id: number
  name: string
  email: string
  bio?: string
  avatar?: string
}

interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

const authors = ref<Author[]>([])
const showForm = ref(false)
const saving = ref(false)
const editingId = ref<number | null>(null)

const authorForm = reactive({
  name: '',
  email: '',
  bio: '',
  avatar: '',
})

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message
  return fallback
}

const fetchAuthors = async () => {
  try {
    const res = await $fetch<ApiResponse<Author[]>>('/api/admin/authors')
    authors.value = res.data || []
  } catch (error) {
    console.error('Failed to fetch authors:', error)
  }
}

const editAuthor = (author: Author) => {
  editingId.value = author.id
  Object.assign(authorForm, author)
  showForm.value = true
}

const resetForm = () => {
  editingId.value = null
  authorForm.name = ''
  authorForm.email = ''
  authorForm.bio = ''
  authorForm.avatar = ''
}

const saveAuthor = async () => {
  if (!authorForm.name || !authorForm.email) {
    alert('Name and email are required')
    return
  }

  saving.value = true
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/authors/${editingId.value}`, {
        method: 'PUT',
        body: authorForm,
      })
    } else {
      await $fetch('/api/admin/authors', {
        method: 'POST',
        body: authorForm,
      })
    }

    showForm.value = false
    resetForm()
    await fetchAuthors()
  } catch (error) {
    alert(getErrorMessage(error, 'Failed to save author'))
  } finally {
    saving.value = false
  }
}

const deleteAuthor = async (id: number) => {
  if (!confirm('Are you sure you want to delete this author?')) return

  try {
    await $fetch(`/api/admin/authors/${id}`, { method: 'DELETE' })
    authors.value = authors.value.filter((a) => a.id !== id)
  } catch (error) {
    console.error('Failed to delete author:', error)
  }
}

onMounted(() => {
  fetchAuthors()
})
</script>
