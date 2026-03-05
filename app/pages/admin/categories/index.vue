<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white mb-2">Categories</h2>
        <p class="text-gray-400">Manage post categories</p>
      </div>
      <UButton color="primary" icon="i-lucide-plus" @click="showForm = true">
        New Category
      </UButton>
    </div>

    <!-- Categories Table -->
    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-700 border-b border-gray-600">
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Name</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Slug</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Description</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            class="border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 text-white font-medium">
              {{ category.name }}
            </td>
            <td class="px-6 py-4 text-gray-400">
              {{ category.slug }}
            </td>
            <td class="px-6 py-4 text-gray-400 truncate">
              {{ category.description || '-' }}
            </td>
            <td class="px-6 py-4 flex gap-2">
              <UButton variant="soft" color="primary" size="sm" @click="editCategory(category)">
                Edit
              </UButton>
              <UButton variant="soft" color="error" size="sm" @click="deleteCategory(category.id)">
                Delete
              </UButton>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="categories.length === 0" class="px-6 py-12 text-center">
        <UIcon name="i-lucide-tags" class="w-12 h-12 mx-auto text-gray-600 mb-4" />
        <p class="text-gray-400">No categories yet. Create your first category!</p>
      </div>
    </div>

    <!-- Form Modal -->
    <UModal v-model:open="showForm" prevent-close>
      <template #content>
        <UCard>
          <template #header>
            <h3 class="text-xl font-bold text-white">
              {{ editingId ? 'Edit Category' : 'New Category' }}
            </h3>
          </template>

          <form class="space-y-4" @submit.prevent="saveCategory">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <UInput
                v-model="categoryForm.name"
                placeholder="Category name"
                @input="generateSlug"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Slug</label>
              <UInput v-model="categoryForm.slug" placeholder="category-slug" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <UTextarea
                v-model="categoryForm.description"
                placeholder="Category description"
                :rows="3"
              />
            </div>

            <div class="flex gap-3 pt-4">
              <UButton type="submit" color="primary" class="flex-1" :loading="saving">
                Save Category
              </UButton>
              <UButton
                type="button"
                variant="soft"
                color="neutral"
                class="flex-1"
                @click="showForm = false"
              >
                Cancel
              </UButton>
            </div>
          </form>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

const showForm = ref(false)
const saving = ref(false)
const editingId = ref<number | null>(null)

const categoryForm = reactive({
  name: '',
  slug: '',
  description: '',
})

const { data: categoriesData, refresh } = useFetch<ApiResponse<Category[]>>('/api/admin/categories')

const categories = computed(() => categoriesData.value?.data || [])

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return 'Failed to save category'
}

const generateSlug = () => {
  categoryForm.slug = categoryForm.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const editCategory = (category: Category) => {
  editingId.value = category.id
  Object.assign(categoryForm, category)
  showForm.value = true
}

const resetForm = () => {
  editingId.value = null
  categoryForm.name = ''
  categoryForm.slug = ''
  categoryForm.description = ''
}

const saveCategory = async () => {
  if (!categoryForm.name || !categoryForm.slug) {
    alert('Name and slug are required')
    return
  }

  saving.value = true
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/categories/${editingId.value}`, {
        method: 'PUT',
        body: categoryForm,
      })
    } else {
      await $fetch('/api/admin/categories', {
        method: 'POST',
        body: categoryForm,
      })
    }

    showForm.value = false
    resetForm()
    await refresh()
  } catch (error) {
    alert(getErrorMessage(error))
  } finally {
    saving.value = false
  }
}

const deleteCategory = async (id: number) => {
  if (!confirm('Are you sure you want to delete this category?')) return

  try {
    await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}
</script>
