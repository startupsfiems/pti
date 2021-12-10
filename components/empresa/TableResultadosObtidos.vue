<template>
  <div class="col-lg-8 offset-lg-2 col-12 mt-5">
    <div v-if="resultados" class="table-resultados-obtidos box-branco">
      <table class="w-100">
        <caption class="titulo">
          Resultados Obtidos
        </caption>
        <tr class="text-center legendas s-gbl">
          <th>Dimensão</th>
          <th>Mínima</th>
          <th>Máxima</th>
          <th>Pontuação</th>
          <th>SCORE<br />(empresa)</th>
          <th>Média do Grupo</th>
          <th class="no-right">
            SCORE<br />(grupo)
          </th>
        </tr>
        <tr v-for="resultado in resultados" :key="resultado.nomeDimensao" class="text-center no-bottom gbl dados">
          <td>{{ resultado.nomeDimensao }}</td>
          <td>0</td>
          <td v-if="resultado.nomeDimensao === 'Pessoas'">
            15
          </td>
          <td v-else-if="resultado.nomeDimensao === 'Gestão'">
            8
          </td>
          <td v-else-if="resultado.nomeDimensao === 'SST'">
            11
          </td>
          <td v-else>
            6
          </td>
          <td>{{ resultado.pontuacaoEmpresa.toFixed(2) }}</td>
          <td>{{ resultado.scoreEmpresaFormatado }}</td>
          <td>{{ resultado.grupoCNAEMedia.toFixed(2) }}</td>
          <td class="no-right">
            {{ resultado.grupoCNAEScoreFormatado }}
          </td>
        </tr>
      </table>
    </div>
    <div v-if="resultados" class="box-branco mt-4">
      <table class="w-100">
        <tr class="text-center no-top legendas s-gbl">
          <th>Média por <br /> dimensão</th>
          <th>Pontuação <br /> empresa</th>
          <th>% de Maturidade</th>
          <th class="no-right">
            Benchmark da Divisão
          </th>
        </tr>
        <tr v-for="resultado in resultados" :key="resultado.nomeDimensao" class="text-center no-bottom gbl dados">
          <td>{{ resultado.nomeDimensao }}</td>
          <td>{{ resultado.pontuacaoEmpresa.toFixed(2) }}</td>
          <td>{{ resultado.scoreEmpresaFormatado }}</td>
          <td>{{ resultado.grupoCNAEMedia.toFixed(2) }}</td>
          <td class="no-right">
            {{ resultado.grupoCNAEScoreFormatado }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableResultadosObtidos',
  props: {
    resultados: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.box-branco {
  overflow-x: auto;
}
.table-resultados-obtidos table caption {
  text-align: center;
  font-size: 18px;
  font-family: 'Gotham-bold';
  color: #053f5c;
  caption-side: top;
}
.box-branco {
    padding: 0;
}
tr {
  border-top: 0.75px solid #33434C;
  border-bottom: 0.75px solid #33434C;
  height: 40px;
}
.no-bottom {
  border-bottom: 0;
}
.no-top {
  border-top: 0;
}
.no-right {
  border-right: 0 !important;
}
.legendas th, .dados td {
  border-right: 0.75px solid #33434C;
}
</style>
