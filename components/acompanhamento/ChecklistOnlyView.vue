<template>
  <div class="checklist-only-view box-branco">
    <ul class="text-left">
      <li v-for="tarefa in tarefas" :key="tarefa.tarefaId" class="gbl" :class="{'realizado': tarefa.realizada}">
        <div v-if="tarefa.realizada">
          <input type="checkbox" checked disabled />{{ tarefa.nomeTarefa }}
        </div>
        <div v-else>
          <input type="checkbox" disabled />{{ tarefa.nomeTarefa }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChecklistOnlyView',
  props: {
    tarefas: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
    .checklist-only-view {
        margin: auto;
        max-width: 80%;
        background-color: unset;
        border: 0;
    }
    .box-branco {
        padding: 40px 45px;
    }
    .checklist-only-view ul {
        list-style-type: none;
        padding: 0;
    }
    .realizado {
        text-decoration-line: line-through;
    }
    li {
        margin-bottom: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    li > div {
      display: flex;
    }
    li > div > input {
        height: 18px;
        width: 18px;
        margin-right: 14px;
    }
    @media (max-width: 1300px) {
        .checklist-only-view {
            max-width: 100%;
        }
    }
    @media (max-width: 918px) {
        .gbl {
            font-size: 12px;
        }
        .box-branco {
            padding: 20px 25px;
        }
        li {
            margin-bottom: 25px;
        }
    }
    @media (max-width: 768px) {
        .checklist-only-view ul {
            margin-top: 1rem;
        }
    }
</style>
