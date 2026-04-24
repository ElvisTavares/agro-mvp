<template>
  <div class="flex h-screen bg-[#0f1115] overflow-hidden font-sans">
    <!-- Componente de Menu (Sidebar p/ Desktop / Drawer p/ Mobile) -->
    
    <!-- Mobile Hamburger Header -->
    <div class="md:hidden fixed top-0 w-full bg-[#0a0f1d] text-white flex items-center justify-between px-4 py-3 z-40 border-b border-[#1a2235]">
      <h1 class="font-black tracking-tight uppercase text-lg">Agritech</h1>
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 focus:outline-none focus:ring-2 focus:ring-[#00c569] rounded">
        <MenuIcon class="w-6 h-6" />
      </button>
    </div>

    <!-- Sidebar -->
    <div :class="[
      'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex-shrink-0',
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <AppMenu @item-clicked="mobileMenuOpen = false" />
    </div>

    <!-- Overlay Escuro para Mobile quando Menu Aberto -->
    <div 
      v-if="mobileMenuOpen" 
      @click="mobileMenuOpen = false"
      class="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Main Content Layout -->
    <main class="flex-1 overflow-y-auto w-full pt-16 md:pt-0">
      <div class="p-4 md:p-6 w-full mx-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Menu as MenuIcon } from 'lucide-vue-next';
import AppMenu from './components/AppMenu.vue';

const mobileMenuOpen = ref(false);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
