<template>
  <div class="col-xl-4 col-12 mt-5 bottom-orange-box">
    <div class="status-box orange-border s-gbl">
      <h5>Status:</h5>
      <section>
        <label for="status-etapa" class="gbl">Em andamento</label>
        <div id="status-etapa" class="row-azul-claro h-27 m-gbl">
          {{ etapa }}
        </div>
      </section>
      <section>
        <label for="status-visita" class="gbl">Última visita</label>
        <div id="status-visita" class="row-azul-claro h-27 m-gbl">
          20/09/2021
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StatusHistoricoResultado',
  computed: {
    ...mapState({
      etapa: state => state.empresa.dados.historico.etapa
    })
  }
}
</script>

<style scoped>
.bottom-orange-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.status-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.status-box h5 {
  font-size: 16px;
  margin-top: 4px;
}

.status-box label {
  font-size: 12px;
}

.status-box div {
  font-size: 13px;
}

.status-box #status-etapa,
.status-box #status-visita {
  padding: 0;
  width: 120px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-box .row-azul-claro {
  width: 146px;
}
.status-box section {
  text-align: center;
  position: relative;
  padding-bottom: 35px;
}
.status-box section label {
  margin: 15px 0 0 0;
}
</style>
