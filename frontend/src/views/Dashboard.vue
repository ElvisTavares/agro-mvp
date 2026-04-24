<template>
  <div class="space-y-8 pb-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">DASHBOARD</h1>
        <div class="flex flex-wrap items-center gap-4 mt-3">
          <span class="flex items-center gap-2 bg-[#102a20] text-[#00c569] px-3 py-1.5 rounded-full text-xs font-bold tracking-widest border border-[#00c569]/20">
            <div class="w-2 h-2 rounded-full bg-[#00c569] animate-pulse"></div>
            LIVE SYSTEM
          </span>
          <span class="text-gray-400 text-sm font-medium tracking-wide">Uptime: 412:22:04</span>
        </div>
      </div>
      <div class="text-left md:text-right">
        <p class="text-sm md:text-md text-gray-300 font-medium tracking-widest uppercase">24 MAY 2024</p>
        <p class="text-xs md:text-sm text-gray-500 mt-1 font-medium">Last Synced: 2 mins ago</p>
      </div>
    </div>

    <!-- Top Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Temperatura/Clima -->
      <div class="bg-[#161922] rounded-2xl p-5 border border-[#222733] text-white flex flex-col justify-between shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xs font-bold text-gray-400 tracking-wider">TEMPERATURA/CLIMA</h2>
          <Cloud class="w-5 h-5 text-gray-600 opacity-50" />
        </div>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <div class="text-4xl lg:text-5xl font-black tracking-tighter">
            12<span class="text-[#00c569]">°</span><span class="text-[#00c569]">C</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Droplet class="w-4 h-4 text-[#00c569]" />
              <div>
                <p class="text-[10px] text-gray-500 font-bold tracking-widest">UMIDADE</p>
                <p class="text-sm font-bold">42%</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Wind class="w-4 h-4 text-[#00c569]" />
              <div>
                <p class="text-[10px] text-gray-500 font-bold tracking-widest">VENTO</p>
                <p class="text-sm font-bold">9m/s</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-[10px] font-bold text-gray-500 tracking-widest mb-3">PRÓXIMAS 24H</h3>
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(temp, idx) in proximas24h" :key="idx" class="bg-[#0f1115] py-2 lg:py-3 rounded-xl flex flex-col items-center justify-center border border-[#1e2330]">
              <p class="text-[10px] text-gray-500 font-bold mb-1">{{ temp.time }}</p>
              <p class="text-sm lg:text-md font-bold">{{ temp.deg }}°</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Desempenho por Equipe -->
      <div class="bg-[#161922] rounded-2xl p-5 border border-[#222733] text-white flex flex-col shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xs font-bold text-gray-400 tracking-wider">DESEMPENHO</h2>
          <div class="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-widest">
            <div class="w-2.5 h-2.5 bg-[#00c569] rounded-sm"></div>
            TONELADAS/H
          </div>
        </div>
        <div class="flex-1 flex items-end justify-around px-2 pb-2 mt-4">
          <!-- Alfa -->
          <div class="w-8 sm:w-12 lg:w-10 xl:w-12 flex flex-col items-center gap-3 group">
            <div class="w-full bg-[#00c569] rounded-t-lg h-28 transition-all group-hover:bg-[#00e37a]"></div>
            <span class="text-[10px] font-bold text-gray-400 tracking-widest">ALFA</span>
          </div>
          <!-- Beta -->
          <div class="w-8 sm:w-12 lg:w-10 xl:w-12 flex flex-col items-center gap-3 group">
            <div class="w-full bg-[#0d8450] rounded-t-lg h-16 transition-all group-hover:bg-[#0fa664]"></div>
            <span class="text-[10px] font-bold text-gray-400 tracking-widest">BETA</span>
          </div>
          <!-- Gama -->
          <div class="w-8 sm:w-12 lg:w-10 xl:w-12 flex flex-col items-center gap-3 group">
            <div class="w-full bg-[#00c569] rounded-t-lg h-32 transition-all group-hover:bg-[#00e37a]"></div>
            <span class="text-[10px] font-bold text-gray-400 tracking-widest">GAMA</span>
          </div>
          <!-- Delta -->
          <div class="w-8 sm:w-12 lg:w-10 xl:w-12 flex flex-col items-center gap-3 group">
            <div class="w-full bg-[#202533] rounded-t-lg h-10 transition-all group-hover:bg-[#2a3040]"></div>
            <span class="text-[10px] font-bold text-gray-400 tracking-widest">DELTA</span>
          </div>
        </div>
      </div>

      <!-- Gráfico de Tendência -->
      <div class="bg-[#161922] rounded-2xl p-5 border border-[#222733] text-white flex flex-col shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xs font-bold text-gray-400 tracking-wider">TENDÊNCIA SEMANAL</h2>
          <TrendingUp class="w-5 h-5 text-[#00c569]" />
        </div>
        <div class="flex-1 flex flex-col justify-end mt-4">
          <div class="flex items-end justify-between h-32 gap-1.5 px-2">
            <div class="w-full bg-[#202533] rounded-t h-[30%]"></div>
            <div class="w-full bg-[#202533] rounded-t h-[45%]"></div>
            <div class="w-full bg-[#00c569] rounded-t h-[65%]"></div>
            <div class="w-full bg-[#00c569] rounded-t h-[75%]"></div>
            <div class="w-full bg-[#00e37a] rounded-t h-[90%]"></div>
            <div class="w-full bg-[#00e37a] rounded-t h-[100%] shadow-[0_0_15px_rgba(0,227,122,0.3)]"></div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-500 font-bold mt-4 px-2">
            <span>SEG</span>
            <span>TER</span>
            <span>QUA</span>
            <span>QUI</span>
            <span>SEX</span>
            <span>SAB</span>
          </div>
        </div>
      </div>

      <!-- Produtividade Geral -->
      <div class="bg-[#161922] rounded-2xl p-5 border border-[#222733] text-white flex flex-col justify-between shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xs font-bold text-gray-400 tracking-wider">PRODUTIVIDADE GERAL</h2>
          <Activity class="w-5 h-5 text-[#00c569]" />
        </div>
        
        <div class="flex flex-col items-center justify-center flex-1">
          <div class="relative w-32 h-32 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                class="text-[#202533]"
                stroke-width="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="text-[#00c569]"
                stroke-dasharray="88, 100"
                stroke-width="3"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="absolute flex flex-col items-center justify-center">
              <span class="text-3xl font-black text-white">88%</span>
              <span class="text-[10px] font-bold text-[#00c569] tracking-widest mt-1">META BATIDA</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status das Equipes -->
    <div class="pt-2">
      <h2 class="text-sm font-bold text-gray-400 tracking-widest mb-4">STATUS DAS EQUIPES EM CAMPO</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <!-- EQP ALFA -->
        <div class="bg-[#161922] rounded-xl p-4 border border-[#222733] border-l-4 border-l-[#00c569] text-white shadow-md flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-sm tracking-wide">ALFA</h3>
            <span class="bg-[#102a20] text-[#00c569] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border border-[#00c569]/20">ATIVO</span>
          </div>
          <div class="mb-3">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">ATIVIDADE</p>
            <p class="text-xs font-medium tracking-wide truncate">Colheita de Soja</p>
          </div>
          <div class="mb-4">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">LOCALIZAÇÃO</p>
            <p class="text-xs font-medium flex items-center gap-1 text-gray-300 truncate">
              <MapPin class="w-3 h-3 text-gray-500" />
              Gleba 04 - Sul
            </p>
          </div>
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[9px] text-gray-500 font-bold tracking-widest">PROGRESSO</span>
              <span class="text-[10px] font-bold text-gray-400">60%</span>
            </div>
            <div class="w-full h-1 bg-[#0f1115] rounded-full overflow-hidden">
              <div class="h-full bg-[#00c569] w-[60%]"></div>
            </div>
          </div>
        </div>

        <!-- EQP BETA -->
        <div class="bg-[#161922] rounded-xl p-4 border border-[#222733] border-l-4 border-l-[#00c569] text-white shadow-md flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-sm tracking-wide">BETA</h3>
            <span class="bg-[#102a20] text-[#00c569] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border border-[#00c569]/20">ATIVO</span>
          </div>
          <div class="mb-3">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">ATIVIDADE</p>
            <p class="text-xs font-medium tracking-wide truncate">Plantio de Milho</p>
          </div>
          <div class="mb-4">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">LOCALIZAÇÃO</p>
            <p class="text-xs font-medium flex items-center gap-1 text-gray-300 truncate">
              <MapPin class="w-3 h-3 text-gray-500" />
              Gleba 02 - Leste
            </p>
          </div>
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[9px] text-gray-500 font-bold tracking-widest">PROGRESSO</span>
              <span class="text-[10px] font-bold text-gray-400">45%</span>
            </div>
            <div class="w-full h-1 bg-[#0f1115] rounded-full overflow-hidden">
              <div class="h-full bg-[#00c569] w-[45%]"></div>
            </div>
          </div>
        </div>

        <!-- EQP GAMA -->
        <div class="bg-[#161922] rounded-xl p-4 border border-[#222733] border-l-4 border-l-[#00c569] text-white shadow-md flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-sm tracking-wide">GAMA</h3>
            <span class="bg-[#102a20] text-[#00c569] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border border-[#00c569]/20">ATIVO</span>
          </div>
          <div class="mb-3">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">ATIVIDADE</p>
            <p class="text-xs font-medium tracking-wide truncate">Pulverização</p>
          </div>
          <div class="mb-4">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">LOCALIZAÇÃO</p>
            <p class="text-xs font-medium flex items-center gap-1 text-gray-300 truncate">
              <MapPin class="w-3 h-3 text-gray-500" />
              Setor Norte
            </p>
          </div>
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[9px] text-gray-500 font-bold tracking-widest">PROGRESSO</span>
              <span class="text-[10px] font-bold text-gray-400">80%</span>
            </div>
            <div class="w-full h-1 bg-[#0f1115] rounded-full overflow-hidden">
              <div class="h-full bg-[#00c569] w-[80%]"></div>
            </div>
          </div>
        </div>

        <!-- EQP DELTA -->
        <div class="bg-[#161922] rounded-xl p-4 border border-[#222733] border-l-4 border-l-[#f97316] text-white shadow-md flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-sm tracking-wide">DELTA</h3>
            <span class="bg-[#2a1b12] text-[#f97316] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border border-[#f97316]/20">STANDBY</span>
          </div>
          <div class="mb-3">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">ATIVIDADE</p>
            <p class="text-xs font-medium tracking-wide truncate">Abastecimento</p>
          </div>
          <div class="mb-4">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">LOCALIZAÇÃO</p>
            <p class="text-xs font-medium flex items-center gap-1 text-gray-300 truncate">
              <MapPin class="w-3 h-3 text-gray-500" />
              Pátio Central
            </p>
          </div>
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[9px] text-gray-500 font-bold tracking-widest">PROGRESSO</span>
              <span class="text-[10px] font-bold text-gray-400">35%</span>
            </div>
            <div class="w-full h-1 bg-[#0f1115] rounded-full overflow-hidden">
              <div class="h-full bg-[#f97316] w-[35%]"></div>
            </div>
          </div>
        </div>

        <!-- EQP ECHO -->
        <div class="bg-[#161922] rounded-xl p-4 border border-[#222733] border-l-4 border-l-[#8b5cf6] text-white shadow-md flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-sm tracking-wide">ECHO</h3>
            <span class="bg-[#1d162f] text-[#a78bfa] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border border-[#8b5cf6]/20">TRÂNSITO</span>
          </div>
          <div class="mb-3">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">ATIVIDADE</p>
            <p class="text-xs font-medium tracking-wide truncate">Deslocamento</p>
          </div>
          <div class="mb-4">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">LOCALIZAÇÃO</p>
            <p class="text-xs font-medium flex items-center gap-1 text-gray-300 truncate">
              <MapPin class="w-3 h-3 text-gray-500" />
              Via Principal
            </p>
          </div>
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[9px] text-gray-500 font-bold tracking-widest">PROGRESSO</span>
              <span class="text-[10px] font-bold text-gray-400">10%</span>
            </div>
            <div class="w-full h-1 bg-[#0f1115] rounded-full overflow-hidden">
              <div class="h-full bg-[#8b5cf6] w-[10%]"></div>
            </div>
          </div>
        </div>

        <!-- EQP FOX -->
        <div class="bg-[#161922] rounded-xl p-4 border border-[#222733] border-l-4 border-l-[#3b82f6] text-white shadow-md flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-sm tracking-wide">FOX</h3>
            <span class="bg-[#141b2e] text-[#60a5fa] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border border-[#3b82f6]/20">MANUTENÇÃO</span>
          </div>
          <div class="mb-3">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">ATIVIDADE</p>
            <p class="text-xs font-medium tracking-wide truncate">Reparo Hidráulico</p>
          </div>
          <div class="mb-4">
            <p class="text-[9px] text-gray-500 font-bold mb-1 tracking-widest">LOCALIZAÇÃO</p>
            <p class="text-xs font-medium flex items-center gap-1 text-gray-300 truncate">
              <MapPin class="w-3 h-3 text-gray-500" />
              Oficina A1
            </p>
          </div>
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[9px] text-gray-500 font-bold tracking-widest">PROGRESSO</span>
              <span class="text-[10px] font-bold text-gray-400">12%</span>
            </div>
            <div class="w-full h-1 bg-[#0f1115] rounded-full overflow-hidden">
              <div class="h-full bg-[#3b82f6] w-[12%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de Atividades (Histórico) -->
    <div class="pt-4 relative">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-sm font-bold text-gray-400 tracking-widest uppercase">Histórico de Atividades</h2>
        <a href="#" class="text-sm font-medium text-[#00c569] hover:text-[#00e37a] flex items-center gap-1 transition-colors">
          Ver relatório completo <ChevronRight class="w-4 h-4"/>
        </a>
      </div>
      
      <div class="bg-[#161922] rounded-2xl border border-[#222733] overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
          <table class="min-w-full text-white">
            <thead class="bg-[#13151c] border-b border-[#222733]">
              <tr>
                <th class="px-6 py-5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Atividade
                </th>
                <th class="px-6 py-5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Produto
                </th>
                <th class="px-6 py-5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Quantidade
                </th>
                <th class="px-6 py-5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Lavoura
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#222733]">
              <tr v-if="atividades.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500 text-sm">
                  Nenhuma atividade recente encontrada.
                </td>
              </tr>
              <tr
                v-for="item in atividades"
                :key="item.id"
                class="hover:bg-[#1a1e28] transition-colors"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <div class="p-2.5 rounded-lg bg-[#111c21] border border-[#222733]">
                      <component :is="getIconForActivity(item.atividade)" class="w-5 h-5 text-gray-400" />
                    </div>
                    <span class="font-medium text-gray-200 tracking-wide">
                      {{ item.atividade }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5 font-medium text-gray-400 tracking-wide">
                  {{ item.produto }}
                </td>
                <td class="px-6 py-5 text-gray-400 tracking-wide">
                  {{ item.quantidade }} {{ item.unidade_medida }}
                </td>
                <td class="px-6 py-5 text-gray-400 tracking-wide">{{ item.lavoura }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Cloud, Droplet, Wind, MapPin, ChevronRight, Tractor, Target, Shield, Sprout, Combine, TrendingUp, Activity } from "lucide-vue-next";

const atividades = ref([]);
let loopDeAtualizacao;

const proximas24h = [
  { time: '14:00', deg: 14 },
  { time: '18:00', deg: 10 },
  { time: '22:00', deg: 8 },
  { time: '02:00', deg: 6 },
];

const getIconForActivity = (atividade) => {
  const norm = atividade.toLowerCase();
  if (norm.includes('colheita')) return Combine;
  if (norm.includes('plantio')) return Sprout;
  if (norm.includes('pulverização') || norm.includes('spraying')) return Target;
  if (norm.includes('preparo')) return Tractor;
  return Shield; // default icon
};

const carregarDados = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/atividades");
    if (response.ok) {
      atividades.value = await response.json();
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    // Fallback pra demonstração caso API não exista, simulando a imagem
    if(atividades.value.length === 0) {
       atividades.value = [
         { id: 1, atividade: 'Harvest', produto: 'Milho Híbrido', quantidade: 450, unidade_medida: 'Ton', lavoura: 'Fazenda Norte - L2' },
         { id: 2, atividade: 'Spraying', produto: 'Herbicida X-Treme', quantidade: '2,400', unidade_medida: 'L', lavoura: 'Vale Verde - G04' },
         { id: 3, atividade: 'Prep', produto: 'N/A - Solo', quantidade: 120, unidade_medida: 'Ha', lavoura: 'Planalto - P01' }
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
