<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Painel do Agronegócio</h1>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Atividade
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Produto
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Quantidade
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Lavoura
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="item in atividades"
            :key="item.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold"
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const atividades = ref([]);
let loopDeAtualizacao;

const carregarDados = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/atividades");
    atividades.value = await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

onMounted(() => {
  carregarDados(); // Carrega a primeira vez

  // O TRUQUE DO VÍDEO: Fica perguntando pra API a cada 2 segundos
  loopDeAtualizacao = setInterval(() => {
    carregarDados();
  }, 2000);
});

onUnmounted(() => {
  // Limpa o loop se sair da tela para não vazar memória
  clearInterval(loopDeAtualizacao);
});
</script>
