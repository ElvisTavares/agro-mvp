<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Painel do Agronegócio</h1>
      <button @click="carregarDados" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors">
        Atualizar Dados
      </button>
    </div>

    <!-- Status do Sistema (Solicitado no requisito) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 text-uppercase tracking-wider">Sensores Ativos</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">142</p>
        </div>
        <div class="p-4 bg-green-50 rounded-full">
          <Radio class="w-6 h-6 text-green-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 text-uppercase tracking-wider">Tratores em Campo</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">18</p>
        </div>
        <div class="p-4 bg-blue-50 rounded-full">
          <Tractor class="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 text-uppercase tracking-wider">Integridade do Sistema</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">99.8%</p>
        </div>
        <div class="p-4 bg-indigo-50 rounded-full">
          <Cpu class="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </div>

    <!-- Tabela de Atividades (Original do App.vue) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-800">Atividades Recentes</h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Atividade
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Lavoura
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="atividades.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                Nenhum dado encontrado para as atividades.
              </td>
            </tr>
            <tr
              v-for="item in atividades"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold"
                >
                  {{ item.atividade }}
                </span>
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
                {{ item.produto }}
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ item.quantidade }} {{ item.unidade_medida }}
              </td>
              <td class="px-6 py-4 text-gray-600">{{ item.lavoura }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Radio, Tractor, Cpu } from "lucide-vue-next";

const atividades = ref([]);
let loopDeAtualizacao;

const carregarDados = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/atividades");
    if (response.ok) {
      atividades.value = await response.json();
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    // Fallback pra demonstração caso API não exista
    if(atividades.value.length === 0) {
       atividades.value = [
         { id: 1, atividade: 'Plantio', produto: 'Soja', quantidade: 500, unidade_medida: 'kg', lavoura: 'Setor A' },
         { id: 2, atividade: 'Colheita', produto: 'Milho', quantidade: 1200, unidade_medida: 'kg', lavoura: 'Setor B' }
       ];
    }
  }
};

onMounted(() => {
  carregarDados();

  loopDeAtualizacao = setInterval(() => {
    carregarDados();
  }, 2000);
});

onUnmounted(() => {
  clearInterval(loopDeAtualizacao);
});
</script>
