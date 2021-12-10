<template>
  <div class="col-lg-8 offset-lg-2 col-12 mt-5">
    <div class="table-resultados-obtidos box-branco">
      <table class="w-100 text-center">
        <tr class="no-top legendas s-gbl">
          <th />
          <th>Etapa Inicial</th>
          <th>Etapa 2</th>
          <th>Etapa 3</th>
          <th>Etapa 4</th>
          <th>Etapa Final</th>
          <th class="no-right">
            Meta Anual
          </th>
        </tr>
        <tr class="dados gbl">
          <td><strong class="m-gbl">(A)</strong> Produtividade por <br /> funcionário</td>
          <td v-for="(produtividade, index) in dadosEtapas.produtividadeFuncionarioEmpresaFormatado" :key="index">
            {{ produtividade }}
          </td>
          <td class="no-right">
            {{ dadosEtapas.produtividadeFuncionarioMetaFormatado[4] }}
          </td>
        </tr>
        <tr class="dados gbl">
          <td><strong class="m-gbl">(B)</strong> Taxa de <br /> absenteísmo</td>
          <td v-for="(taxa, index) in dadosEtapas.taxaAbsenteismoEmpresaFormatado" :key="index">
            {{ taxa }}
          </td>
          <td class="no-right">
            {{ dadosEtapas.taxaAbsenteismoMetaFormatado[4] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableEtapas',
  props: {
    dadosEtapas: {
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
    padding: 0;
    overflow-x: auto;
}
tr {
    height: 40px;
    border-top: 0.75px solid #33434C;
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
