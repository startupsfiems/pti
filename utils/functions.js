export default function popularFiltros(filtersHome, filtersFromServer, filtersToDisplay) {
  filtersToDisplay.forEach((filter) => {
    filter.push({ text: 'Nenhuma opção', value: null })
  })
  if (filtersHome === 'PainelAgente') {
    filtersFromServer.etapas.forEach((etapa) => {
      filtersToDisplay[0].push({ text: etapa.nome, value: etapa.id })
    })
    filtersFromServer.regioes.forEach((regiao) => {
      filtersToDisplay[1].push({ text: regiao.nome, value: regiao.id })
    })
    filtersFromServer.divisaoCNAE.forEach((divisao) => {
      filtersToDisplay[2].push({ text: divisao.nome, value: divisao.id })
    })
    filtersFromServer.grupoCNAE.forEach((grupo) => {
      filtersToDisplay[3].push({ text: grupo.nome, value: grupo.id })
    })
    filtersFromServer.portes.forEach((porte) => {
      filtersToDisplay[4].push({ text: porte.nome, value: porte.id })
    })
  } else {
    filtersFromServer.etapas.forEach((etapa) => {
      filtersToDisplay[0].push({ text: etapa.nome, value: etapa.id })
    })
    filtersFromServer.regioes.forEach((regiao) => {
      filtersToDisplay[2].push({ text: regiao.nome, value: regiao.id })
    })
    filtersFromServer.divisaoCNAE.forEach((divisao) => {
      filtersToDisplay[3].push({ text: divisao.nome, value: divisao.id })
    })
    filtersFromServer.grupoCNAE.forEach((grupo) => {
      filtersToDisplay[4].push({ text: grupo.nome, value: grupo.id })
    })
    filtersFromServer.portes.forEach((porte) => {
      filtersToDisplay[5].push({ text: porte.nome, value: porte.id })
    })
    filtersFromServer.dimensoes.forEach((porte) => {
      filtersToDisplay[6].push({ text: porte.nome, value: porte.id })
    })
  }
  return filtersToDisplay
}
