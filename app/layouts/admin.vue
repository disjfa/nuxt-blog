<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <div class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-pen-tool" class="w-6 h-6 text-blue-500" />
            <h1 class="text-xl font-bold text-white">Nuxt Blog Admin</h1>
          </div>
          <div class="flex items-center gap-4">
            <UButton variant="ghost" color="neutral"> Profile </UButton>
            <UButton variant="ghost" color="neutral"> Logout </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
        <nav class="p-4 space-y-2">
          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
            :class="{ 'bg-primary-600 text-white': $route.path === '/admin' }"
          >
            <UIcon name="i-lucide-home" class="w-5 h-5" />
            <span>Dashboard</span>
          </NuxtLink>

          <div class="pt-4">
            <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</p>
            <NuxtLink
              to="/admin/posts"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
              :class="{ 'bg-primary-600 text-white': $route.path.startsWith('/admin/posts') }"
            >
              <UIcon name="i-lucide-file-text" class="w-5 h-5" />
              <span>Posts</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/categories"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
              :class="{ 'bg-primary-600 text-white': $route.path.startsWith('/admin/categories') }"
            >
              <UIcon name="i-lucide-tags" class="w-5 h-5" />
              <span>Categories</span>
            </NuxtLink>
          </div>

          <div class="pt-4">
            <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Management
            </p>
            <NuxtLink
              to="/admin/authors"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
              :class="{ 'bg-primary-600 text-white': $route.path.startsWith('/admin/authors') }"
            >
              <UIcon name="i-lucide-users" class="w-5 h-5" />
              <span>Authors</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/comments"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
              :class="{ 'bg-primary-600 text-white': $route.path.startsWith('/admin/comments') }"
            >
              <UIcon name="i-lucide-message-square" class="w-5 h-5" />
              <span>Comments</span>
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <div class="max-w-7xl mx-auto p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
