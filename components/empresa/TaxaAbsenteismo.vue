<template>
  <div class="row row-azul-claro h-40 m-gbl">
    <div class="col-2 etapa-overflow">
      {{ taxasAbsenteismo[0] }}
    </div>
    <div class="col-2 etapa-overflow">
      {{ taxasAbsenteismo[1] }}
    </div>
    <div class="col-2 etapa-overflow">
      {{ taxasAbsenteismo[2] }}
    </div>
    <div class="col-2 etapa-overflow">
      {{ taxasAbsenteismo[3] }}
    </div>
    <div class="col-2 etapa-overflow">
      {{ taxasAbsenteismo[4] }}
    </div>
    <div class="col-2 etapa-overflow">
      <!-- A meta é chumbada no index 4 mesmo -->
      {{ metaAbsenteismo[4] }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TaxaAbsenteismo',
  props: {
  },
  computed: {
    ...mapState({
      taxasAbsenteismo: state => state.empresa.dados.historico.taxaAbsenteismoEmpresaFormatado,
      metaAbsenteismo: state => state.empresa.dados.historico.taxaAbsenteismoMetaFormatado
    })
  }
}
</script>

<style scoped>
.row-azul-claro {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.box-middle {
  z-index: 999;
  height: 170px;
  line-height: 170px;
  border: 2px solid #F7AD19;
  border-radius: 10px;
}
.etapa-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
