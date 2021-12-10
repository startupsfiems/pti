<template>
  <div class="box-content">
    <h1 class="titulo">
      {{ titulo }}
    </h1>

    <section class="infos">
      <div class="col-2">
        <p class="nome-titlo">
          Ação
        </p>
        <p class="nome-valor">
          {{ nomeAcao }}
        </p>
      </div>

      <div class="col-2">
        <p class="nome-titlo">
          Responsável
        </p>
        <p class="nome-valor">
          {{ responsavel }}
        </p>
      </div>

      <div class="col-2">
        <p class="nome-titlo">
          Local
        </p>
        <p class="nome-valor">
          {{ local }}
        </p>
      </div>

      <div class="col-2">
        <p class="nome-titlo">
          Início
        </p>
        <p class="nome-valor">
          {{ inicio }}
        </p>
      </div>

      <div class="col-2">
        <p class="nome-titlo">
          Conclusão
        </p>
        <p class="nome-valor">
          {{ conclusao }}
        </p>
      </div>

      <div class="col-2">
        <p class="nome-titlo">
          Orçamento
        </p>
        <p class="nome-valor">
          {{ orcamento }}
        </p>
      </div>
    </section>
    <div class="col-6 mb-3">
      <p class="nome-titlo">
        Objetivo
      </p>
      <p class="nome-valor">
        {{ objetivo }}
      </p>
    </div>

    <section class="col-12">
      <div>
        <p class="nome-titlo">
          Descrição de como será realizado
        </p>
        <p class="nome-valor">
          {{ descricao }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    titulo: { type: String, required: true },
    nomeAcao: { type: String, required: true },
    responsavel: { type: String, required: true },
    local: { type: String, required: true },
    inicio: { type: String, required: true },
    conclusao: { type: String, required: true },
    orcamento: { type: String, required: true },
    objetivo: { type: String, required: true },
    descricao: { type: String, required: true }
  }
})
</script>

<style scoped>
p {
  margin: 0;
}
.box-content {
  border-top: 1px solid var(--text-title);
  padding: 2rem;
  width: 100%;
}

.box-content h1 {
  font-family: Gotham-bold;
  color: var(--main-light);
  font-size: 1.12rem;
  margin-bottom: 1.25rem;
}

section.infos {
  display: flex;
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; */
  /* gap: 1rem 1.6rem; */
}

section.infos div:last-of-type {
  margin-bottom: 1.6rem;
}

.nome-titlo {
  margin-bottom: 0.5rem;
  font-family: Gotham-light;
  color: var(--text-title);
  font-size: 0.75rem;
}

.nome-valor {
  font-family: Gotham-bold;
  color: var(--text-title);
  font-size: 0.82rem;
}
</style>
