<template>
  <div class="col-lg-8 offset-lg-2 col-12 mt-5">
    <div class="table-metodologia box-branco">
      <table class="w-100">
        <caption class="titulo">
          Metodologia do Diagnóstico
        </caption>
        <tr class="no-left no-right">
          <th class="s-gbl">Resposta</th>
          <th class="b-left b-right s-gbl">
            SCORE
          </th>
          <table class="situacao-observada w-100">
            <caption>
              Situação Observada
            </caption>
            <tr class="s-gbl light-blue no-bottom no-right no-left">
              <th class="w-50">
                Gerenciais
              </th>
              <th class="b-left">
                SST
              </th>
            </tr>
          </table>
        </tr>
        <!-- 1º row de informações -->
        <tr class="gbl no-left no-right">
          <td>1</td>
          <td>0,00</td>
          <table class="w-100">
            <tr class="no-top no-bottom no-right no-left">
              <td class="no-left w-50">
                Reativa
              </td>
              <td class="no-right">
                Reativa
              </td>
            </tr>
          </table>
        </tr>
        <!-- 2º row de informações -->
        <tr class="gbl no-left no-right">
          <td>2</td>
          <td>0,33</td>
          <table class="w-100">
            <tr class="no-bottom no-top no-right no-left">
              <td class="w-50" />
              <td class="no-right">
                Legalista
              </td>
            </tr>
          </table>
        </tr>
        <!-- 3º row de informações -->
        <tr class="gbl no-left no-right">
          <td>3</td>
          <td>0,67</td>
          <table class="w-100">
            <tr class="no-top no-bottom no-right no-left">
              <td class="no-left w-50">
                Proativa
              </td>
              <td class="no-right">
                Proativa
              </td>
            </tr>
          </table>
        </tr>
        <!-- 4º row de informações -->
        <tr class="gbl no-bottom no-left no-right">
          <td class="no-left no-bottom">
            4
          </td>
          <td class="no-bottom">
            1,00
          </td>
          <table class="w-100">
            <tr class="no-top no-bottom no-right no-left">
              <td class="no-left no-top no-bottom w-50">
                Estratégica
              </td>
              <td class="no-top no-bottom no-right">
                Estratégica
              </td>
            </tr>
          </table>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMetodologiaDiagnostico'
}
</script>

<style scoped>
.table-metodologia {
  text-align: center;
}
.table-metodologia table caption {
  text-align: center;
  font-size: 18px;
  font-family: 'Gotham-bold';
  color: #053f5c;
  caption-side: top;
}
tr {
  border: 0.75px solid #33434C;
  height: 40px;
}
td {
  border-right: 0.75px solid #33434C;
}
.box-branco {
  padding: 0;
}
.light-blue {
  color: #58aadb;
}
.no-left {
  border-left: unset;
}
.no-top {
  border-top: unset;
}
.no-bottom {
  border-bottom: unset;
}
.no-right {
  border-right: unset;
}
.b-left {
  border-left:  0.75px solid #33434C;
}
.b-right {
  border-right: 0.75px solid #33434C;
}
/* .b-top {
  border-top: 0.75px solid #33434C;
  height: 40px;
} */
</style>
