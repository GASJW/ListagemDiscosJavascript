window.onload = () => {
  //console.log("Abriu discos criar");
  document.querySelector("#btnVoltar").onclick = goToIndex;
  document.querySelector("#btnSalvar").onclick = salvar;
};

function goToIndex() {
  document.location = "index.html";
}

function salvar() {
  //console.log("Salvar")
  const disco = getDisco();
  const msg = validar(disco);
  if (msg === "") {
    //validado
    //console.log("Invocar API")
    post(disco);
  } else {
    exibirMensagemValidacao(msg);
  }
}

function validar(disco) {
  let msg = "";
  if (disco.NomeDisco === "") {
    msg += "Nome do Disco\n";
  }
  if (disco.NumeroDeMusicas === "") {
    msg += "Número de Músicas\n";
  }
  if (disco.DataLancamento === "") {
    msg += "Data de Lançamento\n";
  }
  if (msg != "") {
    msg = "Os dados abaixo são obrigatórios:\n" + msg;
  }
  return msg;
}

function getDisco() {
  const disco = {
    NomeDisco: getInputNomeDisco().value.trim(),
    NomeAutor: getInputNomeAutor().value.trim(),
    NumeroDeMusicas: getInputNumerDeMusicas().value.trim(),
    DataLancamento: getInputDataLancamento().value.trim(),
  };
  return disco;
}

function getInputNomeDisco() {
  return document.querySelector("#txtNomeDisco");
}

function getInputNomeAutor() {
  return document.querySelector("#txtNomeAutor");
}

function getInputNumerDeMusicas() {
  return document.querySelector("#txtNumeroMusicas");
}

function getInputDataLancamento() {
  return document.querySelector("#dateDataLanc");
}

function exibirMensagemValidacao(mensagem) {
  alert(mensagem);
}

function post(disco) {
  console.log(disco);
  const endpoint = "https://localhost:44393/api/discos";
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(disco),
  })
    .then((response) => gerenciarResposta(response))
    .catch((error) => gerenciarErro(error));
}

function gerenciarResposta(response) {
  if (response.status === 200) {
    exibirMensagemOK();
    goToIndex();
  } else if (response.status === 404) {
    throw 1040;
  } else if (response.status === 500) {
    throw 5000;
  } else if (response.status === 400) {
    throw 4000;
  } else {
    throw -1;
  }
}

function exibirMensagemOK() {
  alert("Disco adicionado com sucesso!");
}

function gerenciarErro(erro) {
  exibirDadosErro(erro);
}

function exibirDadosErro(erro) {
  let descricaoErro = getDescricaoErro(erro);
  alert(descricaoErro);
}
