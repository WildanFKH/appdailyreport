<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header Section -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b pb-4 space-y-4 sm:space-y-0"
      >
        <div class="flex items-center mb-2">
          <span class="bg-red-100 text-red-600 p-2.5 rounded-lg mr-3 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red"
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
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            User Management
          </h1>
          <p class="text-gray-600">
            Manage user accounts and their roles in the system.
          </p>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            @input="filterUsers"
          />
          <div class="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      <!-- Filter by Role -->
      <div class="mb-6">
        <h2 class="text-sm font-medium text-gray-700 mb-2">Filter by Role:</h2>
        <div class="flex flex-wrap gap-2">
          <button
            @click="selectRoleFilter('all')"
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            :class="
              selectedRole === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            "
          >
            All
          </button>
          <button
            v-for="role in roleOptions"
            :key="role.value"
            @click="selectRoleFilter(role.value)"
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            :class="{
              'bg-blue-500 text-white': selectedRole === role.value,
              'bg-blue-100 text-blue-800 hover:bg-blue-200':
                selectedRole !== role.value,
            }"
          >
            {{ role.label }}
          </button>
        </div>
      </div>

      <!-- Add User Button -->
      <div class="flex justify-end mb-6">
        <button
          @click="showAddModal = true"
          class="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-opacity-90 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New User
        </button>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <svg
          class="animate-spin h-10 w-10 text-red mb-4"
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
        <p class="text-lg text-gray-600">Loading User Data...</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr class="text-left text-gray-700">
              <th class="py-3 px-4 font-semibold">Name</th>
              <th class="py-3 px-4 font-semibold">Email</th>
              <th class="py-3 px-4 font-semibold">Role</th>
              <th class="py-3 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="user in paginatedUsers"
              :key="user._id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td class="py-3 px-4">
                <div class="font-medium">{{ user.username }}</div>
              </td>
              <td class="py-3 px-4 text-gray-600">{{ user.email }}</td>
              <td class="py-3 px-4">
                <span
                  class="px-2 py-1 text-xs rounded-full font-semibold"
                  :class="getRoleBadgeClass(user.role)"
                >
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-center space-x-2">
                  <button
                    @click="editUser(user)"
                    class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="confirmDeleteUser(user._id)"
                    class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div
          v-if="filteredUsers.length === 0"
          class="flex flex-col items-center justify-center py-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-gray-300 mb-4"
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
          <p class="text-lg text-gray-500 mb-2">No Users Found</p>
          <p class="text-gray-400">
            Try changing your search filters or add new users.
          </p>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredUsers.length > 0"
          class="flex justify-between items-center mt-6"
        >
          <div class="text-sm text-gray-500">
            Showing
            <span class="font-medium"
              >{{
                Math.min(currentPage * itemsPerPage, filteredUsers.length) -
                (currentPage - 1) * itemsPerPage
              }}
              of {{ paginatedUsers.length }}</span
            >
            items from page
            <span class="font-medium">{{ currentPage }}</span> (Total:
            <span class="font-medium">{{ filteredUsers.length }}</span
            >)
          </div>
          <div class="flex space-x-1">
            <button
              @click="prevPage"
              class="px-3 py-1 border rounded-md hover:bg-gray-50 transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              :disabled="currentPage === 1"
            >
              Previous
            </button>

            <!-- Page Numbers -->
            <div class="flex space-x-1">
              <button
                v-for="page in displayedPageNumbers"
                :key="page"
                @click="goToPage(page)"
                class="px-3 py-1 rounded-md transition-colors"
                :class="
                  currentPage === page
                    ? 'bg-red-500 text-white'
                    : 'border hover:bg-gray-50'
                "
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="nextPage"
              class="px-3 py-1 border rounded-md hover:bg-gray-50 transition-colors"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Add/Edit User -->
      <div
        v-if="showAddModal || showEditModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">
              {{ showEditModal ? "Edit User" : "Add New User" }}
            </h2>
            <button
              @click="resetModal"
              class="text-gray-500 hover:text-gray-700"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Name</label
              >
              <input
                v-model="form.username"
                type="text"
                placeholder="Enter user name"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100  focus:border-red-300"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                placeholder="Enter email address"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Role</label
              >
              <select
                v-model="form.role"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="" disabled>Select Role</option>
                <option
                  v-for="role in roleOptions"
                  :key="role.value"
                  :value="role.value"
                >
                  {{ role.label }}
                </option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                @click="resetModal"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="submitUser"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {{ showEditModal ? "Update User" : "Create User" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import Layout from "@/components/dashboard/Layout.vue";
import api from "@/api/api.js";

const users = ref([]);
const toast = useToast();
const loading = ref(true);
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingUserId = ref(null);
const searchQuery = ref("");
const selectedRole = ref("all");

// Pagination variables
const currentPage = ref(1);
const itemsPerPage = ref(10);

const form = ref({
  username: "",
  email: "",
  role: "",
});

const roleOptions = [
  { value: "SA", label: "Sales Assistant" },
  { value: "QC", label: "Quality Control" },
  { value: "Mechanic", label: "Mechanic" },
  { value: "Inventory", label: "Inventory" },
  { value: "Admin", label: "Admin Audit" },
];

const filteredUsers = computed(() => {
  let filtered = [...users.value];

  // Apply role filter if not 'all'
  if (selectedRole.value !== "all") {
    filtered = filtered.filter((user) => user.role === selectedRole.value);
  }

  // Apply search filter if query exists
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter((user) => {
      return (
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        getRoleLabel(user.role).toLowerCase().includes(query)
      );
    });
  }

  return filtered;
});

// Compute total pages
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

// Get paginated users for the current page
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredUsers.value.slice(startIndex, endIndex);
});

// Calculate which page numbers to show
const displayedPageNumbers = computed(() => {
  const range = [];
  const maxVisiblePages = 5; // Show up to 5 page numbers
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  return range;
});

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    users.value = res.data;
  } catch (err) {
    console.error("Failed to fetch users:", err);
    toast.error("Failed to load user data. Please try again.");
  } finally {
    loading.value = false;
  }
};

const submitUser = async () => {
  if (!form.value.username || !form.value.email || !form.value.role) {
    toast.warning("Please fill in all required fields");
    return;
  }

  const token = localStorage.getItem("token");
  const konfirmasi = confirm ("Are you sure you want to save this user?");
  if (!konfirmasi) return;
  try {
    if (showEditModal.value) {
      await api.put(`/admin/users/${editingUserId.value}`, form.value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User updated successfully");
    } else {
      await api.post("/admin/users", form.value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User created successfully");
    }
    resetModal();
    fetchUsers();
  } catch (err) {
    console.error("Error submitting user:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission for this action."
      );
    } else {
      toast.error(message || "Failed to save user.");
    }
  }
};

const confirmDeleteUser = (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    deleteUser(id);
  }
};

const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await api.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("User deleted successfully");
    fetchUsers();
  } catch (err) {
    console.error("Error deleting user:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission for this action."
      );
    } else {
      toast.error(message || "Failed to delete user.");
    }
  }
};

const editUser = (user) => {
  form.value = { ...user };
  editingUserId.value = user._id;
  showEditModal.value = true;
};

const resetModal = () => {
  form.value = { username: "", email: "", role: "" };
  showAddModal.value = false;
  showEditModal.value = false;
  editingUserId.value = null;
};

const getRoleLabel = (roleValue) => {
  const role = roleOptions.find((r) => r.value === roleValue);
  return role ? role.label : roleValue;
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case "SA":
      return "bg-amber-100 text-amber-800";
    case "QC":
      return "bg-purple-100 text-purple-800";
    case "Mechanic":
      return "bg-blue-100 text-blue-800";
    case "Inventory":
      return "bg-green-100 text-green-800";
    case "Admin":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const selectRoleFilter = (role) => {
  selectedRole.value = role;
  currentPage.value = 1; // Reset to first page when filter changes
};

const filterUsers = () => {
  currentPage.value = 1; // Reset to first page when search changes
};

const goToPage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(fetchUsers);
</script>
