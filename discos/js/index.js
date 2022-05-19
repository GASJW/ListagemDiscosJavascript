window.onload = () => {
  //console.log("Abriu discos index");
  document.querySelector("#btnNovo").onclick = goToNovo;
  document.querySelector("#btnPesquisar").onclick = pesquisar;
};

function goToNovo() {
  document.location = "create.html";
}

function pesquisar() {
  const id = getInputId().value;

  if (id === "") {
    pesquisarTodos();
  } else {
    pesquisarId(id);
  }
}

function getInputId() {
  return document.querySelector("#txtId");
}

function pesquisarTodos() {
  const endpoint = "https://localhost:44393/api/discos";

  fetch(endpoint)
    .then((response) => gerenciarRespostaPesquisa(response))
    .then((data) => gerenciarDiscos(data))
    .catch((error) => gerenciarErro(error));
}

function pesquisarId(id) {
  const endpoint = `https://localhost:44393/api/discos/${id}`;
  fetch(endpoint)
    .then((response) => gerenciarRespostaPesquisa(response))
    .then((data) => gerenciarDisco(data))
    .catch((error) => gerenciarErro(error));
}

function gerenciarDiscos(discos) {
  //console.log(discos);
  const tabela = getTabelaDiscos();
  limparTabela(tabela);
  inserirCabecalhoDisco(tabela);
  //console.log(tabela);
  if (discos.length != 0) {
    discos.forEach((disco) => inserirDadosDisco(tabela, disco));
  } else {
    exibirDadosErro(1004);
  }
}

function gerenciarRespostaPesquisa(response) {
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

function gerenciarErro(erro) {
  limparTabela(getTabelaDiscos());
  exibirDadosErro(erro);
}

function exibirDadosErro(erro) {
  let descricaoErro = getDescricaoErro(erro);
  const tabela = getTabelaDiscos();
  limparTabela(tabela);
  inserirCabecalhoDisco(tabela);
  inserirDadosErro(tabela, descricaoErro);
}

function gerenciarDisco(disco) {
  const tabela = getTabelaDiscos();
  limparTabela(tabela);
  inserirCabecalhoDisco(tabela);
  inserirDadosDisco(tabela, disco);
}

function getTabelaDiscos() {
  return document.querySelector("#tbDiscos");
}

function limparTabela(tabela) {
  tabela.innerHTML = "";
}

function inserirCabecalhoDisco(tabela) {
  let tr, td;
  tr = tabela.insertRow();
  tr.className = "w3-blue";
  td = tr.insertCell(0);
  td.innerHTML = "Id";
  td.className = "w3-center";
  td = tr.insertCell(1);
  td.innerHTML = "Nome do Disco";
  td.className = "w3-center";
  td = tr.insertCell(2);
  td.innerHTML = "Nome do Autor";
  td.className = "w3-center";
  td = tr.insertCell(3);
  td.innerHTML = "Numero De Musicas";
  td.className = "w3-center";
  td = tr.insertCell(4);
  td.innerHTML = "Data de Lançamento";
  td.className = "w3-center";
  td = tr.insertCell(5);
  td.innerHTML = "";
}

function inserirDadosDisco(tabela, disco) {
  let tr, td;
  tr = tabela.insertRow();
  td = tr.insertCell(0);
  td.innerHTML = `<a href='edit.html?id=${disco.Id}'>${disco.Id}</a>`;
  td.className = "w3-center";
  td = tr.insertCell(1);
  td.innerHTML = disco.NomeDisco;
  td.className = "w3-center";
  td = tr.insertCell(2);
  td.innerHTML = disco.NomeAutor;
  td.className = "w3-center";
  td = tr.insertCell(3);
  td.innerHTML = disco.NumeroDeMusicas;
  td.className = "w3-center";
  td = tr.insertCell(4);
  td.innerHTML = formatarData(disco);
  td.className = "w3-center";
  td = tr.insertCell(5);
  td.innerHTML = `<a href="JavaScript:confirmarExclusao(${disco.Id}, '${disco.NomeDisco} de ${disco.NomeAutor}')">Excluir</a>`;
  td.className = "w3-center, date";
}

function formatarData(disco) {
  let data = new Date(disco.DataLancamento),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"),
    ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function inserirDadosErro(tabela, descricaoErro) {
  const tr = tabela.insertRow();

  let td;
  td = tr.insertCell(0);
  td.innerHTML = descricaoErro;
  td.colSpan = 5;
}

function confirmarExclusao(id, Nome) {
  //console.log(`Confirmar exclusão:${id}`)
  if (confirm(`Deseja excluir o disco ${id} - ${Nome}?`)) {
    excluir(id);
  }
}

function excluir(id) {
  //console.log(`Excluir: ${id}`);
  const endpoint = `https://localhost:44393/api/discos/${id}`;
  fetch(endpoint, {
    method: "delete",
  })
    .then((response) => gerenciarRespostaExclusao(response))
    .catch((error) => gerenciarErro(error));
}

function gerenciarRespostaExclusao(response) {
  if (response.status === 200) {
    exibirMensagemExclusao();
    pesquisar();
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

function exibirMensagemExclusao() {
  alert("Disco removido com sucesso!");
}
