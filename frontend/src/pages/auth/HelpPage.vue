<template>
    <Layout>
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Header Section -->
        <header class="flex items-center mb-8 border-b pb-4">
          <span class="bg-blue-100 text-blue-600 p-2.5 rounded-lg mr-3 shadow-sm">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <h1 class="text-2xl font-bold text-gray-800 border-r pr-6 mr-6 border-gray-200 hidden md:block">
            Bantuan & Panduan
          </h1>
          <p class="text-gray-600">
            Informasi peran dan tugas masing-masing pengguna dalam sistem.
          </p>
        </header>
  
        <!-- Introduction -->
        <div class="mb-8">
          <p class="text-gray-600">
            Setiap peran pengguna memiliki tanggung jawab spesifik dalam alur kerja sistem. Pahami peran Anda dan bagaimana peran tersebut
            berinteraksi dengan pengguna lain untuk memastikan proses berjalan lancar.
          </p>
        </div>
  
        <!-- Roles Cards -->
        <div class="space-y-6">
          <!-- Sales Assistant -->
          <div class="border-l-4 border-amber-500 rounded-lg bg-amber-50 overflow-hidden shadow-sm">
            <div class="p-5">
              <div class="flex items-center mb-4">
                <span class="bg-amber-100 text-amber-800 p-2 rounded-lg mr-3 shadow-sm">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </span>
                <h2 class="text-xl font-bold text-amber-800">Sales Assistant (SA)</h2>
              </div>
              <ul class="ml-5 space-y-2">
                <li class="flex items-start">
                  <span class="text-amber-600 mr-2">•</span>
                  <span>Membuat laporan service baru (Service Order).</span>
                </li>
                <li class="flex items-start">
                  <span class="text-amber-600 mr-2">•</span>
                  <span>Mengisi data customer, produk, dan jenis service.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-amber-600 mr-2">•</span>
                  <span>Laporan akan masuk ke status 'Pending QC'.</span>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Quality Control -->
          <div class="border-l-4 border-purple-500 rounded-lg bg-purple-50 overflow-hidden shadow-sm">
            <div class="p-5">
              <div class="flex items-center mb-4">
                <span class="bg-purple-100 text-purple-800 p-2 rounded-lg mr-3 shadow-sm">
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
                </span>
                <h2 class="text-xl font-bold text-purple-800">Quality Control (QC)</h2>
              </div>
              <ul class="ml-5 space-y-2">
                <li class="flex items-start">
                  <span class="text-purple-600 mr-2">•</span>
                  <span>Melakukan First QC untuk validasi laporan dari SA.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-600 mr-2">•</span>
                  <span>Jika sesuai → Assign ke mekanik.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-600 mr-2">•</span>
                  <span>Jika tidak sesuai → Rejected dan beri catatan.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-600 mr-2">•</span>
                  <span>Setelah mekanik selesai → Melakukan Final QC.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-600 mr-2">•</span>
                  <span>Mengisi estimasi biaya dan sparepart yang digunakan.</span>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Mechanic -->
          <div class="border-l-4 border-blue-500 rounded-lg bg-blue-50 overflow-hidden shadow-sm">
            <div class="p-5">
              <div class="flex items-center mb-4">
                <span class="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3 shadow-sm">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <h2 class="text-xl font-bold text-blue-800">Mechanic</h2>
              </div>
              <ul class="ml-5 space-y-2">
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2">•</span>
                  <span>Mengambil job yang sudah assign oleh QC.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2">•</span>
                  <span>Mengerjakan perbaikan (repair/replace).</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2">•</span>
                  <span>Checklist service dan input catatan serta sparepart.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2">•</span>
                  <span>Jika selesai, ubah status menjadi 'Ready for Check'.</span>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Inventory -->
          <div class="border-l-4 border-green-500 rounded-lg bg-green-50 overflow-hidden shadow-sm">
            <div class="p-5">
              <div class="flex items-center mb-4">
                <span class="bg-green-100 text-green-800 p-2 rounded-lg mr-3 shadow-sm">
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </span>
                <h2 class="text-xl font-bold text-green-800">Inventory</h2>
              </div>
              <ul class="ml-5 space-y-2">
                <li class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>Menambahkan sparepart baru ke sistem.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>Melihat daftar sparepart dan stoknya.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>Permintaan verifikasi stok dilakukan ke Admin Audit.</span>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Admin Audit -->
          <div class="border-l-4 border-red-500 rounded-lg bg-red-50 overflow-hidden shadow-sm">
            <div class="p-5">
              <div class="flex items-center mb-4">
                <span class="bg-red-100 text-red-800 p-2 rounded-lg mr-3 shadow-sm">
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
                </span>
                <h2 class="text-xl font-bold text-red-800">Admin Audit</h2>
              </div>
              <ul class="ml-5 space-y-2">
                <li class="flex items-start">
                  <span class="text-red-600 mr-2">•</span>
                  <span>Mengelola user (tambah, edit, hapus user).</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-600 mr-2">•</span>
                  <span>Melihat Audit Trail aktivitas pengguna.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-600 mr-2">•</span>
                  <span>Menyetujui atau menolak permintaan stok dari Inventory.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-600 mr-2">•</span>
                  <span>Mengakses Daily Report dan statistik sistem.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Workflow Diagram -->
        <div class="mt-10 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Alur Kerja Sistem</h3>
          <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div class="flex flex-col items-center">
              <div class="bg-amber-100 text-amber-800 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span class="text-sm font-medium">Sales</span>
            </div>
            
            <svg class="hidden md:block h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
  
            <div class="flex flex-col items-center">
              <div class="bg-purple-100 text-purple-800 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span class="text-sm font-medium">QC First</span>
            </div>
  
            <svg class="hidden md:block h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
  
            <div class="flex flex-col items-center">
              <div class="bg-blue-100 text-blue-800 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-sm font-medium">Mechanic</span>
            </div>
  
            <svg class="hidden md:block h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
  
            <div class="flex flex-col items-center">
              <div class="bg-purple-100 text-purple-800 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span class="text-sm font-medium">QC Final</span>
            </div>
  
            <svg class="hidden md:block h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
  
            <div class="flex flex-col items-center">
              <div class="bg-green-100 text-green-800 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-sm font-medium">Selesai</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </template>
  
  <script setup>
  import Layout from "@/components/dashboard/Layout.vue";
  </script>