<template>
  <aside
    class="w-64 bg-white shadow-lg h-full overflow-y-auto border-r border-gray-100 flex flex-col"
  >
    <!-- Logo Section -->
    <div class="p-5 flex items-center justify-center border-b border-gray-100">
      <img
        src="@/assets/logo.png"
        alt="Company Logo"
        class="h-40 object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-6 px-3 text-sm">
      <!-- Section Title -->
      <div
        class="text-gray-400 uppercase text-xs font-medium tracking-wider mb-3 px-4"
      >
        Main Navigation
      </div>

      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="nav-link group mb-2"
        active-class="nav-link-active"
      >
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
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
        <span>Dashboard</span>
      </router-link>

      <!-- Divider -->
      <div class="border-t border-gray-100 my-4"></div>

      <!-- Section Title -->
      <div
        class="text-gray-400 uppercase text-xs font-medium tracking-wider mb-3 px-4"
      >
        Department Access
      </div>

      <!-- Sales Assistant -->
      <DropdownSection
        title="Sales Assistant"
        icon="sales"
        :items="[
          { text: 'Service Order', to: '/sa/service-order' },
          { text: 'Service List', to: '/sa/service-list' },
        ]"
        v-model:open="dropdowns.sa"
      />

      <!-- Quality Control -->
      <DropdownSection
        title="Quality Control"
        icon="quality"
        :items="[
          { text: 'First QC', to: '/qc/first-qc' },
          { text: 'Final QC', to: '/qc/final-qc' },
        ]"
        v-model:open="dropdowns.qc"
      />

      <!-- Mechanic -->
      <DropdownSection
        title="Mechanic"
        icon="mechanic"
        :items="[
          { text: 'Mechanic Tasks', to: '/mechanic/tasks' },
          { text: 'Mechanic Report', to: '/mechanic/report' },
        ]"
        v-model:open="dropdowns.mechanic"
      />

      <!-- Inventory -->
      <DropdownSection
        title="Inventory"
        icon="inventory"
        :items="[
          { text: 'Add Sparepart', to: '/inventory/add-sparepart' },
          { text: 'Sparepart List', to: '/inventory/sparepart-list' },
        ]"
        v-model:open="dropdowns.inventory"
      />

      <!-- Admin Audit -->
      <DropdownSection
        title="Admin Audit"
        icon="admin"
        :items="[
          { text: 'Approve Service', to: '/adminAudit/approve-service' },
          { text: 'Approve Sparepart', to: '/adminAudit/approval' },
          { text: 'Manage User', to: '/adminAudit/manage-user' },
          { text: 'Daily Report', to: '/adminAudit/daily-report' },
          { text: 'Audit Trail', to: '/adminAudit/audit-trail' },
        ]"
        v-model:open="dropdowns.admin"
      />
    </nav>
  </aside>
</template>

<script setup>
import { reactive } from "vue";
import DropdownSection from "@/components/pendukung/DropdownSection.vue";

const dropdowns = reactive({
  sa: false,
  qc: false,
  mechanic: false,
  inventory: false,
  admin: false,
});
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:bg-amber-50 hover:text-amber-600 px-4 py-2.5 rounded-lg 
  transition-all duration-200 flex items-center mb-1 font-medium;
}

.nav-link-active {
  @apply bg-amber-100 text-amber-700 font-semibold shadow-sm;
}

.icon-base {
  @apply h-5 w-5 mr-3 text-gray-500 transition-colors duration-200;
}
</style>
