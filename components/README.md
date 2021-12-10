A rota automatica não funciona para componentes criados dentro de pastas, como components/empresa/HistoricoResultados.vue

Para utilizar um componente aninhado, não é necessário criar sua rota, mas é preciso importá-lo no arquivo desejado de maneira tradicional:
    Por exemplo:
    import HistoricoResultados from '~/components/empresa/HistoricoResultados.vue'
    