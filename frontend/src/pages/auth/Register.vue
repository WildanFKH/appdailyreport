<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white font-sans px-4"
  >
    <div
      class="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl transition-all duration-300"
    >
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="w-24 h-24 object-contain animate-pulse"
        />
      </div>

      <!-- Judul -->
      <h2
        class="text-3xl font-bold text-gray-800 text-center mb-4 tracking-wide"
      >
        Account Registration
      </h2>

      <!-- Warning Box -->
      <div
        class="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-xl mb-6 shadow-sm"
      >
        <div class="flex items-start space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm leading-relaxed">
            New account registration must be
            <strong class="font-semibold">approved by Audit Admin</strong>.
            Please contact Audit Admin for verification and activation of your
            account.
          </p>
        </div>
      </div>

      <!-- Info Kontak -->
      <div class="flex flex-col items-center gap-4 mb-6">
        <a
          href="https://wa.me/085691238739"
          target="_blank"
          class="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.515 5.093 1.521 5.448-.005 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
            />
          </svg>
          <span class="font-medium">Contact Admin Audit via WhatsApp</span>
        </a>
        <div class="text-xs text-gray-500 text-center">
          Or contact:
          <span class="font-medium text-primary">admin@bagscity.id</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-6 border-t border-gray-200"></div>

      <!-- Back to login -->
      <div class="text-center mt-4">
        <router-link
          to="/login"
          class="text-sm text-gray-500 hover:text-orange-400 transition-all"
          >Back to Login</router-link
        >
      </div>
    </div>
  </div>
</template>
