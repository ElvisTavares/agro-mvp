<template>
  <div class="flex flex-col h-screen w-64 bg-[#0a0f1d] text-gray-400 border-r border-[#1a2235] transition-all duration-300">
    <!-- Header / Brand -->
    <div class="flex items-center px-6 py-6 border-b border-[#1a2235]">
      <h1 class="text-white font-black text-xl tracking-tight uppercase">Agritech Industrial</h1>
    </div>

    <!-- User / Sector Profile -->
    <div class="px-5 py-6">
      <div class="flex items-center gap-4 bg-[#0d1426] p-3 rounded-lg border border-[#1a2235]">
        <div class="bg-[#052e25] p-2 rounded-md">
          <Tractor class="w-6 h-6 text-[#00c569]" />
        </div>
        <div>
          <h2 class="text-white font-bold text-sm">Sector 07</h2>
          <p class="text-xs text-gray-500 font-medium">Active Ops</p>
        </div>
      </div>
    </div>

    <!-- Navigation Area -->
    <nav class="flex-1 px-4 py-2 space-y-1 overflow-y-auto w-full">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        @click="$emit('item-clicked')"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group w-full"
        :class="[
          $route.path === item.path 
            ? 'bg-[#0f2e25] text-[#00c569] font-medium' 
            : 'text-gray-400 hover:text-white hover:bg-[#151c2e]'
        ]"
      >
        <component 
          :is="item.icon" 
          class="w-5 h-5 transition-colors duration-200"
          :class="[ $route.path === item.path ? 'text-[#00c569]' : 'text-gray-500 group-hover:text-gray-300' ]"
        />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- Bottom Actions Area -->
    <div class="p-5 border-t border-[#1a2235] space-y-4">
      <button class="w-full flex items-center justify-center gap-2 bg-[#00a35c] hover:bg-[#00b566] text-[#052e25] font-bold py-3 rounded-xl transition-colors">
        <Plus class="w-4 h-4 text-black" />
        <span class="text-black">Add Sensor</span>
      </button>
      
      <div class="space-y-1">
        <button v-for="action in bottomActions" :key="action.name" class="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#151c2e] rounded-xl transition-all duration-200 group">
          <component :is="action.icon" class="w-5 h-5 text-gray-500 group-hover:text-gray-300" />
          <span class="text-sm font-medium">{{ action.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  LayoutDashboard, 
  Tractor, 
  LineChart, 
  Radio, 
  ClipboardList, 
  Plus, 
  Cpu, 
  LogOut 
} from 'lucide-vue-next';

defineEmits(['item-clicked']);

// Lista dinâmica solicitada para os itens principais do menu
const menuItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Fleet Tracking', path: '/reports', icon: Tractor }, // Example using /reports route
  { name: 'Crop Analysis', path: '/crop', icon: LineChart },
  { name: 'Sensor Grid', path: '/sensor', icon: Radio },
  { name: 'Activity Hub', path: '/activity', icon: ClipboardList },
];

// Lista para ações de rodapé (Diagnostics, Sign Out)
const bottomActions = [
  { name: 'Diagnostics', action: 'diagnostics', icon: Cpu },
  { name: 'Sign Out', action: 'signout', icon: LogOut },
];
</script>

<style scoped>
/* Scrollbar customizada para tema escuro, se houver overflow */
nav::-webkit-scrollbar {
  width: 4px;
}
nav::-webkit-scrollbar-track {
  background: transparent;
}
nav::-webkit-scrollbar-thumb {
  background: #1a2235;
  border-radius: 4px;
}
nav::-webkit-scrollbar-thumb:hover {
  background: #2a3441;
}
</style>
