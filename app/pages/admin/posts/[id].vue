<template>
  <div class="container mx-auto">
    <div class="mb-8">
      <UButton to="/admin/posts" variant="ghost" color="gray" icon="i-lucide-arrow-left">
        Back to Posts
      </UButton>
      <h2 class="text-3xl font-bold text-white mb-2 mt-4">Edit Post</h2>
    </div>

    <form class="space-y-6" @submit.prevent="savePost">
      <UFormField label="Title" name="title">
        <UInput
          v-model="form.title"
          placeholder="Enter post title"
          @input="generateSlug"
        />
      </UFormField>

      <UFormField label="Slug" name="slug">
        <UInput v-model="form.slug" placeholder="post-slug" />
      </UFormField>

      <UFormField label="Excerpt" name="excerpt">
        <UTextarea v-model="form.excerpt" placeholder="Brief summary of the post" :rows="3" />
      </UFormField>

      <UFormField label="Content" name="content">
        <UTextarea v-model="form.content" placeholder="Write your post content here..." :rows="12" />
      </UFormField>

      <UFormField label="Author" name="authorId">
        <USelect
          v-model="form.authorId"
          :items="authorOptions"
          option-attribute="label"
          value-attribute="value"
          placeholder="Select an author"
        />
      </UFormField>

      <UFormField label="Status" name="status">
        <USelect
          v-model="form.status"
          :items="['draft', 'published', 'archived']"
          placeholder="Select status"
        />
      </UFormField>

      <div class="flex gap-3 pt-6">
        <UButton type="submit" :loading="saving"> Save Changes </UButton>
        <UButton type="button" variant="soft" to="/admin/posts"> Cancel </UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const postId = route.params.id as string
const saving = ref(false)

interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

interface AuthorSummary {
  id: number
  name: string
}

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  authorId: null as number | null,
  status: 'draft',
})

const { data: authorsData } = useFetch<ApiResponse<AuthorSummary[]>>('/api/admin/authors')

const authorOptions = computed(() =>
  (authorsData.value?.data || []).map((author) => ({
    label: author.name,
    value: author.id,
  }))
)

const generateSlug = () => {
  form.slug = form.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message
  return fallback
}

const fetchPost = async () => {
  try {
    const res = await $fetch<ApiResponse<typeof form>>(`/api/admin/posts/${postId}`)
    if (res.data) {
      Object.assign(form, res.data)
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
  }
}

const savePost = async () => {
  if (!form.title || !form.content) {
    alert('Title and content are required')
    return
  }

  if (!form.authorId) {
    alert('Please select an author')
    return
  }

  saving.value = true
  try {
    await $fetch<ApiResponse<unknown>>(`/api/admin/posts/${postId}`, {
      method: 'PUT',
      body: form,
    })

    navigateTo('/admin/posts')
  } catch (error) {
    alert(getErrorMessage(error, 'Failed to save post'))
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await fetchPost()
})
</script>
