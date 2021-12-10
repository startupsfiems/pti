import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'

export default function geraPDF(imagem, dados) {
  const { dadosEmpresa, dadosRepresentante, resultadosDimensoes, scoreGeral, dadosHistorico, listaAcoes } = dados

  // eslint-disable-next-line new-cap
  const doc = new jsPDF('p', 'px', 'a4')
  const width = doc.internal.pageSize.getWidth()

  cabecalho(doc, imagem.logo, dadosHistorico.etapa, width)
  geraQuadroEmpresaRepresentante(doc, 80, width, dadosEmpresa, dadosRepresentante)
  geraTextoCentral(doc, 165)
  geraMetodologiaDiagnostico(doc, 220, width)
  geraResultadosObtidosI(doc, 355, width, resultadosDimensoes.resultados)
  geraResultadosObtidosII(doc, 465, width, resultadosDimensoes.resultados)
  geraScore(doc, 560, width, scoreGeral)
  numeroPagina(doc, 1, width)

  doc.addPage('a4', 'p')
  cabecalho(doc, imagem.logo, dadosHistorico.etapa, width)
  geraTabelaProdAbsent(doc, 80, width, dadosHistorico)
  numeroPagina(doc, 2, width)

  if (listaAcoes != null && listaAcoes.length > 0) {
    doc.addPage('a4', 'p')
    cabecalho(doc, imagem.logo, dadosHistorico.etapa, width)
    geraAcoes(doc, 80, width, listaAcoes)
    numeroPagina(doc, 3, width)
  }

  geraGraficos(doc)
}

function cabecalho(doc, logo, etapa, width) {
  doc.addImage(logo, 'PNG', 176, 20, 95, 24)
  doc.setFontSize(16)
  doc.text('Resultados - ' + etapa, width / 2, 65, { align: 'center' })
}
function geraTextoCentral(doc, altura) {
  doc.setFontSize(12)
  doc.text('O Programa de Transformação da Indústria', 50, altura)

  doc.setFontSize(10)
  const textoCentral = doc.splitTextToSize('É uma iniciativa para alavancar micro e pequenas indústrias do Mato Grosso do Sul. Incorpora uma proposta ' +
    'arrojada com foco na produtividade, na garantia da integridade organizacional, inovação e no bem-estar dos funcionários. Um dos ' +
    'pilares do programa é visualizar a segurança e a saúde como área e processo estratégico rumo ao desenvolvimento de uma ' +
    'Cultura da Segurança.', 346)
  doc.text(textoCentral, 50, altura + 10)
}
function geraQuadroEmpresaRepresentante(doc, altura, width, dadosEmpresa, dadosRepresentante) {
  // retângulo
  doc.roundedRect(30, altura, width - 60, 65, 3, 3, 'S')

  // texto estático
  doc.setFontSize(10)
  doc.setFont('Helvetica', 'bold')
  doc.text('Dados da Empresa', 35, 10 + altura)
  doc.text('Dados do Representante', 260, 10 + altura)

  // texto dados
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('CNPJ: ' + dadosEmpresa.cnpjFormatado, 35, 20 + altura)
  doc.text('Razão Social: ' + dadosEmpresa.razaoSocial, 35, 30 + altura)
  doc.text('CNAE Principal: ' + dadosEmpresa.cnaePrincipalFormatado, 35, 40 + altura)
  doc.text('Grau de risco: ' + dadosEmpresa.grauDeRisco, 35, 50 + altura)
  doc.text('Optante pelo Simples Nacional: ' + dadosEmpresa.optanteSimples, 35, 60 + altura)

  doc.text('CPF: ' + dadosRepresentante.cpfFormatado, 260, 20 + altura)
  doc.text('Nome: ' + dadosRepresentante.nome, 260, 30 + altura)
  doc.text('E-mail: ' + dadosRepresentante.email, 260, 40 + altura)
  doc.text('Whatsapp: ' + dadosRepresentante.whatsApp, 260, 50 + altura)
  doc.text('Cargo: ' + dadosRepresentante.cargo, 260, 60 + altura)
  // fim texto dados
}
function geraMetodologiaDiagnostico(doc, altura, width) {
  // retangulo
  doc.roundedRect(30, altura, width - 60, 120, 3, 3, 'S')

  // linhas horizontais
  doc.line(30, 20 + altura, width - 30, 20 + altura)
  doc.line(30, 60 + altura, width - 30, 60 + altura)
  doc.line(30, 75 + altura, width - 30, 75 + altura)
  doc.line(30, 90 + altura, width - 30, 90 + altura)
  doc.line(30, 105 + altura, width - 30, 105 + altura)
  doc.line(200, 40 + altura, width - 30, 40 + altura)

  // linhas verticais
  doc.line(115, 20 + altura, 115, 120 + altura)
  doc.line(200, 20 + altura, 200, 120 + altura)
  doc.line((200 + width - 30) / 2, 40 + altura, (200 + width - 30) / 2, 120 + altura)

  // texto estático
  doc.setFontSize(12)
  doc.text('Metodologia do Diagnóstico', width / 2, 13 + altura, { align: 'center' })
  doc.setFontSize(10)
  doc.text('Resposta', 72, 42 + altura, { align: 'center' })
  doc.text('SCORE', 72 + 85, 42 + altura, { align: 'center' })
  doc.text('Situação Observada', (200 + width - 30) / 2, 32 + altura, { align: 'center' })
  doc.text('Gerenciais', 254, 52 + altura, { align: 'center' })
  doc.text('SST', 362, 52 + altura, { align: 'center' })

  doc.setFontSize(8)
  doc.text('1', 72, 70 + altura, { align: 'center' })
  doc.text('2', 72, 85 + altura, { align: 'center' })
  doc.text('3', 72, 100 + altura, { align: 'center' })
  doc.text('4', 72, 115 + altura, { align: 'center' })

  doc.text('0,00', 157, 70 + altura, { align: 'center' })
  doc.text('0,33', 157, 85 + altura, { align: 'center' })
  doc.text('0,67', 157, 100 + altura, { align: 'center' })
  doc.text('1,00', 157, 115 + altura, { align: 'center' })

  doc.text('Reativa', 254, 70 + altura, { align: 'center' })
  doc.text('Legalista', 254, 85 + altura, { align: 'center' })
  doc.text('Proativa', 254, 100 + altura, { align: 'center' })
  doc.text('Estratégica', 254, 115 + altura, { align: 'center' })

  doc.text('Reativa', 362, 70 + altura, { align: 'center' })
  doc.text('Legalista', 362, 85 + altura, { align: 'center' })
  doc.text('Proativa', 362, 100 + altura, { align: 'center' })
  doc.text('Estratégica', 362, 115 + altura, { align: 'center' })
  // fim texto estático
}
function geraResultadosObtidosI(doc, altura, width, resultadosDimensoes) {
  // retangulo
  doc.roundedRect(30, altura, width - 60, 95, 3, 3, 'S')

  // linhas horizontais
  doc.line(30, 20 + altura, width - 30, 20 + altura)
  doc.line(30, 35 + altura, width - 30, 35 + altura)
  doc.line(30, 50 + altura, width - 30, 50 + altura)
  doc.line(30, 65 + altura, width - 30, 65 + altura)
  doc.line(30, 80 + altura, width - 30, 80 + altura)

  // linhas verticais
  const xLinhaV0 = 30
  const xLinhaV1 = 116
  const xLinhaV2 = 166
  const xLinhaV3 = 216
  const xLinhaV4 = 266
  const xLinhaV5 = 316
  const xLinhaV6 = 366
  const xLinhaV7 = 416

  doc.line(xLinhaV1, 20 + altura, xLinhaV1, 95 + altura)
  doc.line(xLinhaV2, 20 + altura, xLinhaV2, 95 + altura)
  doc.line(xLinhaV3, 20 + altura, xLinhaV3, 95 + altura)
  doc.line(xLinhaV4, 20 + altura, xLinhaV4, 95 + altura)
  doc.line(xLinhaV5, 20 + altura, xLinhaV5, 95 + altura)
  doc.line(xLinhaV6, 20 + altura, xLinhaV6, 95 + altura)

  // pontos médios coluna
  const col1 = pMH(xLinhaV0, xLinhaV1)
  const col2 = pMH(xLinhaV1, xLinhaV2)
  const col3 = pMH(xLinhaV2, xLinhaV3)
  const col4 = pMH(xLinhaV3, xLinhaV4)
  const col5 = pMH(xLinhaV4, xLinhaV5)
  const col6 = pMH(xLinhaV5, xLinhaV6)
  const col7 = pMH(xLinhaV6, xLinhaV7)

  // texto estático
  doc.setFontSize(12)
  doc.text('Resultados obtidos', width / 2, 13 + altura, { align: 'center' })
  doc.setFontSize(9)
  doc.text('Dimensão', col1, 30 + altura, { align: 'center' })
  doc.text('Mínima', col2, 30 + altura, { align: 'center' })
  doc.text('Máxima', col3, 30 + altura, { align: 'center' })
  doc.text('Pontuação', col4, 30 + altura, { align: 'center' })
  doc.setFontSize(7)
  doc.text('Score\n(empresa)', col5, 27 + altura, { align: 'center' })
  doc.text('Média do\nGrupo', col6, 27 + altura, { align: 'center' })
  doc.text('Score\n(Grupo)', col7, 27 + altura, { align: 'center' })

  doc.setFontSize(8)

  // preenche as linhas
  let linha = 45
  for (let i = 0; i <= 3; i++) {
    if (resultadosDimensoes[i]) {
      doc.text(resultadosDimensoes[i].nomeDimensao, col1, linha + altura, { align: 'center' })
      doc.text('0', col2, linha + altura, { align: 'center' })
      doc.text('15', col3, linha + altura, { align: 'center' })
      doc.text(resultadosDimensoes[i].pontuacaoEmpresa.toString(), col4, linha + altura, { align: 'center' })
      doc.text(resultadosDimensoes[i].scoreEmpresaFormatado, col5, linha + altura, { align: 'center' })
      doc.text(resultadosDimensoes[i].grupoCNAEMedia.toString(), col6, linha + altura, { align: 'center' })
      doc.text(resultadosDimensoes[i].grupoCNAEScoreFormatado, col7, linha + altura, { align: 'center' })
      linha = linha + 15
    }
  }
}
function geraResultadosObtidosII(doc, altura, width, resultadosDimensoes) {
  // retangulo
  doc.roundedRect(30, altura, width - 60, 80, 3, 3, 'S')

  // linhas horizontais
  doc.line(30, 20 + altura, width - 30, 20 + altura)
  doc.line(30, 35 + altura, width - 30, 35 + altura)
  doc.line(30, 50 + altura, width - 30, 50 + altura)
  doc.line(30, 65 + altura, width - 30, 65 + altura)

  // linhas verticais
  const xLinhaV0 = 30
  const xLinhaV1 = xLinhaV0 + 86
  const xLinhaV2 = xLinhaV1 + 75
  const xLinhaV3 = xLinhaV2 + 75
  const xLinhaV4 = xLinhaV3 + 75
  const xLinhaV5 = xLinhaV4 + 75

  doc.line(xLinhaV1, altura, xLinhaV1, 80 + altura)
  doc.line(xLinhaV2, altura, xLinhaV2, 80 + altura)
  doc.line(xLinhaV3, altura, xLinhaV3, 80 + altura)
  doc.line(xLinhaV4, 20 + altura, xLinhaV4, 80 + altura)

  // pontos médios coluna
  const col1 = pMH(xLinhaV0, xLinhaV1)
  const col2 = pMH(xLinhaV1, xLinhaV2)
  const col3 = pMH(xLinhaV2, xLinhaV3)
  const col4 = pMH(xLinhaV3, xLinhaV4)
  const col5 = pMH(xLinhaV4, xLinhaV5)

  // texto estático
  doc.setFontSize(9)
  doc.text('Média por\nDimensão', col1, 8 + altura, { align: 'center' })
  doc.text('Pontuação\nempresa', col2, 8 + altura, { align: 'center' })
  doc.text('% de maturidade', col3, 12 + altura, { align: 'center' })
  // usa o X da linha horizontal, fica no meio de duas células
  doc.text('Benchmark da Divisão', xLinhaV4, 12 + altura, { align: 'center' })

  doc.setFontSize(8)

  // preenche as linhas
  let linha = 30
  if (resultadosDimensoes) {
    for (let i = 0; i <= 3; i++) {
      if (resultadosDimensoes[i]) {
        doc.text(resultadosDimensoes[i].nomeDimensao, col1, linha + altura, { align: 'center' })
        doc.text(resultadosDimensoes[i].pontuacaoEmpresa.toString(), col2, linha + altura, { align: 'center' })
        doc.text(resultadosDimensoes[i].scoreEmpresaFormatado, col3, linha + altura, { align: 'center' })
        doc.text(resultadosDimensoes[i].divisaoCNAEMedia.toString(), col4, linha + altura, { align: 'center' })
        doc.text(resultadosDimensoes[i].divisaoCNAEScoreFormatado, col5, linha + altura, { align: 'center' })
        linha = linha + 15
      }
    }
  }
}
function geraScore(doc, altura, width, scoreGeral) {
  // retangulo
  doc.roundedRect(170, altura, width - 340, 20, 10, 10, 'F')

  // linhas horizontais
  doc.line(30, 10 + altura, width - 30, 10 + altura)

  // texto
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.text('Score Geral do PTI: ' + scoreGeral.toFixed(2) * 100 + '%', width / 2, 12 + altura, { align: 'center' })
  doc.setTextColor(0, 0, 0)
}
function geraTabelaProdAbsent(doc, altura, width, dadosHistorico) {
  // retangulo
  doc.roundedRect(30, altura, width - 60, 60, 3, 3, 'S')

  // linhas horizontais
  doc.line(30, 20 + altura, width - 30, 20 + altura)
  doc.line(30, 40 + altura, width - 30, 40 + altura)

  // linhas verticais
  const xLinhaV0 = 30
  const xLinhaV1 = xLinhaV0 + 80
  const xLinhaV2 = xLinhaV1 + 50
  const xLinhaV3 = xLinhaV2 + 50
  const xLinhaV4 = xLinhaV3 + 50
  const xLinhaV5 = xLinhaV4 + 50
  const xLinhaV6 = xLinhaV5 + 50
  const xLinhaV7 = xLinhaV6 + 56

  doc.line(xLinhaV1, altura, xLinhaV1, 60 + altura)
  doc.line(xLinhaV2, altura, xLinhaV2, 60 + altura)
  doc.line(xLinhaV3, altura, xLinhaV3, 60 + altura)
  doc.line(xLinhaV4, altura, xLinhaV4, 60 + altura)
  doc.line(xLinhaV5, altura, xLinhaV5, 60 + altura)
  doc.line(xLinhaV6, altura, xLinhaV6, 60 + altura)

  // pontos médios coluna
  const col = [
    pMH(xLinhaV0, xLinhaV1),
    pMH(xLinhaV1, xLinhaV2),
    pMH(xLinhaV2, xLinhaV3),
    pMH(xLinhaV3, xLinhaV4),
    pMH(xLinhaV4, xLinhaV5),
    pMH(xLinhaV5, xLinhaV6),
    pMH(xLinhaV6, xLinhaV7)
  ]
  // texto estático
  doc.setFontSize(9)
  doc.text('(A) Produtividade por\nfuncionário', col[0], 29 + altura, { align: 'center' })
  doc.text('(B) Taxa de\nabsenteísmo', col[0], 49 + altura, { align: 'center' })
  doc.text('Etapa Inicial', col[1], 10 + altura, { align: 'center' })
  doc.text('Etapa 2', col[2], 10 + altura, { align: 'center' })
  doc.text('Etapa 3', col[3], 10 + altura, { align: 'center' })
  doc.text('Etapa 4', col[4], 10 + altura, { align: 'center' })
  doc.text('Etapa Final', col[5], 10 + altura, { align: 'center' })
  doc.text('Meta Anual', col[6], 10 + altura, { align: 'center' })

  doc.setFontSize(8)

  // preenche as linhas
  let numCol = 1
  dadosHistorico.produtividadeFuncionarioEmpresaFormatado.forEach((e) => {
    doc.text(e.toString(), col[numCol], 32 + altura, { align: 'center' })
    numCol++
  })

  numCol = 1
  dadosHistorico.taxaAbsenteismoEmpresaFormatado.forEach((e) => {
    doc.text(e.toString(), col[numCol], 52 + altura, { align: 'center' })
    numCol++
  })

  doc.text(dadosHistorico.produtividadeFuncionarioMetaFormatado[4].toString(), col[6], 32 + altura, { align: 'center' })
  doc.text(dadosHistorico.taxaAbsenteismoMetaFormatado[4].toString(), col[6], 52 + altura, { align: 'center' })
}
function geraAcoes(doc, altura, width, listaAcoes) {
  const yCelula = 125

  // retangulo
  doc.roundedRect(30, altura, width - 60, 20 + (yCelula * listaAcoes.length), 3, 3, 'S')

  doc.setFontSize(12)
  doc.text('Plano de ação', width / 2, 13 + altura, { align: 'center' })

  // linhas horizontais
  let yLinha = 20
  doc.line(30, yLinha + altura, width - 30, yLinha + altura)
  for (let i = 0; i < listaAcoes.length - 1; i++) {
    yLinha += yCelula
    doc.line(30, yLinha + altura, width - 30, yLinha + altura)
  }

  let yTexto = 35
  let numeroAcao = 1
  listaAcoes.forEach((e) => {
    // texto estático
    doc.setFontSize(12)
    doc.text('AÇÃO ' + numeroAcao, 38, yTexto + altura)

    // altura linhas
    const yLinha1 = 12
    const yLinha2 = 37
    const yLinha3 = 62
    const yLinha4 = 87
    const yAfastamento = 7

    doc.setFontSize(7)
    doc.text('Ação', 40, yTexto + altura + yLinha1)
    doc.text('Responsável', 280, yTexto + altura + yLinha1)

    doc.text('Local', 40, yTexto + altura + yLinha2)
    doc.text('Início', 180, yTexto + altura + yLinha2)
    doc.text('Conclusão', 220, yTexto + altura + yLinha2)
    doc.text('Orçamento', 280, yTexto + altura + yLinha2)

    doc.text('Objetivo', 40, yTexto + altura + yLinha3)
    doc.text('Descrição de como será realizado', 40, yTexto + altura + yLinha4)

    // texto dados
    doc.setFont('Helvetica', 'bold')

    const textoNomeAcao = doc.splitTextToSize(e.tipoDeAcao.nomeDaAcao, 220)
    doc.text(textoNomeAcao, 40, yTexto + altura + yLinha1 + yAfastamento)
    const textoResponsavel = doc.splitTextToSize(e.responsavel, 126)
    doc.text(textoResponsavel, 280, yTexto + altura + yLinha1 + yAfastamento)

    const textoLocal = doc.splitTextToSize(e.local, 120)
    doc.text(textoLocal, 40, yTexto + altura + yLinha2 + yAfastamento)
    doc.text(dataFormatada(e.dataInicial), 180, yTexto + altura + yLinha2 + yAfastamento)
    doc.text(dataFormatada(e.dataConclusao), 220, yTexto + altura + yLinha2 + yAfastamento)
    const textoOrcamento = doc.splitTextToSize(e.tipoDeAcao.orcamento, 126)
    doc.text(textoOrcamento, 280, yTexto + altura + yLinha2 + yAfastamento)

    const textoObjetivo = doc.splitTextToSize(e.tipoDeAcao.objetivo, 366)
    doc.text(textoObjetivo, 40, yTexto + altura + yLinha3 + yAfastamento)
    const textoDescricao = doc.splitTextToSize(e.tipoDeAcao.descricao, 366)
    doc.text(textoDescricao, 40, yTexto + altura + yLinha4 + yAfastamento)

    yTexto += yCelula
    numeroAcao++
    doc.setFont('Helvetica', 'normal')
  })
}
async function geraGraficos(doc) {
  const node1 = document.getElementById('group-graphics')
  // const node2 = document.getElementById('grafico-absenteismo')
  const node3 = document.getElementById('grafico-radar')
  doc.setPage(2)
  let style = { transform: 'scale(.8)', width: '420px', height: '250px' }
  // const style2 = { transform: 'scale(.5)', width: '250px', height: '200px' }

  await domtoimage.toPng(node1, { style })
    .then(function(dataUrl) {
      const img = new Image()
      img.src = dataUrl
      doc.addImage(img.src, 'PNG', 60, 120)
    })

  // await domtoimage.toPng(node2, { style })
  //   .then(function(dataUrl2) {
  //     const img2 = new Image()
  //     img2.src = dataUrl2
  //     doc.addImage(img2.src, 'PNG', 90, 270)
  //   })

  style = { transform: 'scale(.8)', width: '620px', height: '520px' }

  await domtoimage.toPng(node3, { style })
    .then(function(dataUrl3) {
      const img3 = new Image()
      img3.src = dataUrl3
      doc.addImage(img3.src, 'PNG', 60, 350)
    })
  doc.save('relatorio.pdf')
}
function numeroPagina(doc, numeroPagina, width) {
  doc.setFontSize(10)
  doc.text(numeroPagina.toString(), width / 2, doc.internal.pageSize.getHeight() - 20)
}
// ponto médio horizontal entre linhas
function pMH(linhaA, linhaB) {
  return ((linhaB - linhaA) / 2) + linhaA
}
function dataFormatada(dt) {
  const data = new Date(dt)
  const dia = data.getDate().toString()
  const diaF = (dia.length === 1) ? '0' + dia : dia
  const mes = (data.getMonth() + 1).toString()
  const mesF = (mes.length === 1) ? '0' + mes : mes
  const anoF = data.getFullYear()
  return diaF + '/' + mesF + '/' + anoF
}
