<template>
  <div class="mb-1">
    <!-- Section Header -->
    <button
      @click="toggleOpen"
      class="w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-amber-50 group"
      :class="{ 'bg-amber-50 text-amber-700': open || isAnyChildActive }"
    >
      <div class="flex items-center">
        <!-- Dynamic Icons -->
        <div v-if="icon === 'sales'" class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-base group-hover:text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </svg>
        </div>

        <div v-else-if="icon === 'quality'" class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-base group-hover:text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="22" y1="12" x2="18" y2="12"></line>
            <line x1="6" y1="12" x2="2" y2="12"></line>
            <line x1="12" y1="6" x2="12" y2="2"></line>
            <line x1="12" y1="22" x2="12" y2="18"></line>
          </svg>
        </div>

        <div v-else-if="icon === 'mechanic'" class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-base group-hover:text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            ></path>
          </svg>
        </div>

        <div v-else-if="icon === 'inventory'" class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-base group-hover:text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
            <path d="M3 8h18"></path>
            <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
            <path d="M3 16h18"></path>
          </svg>
        </div>

        <div v-else-if="icon === 'admin'" class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-base group-hover:text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>

        <span
          class="font-medium text-gray-700 group-hover:text-amber-600"
          :class="{ 'text-amber-700': open || isAnyChildActive }"
          >{{ title }}</span
        >
      </div>

      <!-- Dropdown Arrow -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-gray-500 transition-transform duration-300"
        :class="{ 'rotate-180 text-amber-600': open }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Dropdown Items -->
    <div
      v-show="open"
      class="pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300"
    >
      <router-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="submenu-link group"
        active-class="submenu-link-active"
      >
        <div
          class="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-amber-600 mr-2.5 transition-colors duration-200"
        ></div>
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  title: String,
  icon: String,
  items: Array,
  open: Boolean,
});

const emit = defineEmits(["update:open"]);
const route = useRoute();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value),
});

// Check if any child route is active
const isAnyChildActive = computed(() => {
  return props.items.some((item) => route.path.startsWith(item.to));
});

// Toggle dropdown
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// Open dropdown if child route is active
onMounted(() => {
  if (isAnyChildActive.value) {
    isOpen.value = true;
  }
});

// Watch for route changes to auto-open relevant sections
watch(
  () => route.path,
  (newPath) => {
    const shouldBeOpen = props.items.some((item) =>
      newPath.startsWith(item.to)
    );
    if (shouldBeOpen && !isOpen.value) {
      isOpen.value = true;
    }
  }
);
</script>

<style scoped>
.icon-container {
  @apply flex items-center justify-center mr-3;
}

.submenu-link {
  @apply flex items-center py-2 px-4 text-gray-600 rounded-lg hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200;
}

.submenu-link-active {
  @apply text-amber-700 font-medium;
}

.submenu-link-active .rounded-full {
  @apply bg-amber-600;
}
</style>
