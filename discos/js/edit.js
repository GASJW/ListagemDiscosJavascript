window.onload = () => {
  //console.log("Abriu discos editar");
  document.querySelector("#btnVoltar").onclick = goToIndex;
  document.querySelector("#btnAlterar").onclick = alterar;
  const id = getQueryStringId();
  if (validarQueryStringId(id)) {
    pesquisarPorId(id);
  } else {
    gerenciarParametrosInvalidos();
  }
};

function validarQueryStringId(id) {
  return !(id === null || id === "");
}

function goToIndex() {
  document.location = "index.html";
}

function alterar() {
  const disco = getDisco();
  const msg = validar(disco);
  if (msg === "") {
    //Validado.
    //console.log("invocar a API");
    put(disco);
  } else {
    //Precisa de correção.
    exibirMensagemValidacao(msg);
  }
}

function exibirMensagemValidacao(mensagem) {
  alert(mensagem);
}

function getDisco() {
  const disco = {
    Id: getInputId().value,
    NomeDisco: getInputNomeDisco().value.trim(),
    NomeAutor: getInputNomeAutor().value.trim(),
    NumeroDeMusicas: getInputNumerDeMusicas().value.trim(),
    DataLancamento: getInputDataLancamento().value.trim(),
  };
  return disco;
}

function put(disco) {
  const endpoint = `https://localhost:44393/api/discos/${disco.Id}`;
  fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(disco),
  })
    .then((response) => gerenciarResposta(response))
    .catch((error) => gerenciarErro(error));
}

function gerenciarResposta(response) {
  console.log("gerenciarResposta=", response);
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

function gerenciarErro(erro) {
  exibirDadosErro(erro);
  goToIndex();
}

function exibirMensagemOK() {
  alert("O disco foi alterado com sucesso!");
}

function exibirDadosErro(erro) {
  let descricaoErro = getDescricaoErro(erro);
  alert(descricaoErro);
}

function gerenciarParametrosInvalidos() {
  exibirMEnsagemParametrosInvalidos();
  goToIndex();
}

function exibirMEnsagemParametrosInvalidos() {
  alert("Parâmetros inválidos.");
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

function getQueryStringId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function pesquisarPorId(id) {
  //console.log("Inicio da pesquisa por Id");
  const endpoint = `https://localhost:44393/api/discos/${id}`;
  fetch(endpoint)
    .then((response) => gerenciarRespostaPesquisa(response))
    .then((data) => exibirDadosDisco(data))
    .catch((error) => error);
}

function gerenciarRespostaPesquisa(response) {
  //console.log("gerenciarRespostaPesquisa=", response);
  if (response.status === 200) {
    return response.json();
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

function exibirDadosDisco(disco) {
  //console.log(disco);
  getInputId().value = disco.Id;
  getInputNomeDisco().value = disco.NomeDisco;
  getInputNomeAutor().value = disco.NomeAutor;
  getInputNumerDeMusicas().value = disco.NumeroDeMusicas;
  getInputDataLancamento().value = formatarData(disco);
}

function formatarData(disco) {
  let data = new Date(disco.DataLancamento),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"),
    ano = data.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

function getInputId() {
  return document.querySelector("#hddId");
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

function gerenciarErro(erro) {
  //console.log("gerenciarErro=", erro);
  exibirDadosErro(erro);
}

function exibirDadosErro(erro) {
  let descricaoErro = getDescricaoErro(erro);
  alert(descricaoErro);
}
