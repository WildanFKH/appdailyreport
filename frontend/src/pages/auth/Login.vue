<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans py-8"
  >
    <div
      class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl"
    >
      <!-- Logo with animation -->
      <div class="flex justify-center mb-6">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="w-28 h-28 object-contain transition-all duration-500 hover:scale-110"
        />
      </div>

      <!-- Judul dengan desain yang ditingkatkan -->
      <h2 class="text-2xl font-bold text-secondary text-center mb-2">
        Login to System
      </h2>
      <p class="text-center text-gray-500 text-sm mb-6">
        Enter your credentials to continue
      </p>

      <!-- Error Message dengan animasi fade-in -->
      <div
        v-if="error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 text-center animate-fade-in flex items-center"
      >
        <svg
          class="w-5 h-5 mr-2 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{ error }}
      </div>

      <!-- Form dengan efek hover yang ditingkatkan -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </div>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="name@gmail.com"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              required
              placeholder="••••••••"
              class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />

            <!-- Toggle Icon -->
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="!showPassword"
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 011.658-2.938M9.878 9.88a3 3 0 104.242 4.243M15 12a3 3 0 00-3-3M3 3l18 18"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Role dengan dropdown styling -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Role</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <select
              v-model="form.role"
              required
              class="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none transition-all duration-200"
            >
              <option value="">Select Role</option>
              <option value="SA">Sales Assistant</option>
              <option value="QC">Quality Control</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Inventory">Inventory</option>
              <option value="Admin">Admin Audit</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Submit Button dengan efek hover dan ripple -->
        <button
          type="submit"
          :class="[
            'w-full text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:translate-y-px relative overflow-hidden',
            isLoading
              ? 'bg-primary opacity-70 cursor-not-allowed'
              : 'bg-primary hover:bg-opacity-90 shadow-md hover:shadow-lg',
          ]"
          :disabled="isLoading"
        >
          <span v-if="!isLoading" class="relative z-10">Login</span>
          <span v-else class="flex items-center justify-center space-x-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </span>
        </button>
      </form>

      <!-- Register Info   -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Dont have account?
          <a
            href="/register"
            class="text-primary font-medium hover:text-primary-dark transition-colors duration-200 hover:underline"
          >
            More information
          </a>
        </p>
      </div>

      <!-- Decorative element -->
      <div
        class="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api/api.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const form = ref({
  email: "",
  password: "",
  role: "",
});

const isLoading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  isLoading.value = true;

  if (!form.value.email || !form.value.password || !form.value.role) {
    toast.warning("Please complete all fields first.");
    isLoading.value = false;
    return;
  }

  try {
    const response = await api.post("/auth/login", form.value);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    toast.success(`Login successful! Welcome, ${user.username}`);
    router.push("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.warning("Access denied: Your role is not appropriate.");
    } else if (status === 401) {
      toast.error("Login failed: Email, Role or password does not match.");
    } else {
      toast.error(message || "An error occurred while logging in.");
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
