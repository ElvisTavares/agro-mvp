<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Relatórios de Plantio</h1>
      <button class="px-4 py-2 bg-[#00a35c] hover:bg-[#00b566] text-white font-bold rounded-lg text-sm transition-colors shadow-sm">
        Exportar PDF
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-800">Histórico da Safra Atual</h2>
        <div class="relative">
          <input 
            type="text" 
            placeholder="Buscar por talhão..." 
            class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00a35c]"
          />
          <Search class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID do Relatório
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Talhão / Setor
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Cultura
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="report in reports" :key="report.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                #{{ report.id }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ report.date }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ report.sector }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">
                {{ report.crop }}
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-bold"
                  :class="{
                    'bg-green-100 text-green-800': report.status === 'Concluído',
                    'bg-yellow-100 text-yellow-800': report.status === 'Em Andamento',
                    'bg-red-100 text-red-800': report.status === 'Atrasado'
                  }"
                >
                  {{ report.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from 'lucide-vue-next';

// Dados simulados para a tabela de relatórios
const reports = ref([
  { id: '1042', date: '24/04/2026', sector: 'Talhão Norte 01', crop: 'Soja', status: 'Concluído' },
  { id: '1043', date: '22/04/2026', sector: 'Talhão Sul 04', crop: 'Milho', status: 'Em Andamento' },
  { id: '1044', date: '20/04/2026', sector: 'Setor Leste', crop: 'Trigo', status: 'Atrasado' },
  { id: '1045', date: '15/04/2026', sector: 'Talhão Norte 02', crop: 'Soja', status: 'Concluído' },
  { id: '1046', date: '10/04/2026', sector: 'Setor Oeste', crop: 'Algodão', status: 'Concluído' },
]);
</script>
