<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="flex justify-between items-center px-6 py-3">
      <!-- Logo & Title Area -->
      <div class="flex items-center">
        <button
          @click="toggleSidebar"
          class="md:hidden mr-3 text-gray-500 hover:text-primary focus:outline-none transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div class="flex items-center space-x-3">
          <div
            class="bg-gradient-to-br from-amber-500 to-amber-400 text-white p-2 rounded-lg shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <span class="font-bold text-lg text-gray-800">Service Center</span>
            <div class="flex items-center">
              <span
                class="text-xs bg-gradient-to-r from-amber-500 to-amber-500 bg-clip-text text-transparent font-semibold"
                >Daily Report System</span
              >
              <span
                class="inline-block ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <!-- User & Time Area -->
      <div class="flex items-center">
        <!-- Time -->
        <div
          class="hidden md:flex items-center mr-6 text-gray-600 bg-gray-50 px-3 py-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm font-medium">{{ currentTime }}</span>
        </div>

        <!-- User Info -->
        <div class="hidden md:block border-r pr-6 mr-6 border-gray-200">
          <div class="text-sm text-gray-700">
            Logged in as:
            <span class="font-medium text-orange-600">{{
              user.role || "-"
            }}</span>
          </div>
          <div class="text-xs text-gray-500">
            {{ user.username || "Loading..." }}
          </div>
        </div>

        <!-- Profile & Logout Dropdown -->
        <div class="relative" ref="profileDropdown">
          <button
            @click="toggleProfileMenu"
            class="flex items-center space-x-2 focus:outline-none bg-gray-50 hover:bg-gray-100 rounded-full pr-2 transition-colors duration-200"
            aria-label="Open user menu"
          >
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-red-300 text-white flex items-center justify-center font-medium shadow-sm"
            >
              {{ user.username ? user.username.charAt(0).toUpperCase() : "U" }}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500 transition-transform duration-200"
              :class="{ 'transform rotate-180': isProfileMenuOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown Menu with animations -->
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p class="text-sm font-medium text-gray-700">
                  {{ user.username }}
                </p>
                <p class="text-xs text-gray-500 flex items-center">
                  <span
                    class="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"
                  ></span>
                  {{ user.role }}
                </p>
              </div>
              <a
                href="/auth/change-password"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Change Password
              </a>
              <a
                href="/auth/help"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help
              </a>
              <div class="border-t border-gray-100 mt-1"></div>
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import api from "@/api/api.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();
const showToast = useToast();
const user = ref({ username: "", role: "" });
const currentTime = ref("");
const isProfileMenuOpen = ref(false);
const profileDropdown = ref(null);

// Emit event for sidebar toggle on mobile
const emit = defineEmits(["toggle-sidebar"]);
const toggleSidebar = () => {
  emit("toggle-sidebar");
};

// Fetch user info from backend
const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = res.data;
  } catch (err) {
    console.error("Failed to fetch user data", err);
    showToast.error("Session expired. Please login again.");
    localStorage.removeItem("token");
    router.push("/login");
  }
};

const updateClock = () => {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  currentTime.value = now.toLocaleDateString("id-ID", options);
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const closeProfileMenu = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  showToast.success("Logout successful");
  router.push("/login");
};

let clockInterval;

onMounted(() => {
  fetchUser();
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
  document.addEventListener("click", closeProfileMenu);
});

onBeforeUnmount(() => {
  clearInterval(clockInterval);
  document.removeEventListener("click", closeProfileMenu);
});
</script>
