// Constantes API
const API_BASE_URL = "https://bobinas.onrender.com";

function gerarSequencial() {
  const chave = "SEQ_BOBINA";
  let atual = parseInt(localStorage.getItem(chave) || "0", 10);
  atual++;
  localStorage.setItem(chave, atual);
  return String(atual).padStart(4, "0");
}

function gerarCodigoBobina({ tipoPapel, peso, largura, gramatura, seqCustom }) {
  const tipos = {
    "OffSet": "PO",
    "Kraft Natural": "KN",
    "Kraft Branco": "KB",
    "Kraft Monolúcido": "KM",
    "BOPP Branco": "BB",
    "BOPP Metalizado": "BM",
    "Glassine": "GL",
    "Seda": "SD",
    "Monolúcido": "MO",
    "Glasspel": "GP",
    "Papel barreira gordura": "BG",
    "Filme Plástico": "PL"
  };

  const tipo = tipos[tipoPapel] || "XX";

  const pes = Math.round(peso || 0).toString().padStart(3, "0");
  const larg = Math.round(largura || 0).toString().padStart(2, "0");
  const gram = Math.round(gramatura || 0).toString().padStart(2, "0");

  const cor = "Z";
  const seq = seqCustom || gerarSequencial();


  return `${tipo}${pes}${larg}${gram}${cor}${seq}`;
}





function addBobina(bobina) {
  return new Promise((resolve, reject) => {
    bobina.dataEntrada = new Date();
    bobina.tipo = "bobina";

    fetch(`${API_BASE_URL}/bobinas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bobina),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      });

  })
    .catch((error) => {
      reject(error);
    });

}

// Função para adicionar folhas
function addFolhas(folhas) {
  return new Promise((resolve, reject) => {
    // Gera um ID para as folhas
    folhas.id = `FOLHAS-${Date.now()}`;
    folhas.tipo = "folhas"; // Define o tipo como folhas
    folhas.dataEntrada = new Date();

    fetch(`${API_BASE_URL}/folhas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folhas),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getAllBobinas() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/bobinas`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getBobinaById(id) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/bobinas/${id}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function updateBobina(bobina) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/bobinas/${bobina._id || bobina.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bobina),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function addMovimentoHistorico(movimento) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movimentacoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movimento),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllHistorico() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movimentacoes`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getHistoricoByBobina(idBobina) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movimentacoes?idBobina=${idBobina}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function addBobinaOrigem(relacionamento) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/bobinas-origem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relacionamento),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getBobinasFilhas(idBobinaOrigem) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/bobinas-origem?idBobinaOrigem=${idBobinaOrigem}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        const bobinasFilhas = [];
        const fetchPromises = data.map((rel) =>
          getBobinaById(rel.idBobinaNova)
            .then((bobina) => {
              if (bobina) bobinasFilhas.push(bobina);
            })
            .catch((error) => {
              console.error("Erro ao buscar bobina filha:", error);
            })
        );

        Promise.all(fetchPromises).then(() => resolve(bobinasFilhas));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getFolhasByBobina(idBobinaOrigem) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/folhas?idBobinaOrigem=${idBobinaOrigem}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function updateMovimentoHistorico(movimento) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movimentacoes/${movimento._id}`, {
      // usar _id, não id
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movimento),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function imprimirEtiqueta() {
  window.print();
}
function registrarSaida(event) {
  event.preventDefault();

  const idBobina = document.getElementById("idBobinaSaida").value;
  const pesoSaida = parseFloat(document.getElementById("pesoSaida").value);
  const tipoMaquina = document.getElementById("tipoMaquina").value;
  const usuario = document.getElementById("usuarioSaida").value;
  const observacoes = document.getElementById("observacaoSaida").value;

  if (!idBobina || isNaN(pesoSaida) || !tipoMaquina || !usuario) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  getBobinaById(idBobina)
    .then((bobina) => {
      if (!bobina) {
        throw new Error("Bobina não encontrada.");
      }

      if (pesoSaida > bobina.peso) {
        throw new Error(
          "Peso de saída não pode ser maior que o peso atual da bobina."
        );
      }

      // Atualiza bobina com peso e data de saída
      bobina.peso -= pesoSaida;
      bobina.dataSaida = new Date();

      // Atualiza no banco via API
      return updateBobina(bobina).then(() => bobina);
    })
    .then((bobina) => {
      // ✅ Cria registro de movimentação com o peso usado incluído nas observações
      const textoObs =
        observacoes && observacoes.trim() !== ""
          ? `Peso usado: ${pesoSaida.toFixed(2)} kg | ${observacoes}`
          : `Peso usado: ${pesoSaida.toFixed(2)} kg`;

      const movimentacao = {
        idBobina: bobina._id,
        tipoMovimentacao: "SAÍDA",
        quantidade: pesoSaida,
        tipoMaquina,
        usuario,
        observacoes: textoObs,
        data: new Date(),
      };



      return addMovimentoHistorico(movimentacao);
    })
    .then((movimentacao) => {
      return getBobinaById(idBobina); // recupera a bobina de novo
    })
    .then((bobina) => {
      gerarEtiqueta(bobina, tipoMaquina, usuario);
      alert("Saída registrada com sucesso!");
      document.getElementById("modalSaida").style.display = "none";
      carregarEstoque();
      carregarHistorico?.();
    })
    .catch((error) => {
      console.error("Erro ao registrar saída:", error);
      alert("Erro ao registrar saída. Consulte o console para detalhes.");
    });
}
const MIGRAR_TODAS_AS_BOBINAS = false// 👈 mude para false depois

function carregarEstoque() {
  console.log("Carregando estoque...");

  getAllBobinas()
    .then((bobinas) => {
      console.log("Bobinas recebidas:", bobinas);
      const corpoTabela = document.getElementById("corpoTabelaEstoque");
      corpoTabela.innerHTML = "";

      if (!bobinas || bobinas.length === 0) {
        console.log("Nenhuma bobina encontrada");
        corpoTabela.innerHTML = `<tr><td colspan="8">Nenhuma bobina cadastrada</td></tr>`;
        return;
      }

      bobinas.forEach((bobina) => {
        if (mostrandoSomenteEmUso && !bobina.dataSaida) {
  return;
}

        console.log("Processando bobina:", bobina);
        const tr = document.createElement("tr");

        const status = bobina.dataSaida
          ? `<span class="status-indisponivel">EM USO</span>`
          : `<span class="status-disponível">DISPONÍVEL</span>`;

        const acoes = bobina.dataSaida
          ? `<button class="btn" onclick="visualizarBobina('${bobina._id}')">Visualizar</button>
     <button class="btn" onclick="prepararRetorno('${bobina._id}')">Registrar Retorno</button>
     <button class="btn" onclick="editarBobina('${bobina._id}')">Editar</button>
     <button class="btn btn-danger" onclick="deletarBobina('${bobina._id}')">Excluir</button>`
          : `<button class="btn" onclick="visualizarBobina('${bobina._id}')">Visualizar</button>
     <button class="btn" onclick="prepararSaida('${bobina._id}')">Registrar Saída</button>
     <button class="btn" onclick="editarBobina('${bobina._id}')">Editar</button>
     <button class="btn btn-danger" onclick="deletarBobina('${bobina._id}')">Excluir</button>`;

        tr.innerHTML = `
                   <td>${bobina.codigoQR || "N/A"}</td>
                    <td>${bobina.tipoPapel || "N/A"}</td>
                    <td>${bobina.localizacao || "N/A"}</td>
                    <td>${bobina.peso ? bobina.peso.toFixed(2) : "0.00"}</td>
                    <td>${bobina.largura ? bobina.largura + " cm" : "N/A"}</td>
                    <td>${
                      bobina.gramatura ? bobina.gramatura + " g/m²" : "N/A"
                    }</td>
                    <td>${status}</td>
                    <td class="no-print">${acoes}</td>
                `;

        corpoTabela.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Erro detalhado ao carregar estoque:", error);
      alert("Erro ao carregar estoque. Verifique o console para detalhes.");

      // Mostra mensagem de erro na tabela
      const corpoTabela = document.getElementById("corpoTabelaEstoque");
      corpoTabela.innerHTML = `
                <tr>
                    <td colspan="8" style="color: red;">
                        Erro ao carregar estoque. Recarregue a página ou limpe os dados do site.
                        <button onclick="limparBancoDados()">Limpar Dados</button>
                    </td>
                </tr>
            `;
    });
}
let mostrandoSomenteEmUso = false;

function toggleBobinasEmUso() {
  mostrandoSomenteEmUso = !mostrandoSomenteEmUso;

  const titulo = document.getElementById("tituloEstoque");
  const botao = event.target;

  if (mostrandoSomenteEmUso) {
    titulo.textContent = "Bobinas em Uso";
    botao.textContent = "📦 Ver Todas as Bobinas";
  } else {
    titulo.textContent = "Estoque Atual";
    botao.textContent = "⚙️ Ver Bobinas em Uso";
  }

  carregarEstoque();
}

async function visualizarBobina(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bobinas/${id}`);
    const bobina = await response.json();

    if (!response.ok) {
      console.error("Erro ao buscar bobina:", bobina.error);
      return;
    }

    let conteudo = `
            <p><strong>ID:</strong> ${(bobina._id || "").slice(-6)}</p>
            <p><strong>Tipo de Papel:</strong> ${bobina.tipoPapel}</p>
            <p><strong>Fabricante:</strong> ${bobina.fabricante}</p>
            <p><strong>Peso:</strong> ${bobina.peso} kg</p>
            <p><strong>Largura:</strong> ${bobina.largura} cm</p>
            <p><strong>Gramatura:</strong> ${bobina.gramatura} g/m²</p>
            <p><strong>Localização:</strong> ${bobina.localizacao}</p>
            <p><strong>Fornecedor:</strong> ${bobina.fornecedor}</p>
            <p><strong>Data de Entrada:</strong> ${new Date(
              bobina.dataEntrada
            ).toLocaleString()}</p>
        `;

    // ✅ Bobinas Filhas
    const bobinasFilhas = await getBobinasFilhas(bobina._id);
    if (bobinasFilhas.length > 0) {
      conteudo += `<p><strong>Bobinas Derivadas:</strong></p><ul>`;
      bobinasFilhas.forEach((filha) => {
        conteudo += `<li>${filha.codigoQR} - ${
          filha.largura
        } cm - ${filha.peso.toFixed(2)} kg</li>`;
      });
      conteudo += `</ul>`;
    }

    // ✅ Folhas Geradas
    const folhasGeradas = await getFolhasByBobina(bobina._id);
    if (folhasGeradas.length > 0) {
      conteudo += `<p><strong>Folhas Geradas:</strong></p><ul>`;
      folhasGeradas.forEach((folha) => {
        conteudo += `<li>${folha.quantidade} folhas - ${folha.formato} - Cliente: ${folha.cliente}</li>`;
      });
      conteudo += `</ul>`;
    }

    document.getElementById("modalConteudo").innerHTML = conteudo;

    // ✅ QR Code
    const qrContainer = document.getElementById("qrCodeContainer");
    qrContainer.innerHTML = ""; // Limpa antes

    if (bobina.codigoQR && bobina.codigoQR.trim() !== "") {
      const canvas = document.createElement("canvas");
      qrContainer.appendChild(canvas);

      QRCode.toCanvas(canvas, bobina.codigoQR, { width: 200 }, (error) => {
        if (error) console.error("Erro ao gerar QR Code:", error);
      });
    } else {
      qrContainer.innerHTML = "<p>Sem QR Code disponível para esta bobina.</p>";
    }

    // ✅ Abre o modal
    document.getElementById("modalBobina").style.display = "block";
  } catch (error) {
    console.error("Erro ao visualizar bobina:", error);
    alert("Erro ao visualizar bobina. Consulte o console para detalhes.");
  }
}
function prepararSaida(id) {
  getBobinaById(id)
    .then((bobina) => {
      if (!bobina) {
        alert("Bobina não encontrada!");
        return;
      }

      document.getElementById("idBobinaSaida").value = bobina._id;
      document.getElementById("pesoSaida").max = bobina.peso;
      document.getElementById("pesoSaida").value = bobina.peso;

      // Mostra o modal de saída
      document.getElementById("modalSaida").style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao preparar saída:", error);
      alert("Erro ao preparar saída. Consulte o console para detalhes.");
    });
}

// Função preparada para corrigir filtro de saída no modal de retorno
function carregarEliminadas() {
  getAllBobinas()
    .then((bobinas) => {
      const eliminadas = bobinas.filter((b) => b.peso <= 0);
      const corpoTabela = document.getElementById("corpoTabelaEliminadas");
      if (!corpoTabela) return;

      corpoTabela.innerHTML = "";

      if (eliminadas.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="8">Nenhuma bobina eliminada</td></tr>`;
        return;
      }

      eliminadas.forEach((bobina) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${bobina.codigoQR}</td>

          <td>${bobina.tipoPapel || "N/A"}</td>
          <td>${bobina.fabricante || "N/A"}</td>
          <td>${bobina.peso.toFixed(2)}</td>
          <td>${bobina.largura || "-"} cm</td>
          <td>${bobina.gramatura || "-"} g/m²</td>
          <td>${bobina.dataSaida ? new Date(bobina.dataSaida).toLocaleString() : "-"}</td>
          <td class="no-print">
            <button class="btn-excluir" onclick="excluirBobinaEliminada('${bobina._id}')">Excluir</button>
          </td>
        `;
        corpoTabela.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar bobinas eliminadas:", error);
    });
}
function excluirBobinaEliminada(id) {
  const confirmar = confirm("⚠️ Tem certeza que deseja excluir definitivamente esta bobina?");
  if (!confirmar) return; // Se clicar em 'Cancelar', nada acontece

  fetch(`https://bobinas.onrender.com/api/bobinas/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao excluir bobina");
      alert("✅ Bobina excluída com sucesso!");
      carregarEliminadas(); // Atualiza a tabela após exclusão
    })
    .catch((error) => {
      console.error("Erro ao excluir bobina:", error);
      alert("❌ Falha ao excluir bobina. Consulte o console para detalhes.");
    });
}


function alternarTabelas() {
  const tabelaNormal = document.getElementById("tabelaEstoqueContainer");
  const tabelaEliminadas = document.getElementById("tabelaEliminadasContainer");
  const titulo = document.getElementById("tituloEstoque");
  const botao = document.getElementById("btnAlternarEstoque");
  const filtro = document.getElementById("filtroEstoqueContainer");

  if (tabelaNormal.style.display !== "none") {
    // Oculta o estoque normal, mostra eliminadas
    tabelaNormal.style.display = "none";
    filtro.style.display = "none";
    tabelaEliminadas.style.display = "block";
    titulo.textContent = "Bobinas Eliminadas";
    botao.textContent = "Voltar para Estoque Atual";
    carregarEliminadas();
  } else {
    // Volta para estoque normal
    tabelaNormal.style.display = "block";
    filtro.style.display = "block";
    tabelaEliminadas.style.display = "none";
    titulo.textContent = "Estoque Atual";
    botao.textContent = "Ver Bobinas Eliminadas";
    carregarEstoque();
  }
}


async function visualizarBobina(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bobinas/${id}`);
    const bobina = await response.json();

    if (!response.ok) {
      console.error("Erro ao buscar bobina:", bobina.error);
      return;
    }
//<p><strong>Código:</strong> ${bobina.codigoQR}</p>
    let conteudo = `
           

            <p><strong>Tipo de Papel:</strong> ${bobina.tipoPapel}</p>
           
            <p><strong>Peso:</strong> ${bobina.peso} kg</p>
            <p><strong>Largura:</strong> ${bobina.largura} cm</p>
            <p><strong>Gramatura:</strong> ${bobina.gramatura} g/m²</p>
            
            <p><strong>Codigo:</strong> ${bobina.codigoQR}</p>
            
            
        `;

    // ✅ Bobinas Filhas
    const bobinasFilhas = await getBobinasFilhas(bobina._id);
    if (bobinasFilhas.length > 0) {
      conteudo += `<p><strong>Bobinas Derivadas:</strong></p><ul>`;
      bobinasFilhas.forEach((filha) => {
        conteudo += `<li>${filha.codigoQR} - ${filha.largura
          } cm - ${filha.peso.toFixed(2)} kg</li>`;
      });
      conteudo += `</ul>`;
    }

    // ✅ Folhas Geradas
    const folhasGeradas = await getFolhasByBobina(bobina._id);
    if (folhasGeradas.length > 0) {
      conteudo += `<p><strong>Folhas Geradas:</strong></p><ul>`;
      folhasGeradas.forEach((folha) => {
        conteudo += `<li>${folha.quantidade} folhas - ${folha.formato} - Cliente: ${folha.cliente}</li>`;
      });
      conteudo += `</ul>`;
    }

    document.getElementById("modalConteudo").innerHTML = conteudo;

    
  /*// ✅ QR Code
    const qrContainer = document.getElementById("qrCodeContainer");
    qrContainer.innerHTML = ""; // Limpa antes

    if (bobina.codigoQR && bobina.codigoQR.trim() !== "") {
      const canvas = document.createElement("canvas");
      qrContainer.appendChild(canvas);

      QRCode.toCanvas(canvas, bobina.codigoQR, { width: 200 }, (error) => {
        if (error) console.error("Erro ao gerar QR Code:", error);
      });
    } else {
      qrContainer.innerHTML = "<p>Sem QR Code disponível para esta bobina.</p>";
    }
*/
    // ✅ Abre o modal
    document.getElementById("modalBobina").style.display = "block";
  } catch (error) {
    console.error("Erro ao visualizar bobina:", error);
    alert("Erro ao visualizar bobina. Consulte o console para detalhes.");
  }
}
function prepararSaida(id) {
  getBobinaById(id)
    .then((bobina) => {
      if (!bobina) {
        alert("Bobina não encontrada!");
        return;
      }

      document.getElementById("idBobinaSaida").value = bobina._id;
      document.getElementById("pesoSaida").max = bobina.peso;
      document.getElementById("pesoSaida").value = bobina.peso;

      // Mostra o modal de saída
      document.getElementById("modalSaida").style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao preparar saída:", error);
      alert("Erro ao preparar saída. Consulte o console para detalhes.");
    });
}

// Função preparada para corrigir filtro de saída no modal de retorno
async function prepararRetorno(id) {
  try {
    // Busca a bobina
    const bobina = await getBobinaById(id);
    if (!bobina) {
      alert("Bobina não encontrada!");
      return;
    }

    // Preenche o ID do retorno
    document.getElementById("idBobinaRetorno").value = bobina._id;

    // Busca o histórico e loga para debug
    const historico = await getHistoricoByBobina(bobina._id);
    console.log("Histórico retornado para bobina", bobina._id, historico);

    // Ajusta filtro para encontrar a saída
    const saida = historico.find((mov) => {
      console.log("checando movimento:", mov);
      const tipo = mov.tipoMovimentacao
        ? mov.tipoMovimentacao.toString().toLowerCase()
        : "";
      const retornou = mov.dataRetorno || mov.data_retorno;
      return tipo.includes("saída") && !retornou;
    });

    if (!saida) {
      alert("Não foi encontrado registro de saída para esta bobina!");
      return;
    }

    // Preenche os campos do modal de retorno
    document.getElementById("idMovimentoRetorno").value = saida._id || saida.id;
    document.getElementById("tipoMaquinaRetorno").value = saida.tipoMaquina;
    const pesoTotal = saida.quantidade;
    document.getElementById("pesoRestante").value = 0;
    document.getElementById("pesoUtilizado").readOnly = true;

    // Atualiza o campo pesoUtilizado automaticamente

    document.getElementById("pesoRestante").addEventListener("input", () => {
      const restante =
        parseFloat(document.getElementById("pesoRestante").value) || 0;
      const utilizado = pesoTotal - restante;
      document.getElementById("pesoUtilizado").value =
        utilizado > 0 ? utilizado.toFixed(2) : "0.00";
    });

    // Preenche largura e gramatura atuais como valores iniciais
    document.getElementById("novaLargura").value = bobina.largura;
    document.getElementById("novaGramatura").value = bobina.gramatura;

    // Seleciona o tipo de retorno padrão (bobinas/folhas/ambos)
    document.getElementById("retornoBobinas").checked = true;

    // Exibe/esconde seções conforme tipo de máquina
    const bobinasContainer = document.getElementById("bobinasContainer");
    const folhasContainer = document.getElementById("folhasContainer");

    // Mostra sempre ambas por padrão; se quiser refinar, teste saida.tipoMaquina aqui
    bobinasContainer.style.display = "block";
    folhasContainer.style.display = "block";

    // ... restante da configuração dos campos de retorno ...

    // Abre modal
    document.getElementById("modalRetorno").style.display = "block";
  } catch (error) {
    console.error("Erro ao preparar retorno:", error);
    alert("Erro ao preparar retorno. Consulte o console para detalhes.");
  }
}

function fecharModal() {
  document.getElementById("modalBobina").style.display = "none";
  document.getElementById("modalSaida").style.display = "none";
  document.getElementById("modalRetorno").style.display = "none";
}

async function registrarRetorno(event) {
  event.preventDefault();

  // 1) Validação manual dos campos dinâmicos
  const tipoRetorno = document.querySelector(
    'input[name="tipoRetorno"]:checked'
  ).value;
  const quantidadeBobinas = parseInt(
    document.getElementById("quantidadeBobinas").value,
    10
  );

  if (
    (tipoRetorno === "bobinas" || tipoRetorno === "ambos") &&
    quantidadeBobinas > 0
  ) {
    for (let i = 0; i < quantidadeBobinas; i++) {
      const peso = document.getElementById(`pesoBobina${i}`).value;
      const largura = document.getElementById(`larguraBobina${i}`).value;
      const gram = document.getElementById(`gramaturaBobina${i}`).value;
      if (!peso || !largura || !gram) {
        alert(`Preencha peso, largura e gramatura da bobina ${i + 1}`);
        return;
      }
    }
  }

  // 2) Coleta de dados do modal
  const idBobina = document.getElementById("idBobinaRetorno").value;
  const idMovimento = document.getElementById("idMovimentoRetorno").value;
  const tipoMaquina = document.getElementById("tipoMaquinaRetorno").value;
  const pesoUtilizado = parseFloat(
    document.getElementById("pesoUtilizado").value
  );
  const pesoRestante = parseFloat(
    document.getElementById("pesoRestante").value
  );
  const novaLargura = parseFloat(document.getElementById("novaLargura").value);
  const novaGramatura = parseInt(
    document.getElementById("novaGramatura").value,
    10
  );
  const quantidadeFolhas = parseInt(
    document.getElementById("quantidadeFolhas").value,
    10
  );
  const formatoFolhas = document.getElementById("formatoFolhas").value;
  const clienteFolhas = document.getElementById("clienteFolhas").value;
  const observacoes = document.getElementById("observacaoRetorno").value;
  const pesoPerda = parseFloat(document.getElementById("pesoPerda").value) || 0;
  const obsFinal = `Perda: ${pesoPerda.toFixed(2)} kg. ${observacoes}`;


  if (!idBobina || !idMovimento || isNaN(pesoUtilizado)) {
    alert("Preencha todos os campos obrigatórios corretamente!");
    return;
  }

  try {
    // 3) Busca bobina e histórico
    const bobina = await getBobinaById(idBobina);
    const historico = await getHistoricoByBobina(idBobina);

    if (!bobina) {
      alert("Bobina não encontrada!");
      return;
    }

    const movimento = historico.find(
      (mov) => mov._id === idMovimento || mov.id === idMovimento
    );
    if (!movimento) {
      alert("Movimento de saída não encontrado!");
      return;
    }

    if (pesoUtilizado > movimento.quantidade) {
      alert("O peso utilizado não pode ser maior que o peso retirado.");
      return;
    }

    // 4) Atualiza bobina (peso e status) corretamente — soma o peso retornado com o que ainda restava no estoque
    bobina.dataSaida = null;

    // 🔧 Recupera o peso atual da bobina (que estava em estoque)
    const pesoAtual = parseFloat(bobina.peso) || 0;

    // 🔧 Soma o peso retornado (pesoRestante) com o peso que já estava
    const novoPesoTotal = pesoAtual + (parseFloat(pesoRestante) || 0);

    // 🔧 Atualiza a bobina com o novo total
    bobina.peso = novoPesoTotal;

    // Mantém outros ajustes
    if (!isNaN(novaLargura)) bobina.largura = novaLargura;
    if (!isNaN(novaGramatura)) bobina.gramatura = novaGramatura;

    // Atualiza no banco
    await updateBobina(bobina);


    // Se o peso retornado for 0, mover automaticamente para bobinas eliminadas
    if (bobina.peso === 0) {
      alert("O peso retornado é 0. A bobina será movida para Bobinas Eliminadas.");
      bobina.eliminada = true;
      await updateBobina(bobina);
    }


    // ✅ Corrige o problema de o nome do usuário ser substituído por observações

    // 1️⃣ Garante que o usuário original da SAÍDA seja lido corretamente
    let usuarioOriginal =
      (typeof movimento.usuario === "string" && movimento.usuario.trim() !== "")
        ? movimento.usuario.trim()
        : (
          movimento.user ||
          movimento.usuarioSaida ||
          movimento.nomeUsuario ||
          document.getElementById("usuarioSaida")?.value ||
          "Sistema"
        );

    // 2️⃣ Se o campo 'usuario' parece uma observação, limpa e usa o usuário atual do formulário de retorno
    if (/perda|peso usado|produzimos|folhas|kg/i.test(usuarioOriginal)) {
      console.warn("⚠️ Campo 'usuario' parecia observação, substituindo por usuário do retorno");
      usuarioOriginal = document.getElementById("usuarioRetorno")?.value?.trim() || "Sistema";
    }

    // 3️⃣ Registra o histórico com o usuário correto e observações separadas
    await addMovimentoHistorico({
      idBobina: bobina._id,
      tipoMovimentacao: "RETORNO",
      quantidade: pesoUtilizado,
      tipoMaquina,
      usuario: usuarioOriginal, // 👈 agora garantido
      observacoes: obsFinal, // 👈 apenas observações aqui
      idMovimentoOrigem: movimento._id,
      data: new Date(),
    });

    console.log("✅ Movimento de retorno gravado com usuário:", usuarioOriginal);



    // 6) Gera bobinas filhas e/ou folhas, se aplicável
    const promises = [];
    if (
      (tipoRetorno === "bobinas" || tipoRetorno === "ambos") &&
      quantidadeBobinas > 0
    ) {
      for (let i = 0; i < quantidadeBobinas; i++) {
        const pesoIndividual = parseFloat(
          document.getElementById(`pesoBobina${i}`)?.value || "0"
        );

        const novaBobina = {
          tipoPapel: bobina.tipoPapel,
          fabricante: bobina.fabricante,
          peso: pesoIndividual,
          pesoInicial: pesoIndividual,
          largura: parseFloat(
            document.getElementById(`larguraBobina${i}`)?.value ||
            bobina.largura
          ),
          gramatura: parseInt(
            document.getElementById(`gramaturaBobina${i}`)?.value ||
            bobina.gramatura
          ),
          localizacao: bobina.localizacao,
          fornecedor: bobina.fornecedor,
          dataEntrada: new Date(),
          codigoQR: gerarCodigoBobina({
            tipoPapel: bobina.tipoPapel,
            peso: pesoIndividual,
            largura: novaLargura,
            gramatura: novaGramatura,
          }),


        };

        promises.push(
          addBobina(novaBobina).then((bn) =>
            addBobinaOrigem({
              idBobinaOrigem: bobina._id,
              idBobinaNova: bn._id || bn.id,
            })
          )
        );
      }
    }
    if (
      (tipoRetorno === "folhas" || tipoRetorno === "ambos") &&
      quantidadeFolhas > 0 &&
      formatoFolhas
    ) {
      promises.push(
        addFolhas({
          idBobinaOrigem: bobina._id,
          quantidade: quantidadeFolhas,
          formato: formatoFolhas,
          cliente: clienteFolhas || "Não informado",
          pesoUtilizado,
          dataProcessamento: new Date(),
        })
      );
    }
    await Promise.all(promises);

    // 7) Confirma e atualiza UI
    alert("Retorno registrado com sucesso!");
    fecharModal();
    carregarEstoque();
    carregarHistorico?.();
  } catch (error) {
    console.error("Erro ao registrar retorno:", error);
    alert("Erro ao registrar retorno. Consulte o console para detalhes.");
  }
}

// substituir a função carregarHistorico existente por esta versão
async function carregarHistorico() {
  try {
    // busca histórico e bobinas em paralelo
    const [historico, bobinas] = await Promise.all([getAllHistorico(), getAllBobinas()]);

    // cria mapa id -> código legível (prioriza codigoQR, senão últimos 6 do _id)
    const mapaBobinas = {};
    bobinas.forEach((b) => {
      mapaBobinas[b._id] = b.codigoQR || "-";



    });

    const corpoTabela = document.getElementById("corpoTabelaHistorico");
    if (!corpoTabela) return;
    corpoTabela.innerHTML = "";

    // helper: tenta extrair perda em kg de diferentes campos
    function extrairPerda(mov) {
      if (typeof mov.perda === "number") return mov.perda.toFixed(2);
      if (typeof mov.pesoPerda === "number") return mov.pesoPerda.toFixed(2);
      // tenta achar "Perda: X kg" dentro de observações
      const obs = mov.observacoes || "";
      const m = obs.match(/Perda:\s*([0-9.,]+)\s*kg/i);
      if (m) return parseFloat(m[1].replace(",", ".")).toFixed(2);
      return "-";
    }

    historico.forEach((mov) => {
      const data = mov.data ? new Date(mov.data) : null;
      const dataTexto = data ? `${data.toLocaleDateString()} ${data.toLocaleTimeString()}` : "-";

      // determina código legível da bobina
      let codigo = "-";
      if (mov.idBobina) codigo = mapaBobinas[mov.idBobina] || "-";

      else if (mov.idFolhas) codigo = "FOLHAS";

      // tipo, quantidade/peso
      const tipo = mov.tipoMovimentacao ? mov.tipoMovimentacao + (mov.tipoMaquina ? " (" + mov.tipoMaquina + ")" : "") : "-";

      // ✅ Mostra o peso restante da bobina em vez do peso usado
      // ✅ Mostra o peso usado na SAÍDA e o peso atual nas demais movimentações
      let peso = "0.00";

      // Verifica o tipo de movimentação (em minúsculas para evitar erro de capitalização)
      const tipoMov = (mov.tipoMovimentacao || "").toLowerCase();

      if (tipoMov.includes("saída")) {
        // 👉 SAÍDA → mostra o peso usado (quantidade retirada)
        if (typeof mov.quantidade === "number") {
          peso = mov.quantidade.toFixed(2);
        } else if (mov.quantidade) {
          peso = parseFloat(String(mov.quantidade).replace(",", ".")).toFixed(2);
        }
      } else {
        // 👉 RETORNO, ENTRADA, etc → mostra o peso atual da bobina
        if (mov.idBobina && mapaBobinas[mov.idBobina]) {
          const bobinaAtual = bobinas.find(b => b._id === mov.idBobina);
          peso = bobinaAtual && typeof bobinaAtual.peso === "number"
            ? bobinaAtual.peso.toFixed(2)
            : "0.00";
        } else if (typeof mov.quantidade === "number") {
          peso = mov.quantidade.toFixed(2);
        }
      }

      // extração de perda e observações
      const perda = extrairPerda(mov);
      const observacoes = mov.observacoes || "-";

      // ✅ Garante que sempre seja usado o campo 'usuario' original, sem heurísticas
      let usuario = mov.usuario || mov.user || mov.usuario_nome || mov.nomeUsuario || "Sistema";

      // Se o usuário contém texto que parece ser observação, substitui por 'Sistema' e registra no console
      if (typeof usuario === "string" && /perda|peso usado|peso usado:|kg|folhas/i.test(usuario)) {
        console.warn("⚠️ Corrigido campo 'usuario' incorreto:", usuario, "→ Sistema");
        usuario = "Sistema";
      }


      // fallback final: se ainda não tem usuário, tenta pegar a última SAÍDA da mesma bobina
      if (!usuario && mov.idBobina) {
        const saidas = historico
          .filter((m) => (m.idBobina === mov.idBobina || m.idBobina === mov.idBobina) &&
            (m.tipoMovimentacao || "").toString().toLowerCase().includes("saída"));
        if (saidas.length > 0) {
          const semRetorno = saidas.find(s => !s.dataRetorno && !s.data_retorno) || saidas[saidas.length - 1];
          usuario = semRetorno?.usuario || semRetorno?.user || null;
        }
      }

      // por fim, se nada foi encontrado, define um valor padrão
      if (!usuario) usuario = "Sistema";

      // Monta a linha com a ordem correta: Usuário antes de Observações
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${dataTexto}</td>
        <td>${codigo}</td>
        <td>${tipo}</td>
        <td>${peso}</td>
        <td>${usuario}</td>
        <td>${perda}</td>
        <td>${observacoes}</td>
        <td class="no-print">
          <button class="btn-danger" onclick="excluirMovimentacao('${mov._id || mov.id}')">Excluir</button>
        </td>
      `;
      corpoTabela.appendChild(tr);
    });

  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    alert("Erro ao carregar histórico. Consulte o console para detalhes.");
  }
}
// Função robusta para excluir movimentação e mostrar diagnóstico em caso de erro
async function excluirMovimentacao(idMov) {
  if (!confirm("⚠️ Tem certeza que deseja excluir permanentemente esta movimentação?")) return;

  // Checagem rápida
  console.log("Tentando excluir movimentação:", idMov);
  if (!idMov) {
    alert("ID da movimentação inválido. Verifique o console.");
    console.error("excluirMovimentacao: idMov indefinido ou vazio");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/movimentacoes/${idMov}`, {
      method: "DELETE",
      // se seu servidor requer autenticação/cookies descomente abaixo:
      // credentials: 'include'
    });

    // lê o corpo como texto (poderá ser JSON ou mensagem simples)
    const bodyText = await res.text();

    if (!res.ok) {
      // Mostra status e corpo no console para diagnóstico
      console.error("Falha ao excluir movimentação. Status:", res.status, "Resposta:", bodyText);
      // tenta extrair uma mensagem JSON se for JSON
      try {
        const parsed = JSON.parse(bodyText);
        alert(`Erro ao excluir movimentação: ${parsed.error || parsed.message || res.status}`);
      } catch (e) {
        alert(`Erro ao excluir movimentação. Status ${res.status}. Verifique o console para detalhes.`);
      }
      return;
    }

    // Sucesso — tenta parsear JSON de confirmação, se houver
    try {
      const data = JSON.parse(bodyText || "{}");
      console.log("Movimentação excluída (resposta):", data);
    } catch (e) {
      console.log("Movimentação excluída. Resposta (texto):", bodyText);
    }

    alert("✅ Movimentação excluída com sucesso!");
    // atualiza a tabela
    if (typeof carregarHistorico === "function") carregarHistorico();
  } catch (err) {
    console.error("Erro de rede ao tentar excluir movimentação:", err);
    alert("Erro de conexão ao excluir movimentação. Verifique o console e se o servidor está rodando.");
  }
}



function gerarRelatorio() {
  const tipoRelatorio = document.getElementById("tipoRelatorio").value;
  const resultado = document.getElementById("resultadoRelatorio");
  const conteudo = document.getElementById("conteudoRelatorio");

  resultado.style.display = "none";

  if (tipoRelatorio === "estoqueAtual") {
    getAllBobinas().then((bobinas) => {
      let html = `<h3>Estoque Atual - Total: ${bobinas.length} bobinas</h3>`;
      html += `<table border="1" style="width:100%; border-collapse:collapse;">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Tipo</th>
                                    <th>Fabricante</th>
                                    <th>Peso (kg)</th>
                                    <th>Largura</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>`;

      bobinas.forEach((bobina) => {
        const status = bobina.dataSaida ? "EM USO" : "DISPONÍVEL";
        html += `<tr>
                                <td>${bobina.codigoQR}</td>



                                <td>${bobina.tipoPapel}</td>
                                <td>${bobina.fabricante}</td>
                                <td>${bobina.peso.toFixed(2)}</td>
                                <td>${bobina.largura} cm</td>
                                <td>${status}</td>
                            </tr>`;
      });

      html += `</tbody></table>`;
      conteudo.innerHTML = html;
      resultado.style.display = "block";
    });
  } else if (tipoRelatorio === "movimentacaoPeriodo") {
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    if (!dataInicio || !dataFim) {
      alert("Por favor, selecione o período para o relatório!");
      return;
    }

    Promise.all([getAllHistorico(), getAllBobinas()])
      .then(([historico, bobinas]) => {
        const mapaBobinas = {};
        bobinas.forEach((b) => {
          mapaBobinas[b._id] = b.codigoQR || "-";

        });

        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59, 999);

        const movimentacoes = historico.filter((mov) => {
          const dataMov = new Date(mov.data);
          return dataMov >= inicio && dataMov <= fim;
        });

        let html = `<h3>Movimentações de ${inicio.toLocaleDateString()} até ${fim.toLocaleDateString()}</h3>`;
        html += `<p>Total de movimentações: ${movimentacoes.length}</p>`;
        html += `<table border="1" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>Data/Hora</th>
            <th>Código</th>
            <th>Nome da Bobina</th>
            <th>Tipo</th>
            <th>Máquina</th>
            <th>Peso Entrada</th>
            <th>Peso Saída</th>
            <th>Usuário</th>
            <th>Perda (kg)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>`;

        movimentacoes.forEach((mov) => {
          const data = new Date(mov.data);
          const tipo = mov.tipoMovimentacao || "-";
          const maquina = mov.tipoMaquina || "Não informado";
          const usuario = mov.usuario || "Não informado";
          const peso = mov.quantidade ? mov.quantidade.toFixed(2) : "0.00";
          const obs = mov.observacoes || "-";
          let perdaMatch = obs.match(/Perda:\s*([\d,.]+)/i);
          const perda = perdaMatch
            ? parseFloat(perdaMatch[1].replace(",", "."))
            : 0;


          let pesoEntrada = "-";
          let pesoSaida = "-";
          if (tipo === "ENTRADA" || tipo === "RETORNO") {
            pesoEntrada = peso + " kg";
          } else if (tipo === "SAÍDA") {
            pesoSaida = peso + " kg";
          }

          html += `<tr>
          <td>${data.toLocaleDateString()} ${data.toLocaleTimeString()}</td>
          <td>
  ${mov.idBobina && mapaBobinas[mov.idBobina]
              ? mapaBobinas[mov.idBobina]
              : (mov.idBobina || mov.idFolhas || "-").slice(-6)
            }
</td>
          <td>${tipoPapel}</td>
          <td>${tipo}</td>
          <td>${maquina}</td>
          <td>${pesoEntrada}</td>
          <td>${pesoSaida}</td>
          <td>${usuario}</td>
          <td>${perda.toFixed(2)}</td>
          <td>${obs}</td>
        </tr>`;
        });

        html += `</tbody></table>`;
        conteudo.innerHTML = html;
        resultado.style.display = "block";
      })
      .catch((error) => {
        console.error("Erro ao gerar relatório:", error);
        alert("Erro ao gerar relatório. Consulte o console.");
      });
  } else if (tipoRelatorio === "estoqueMinimo") {
    conteudo.innerHTML =
      "<h3>Alerta de Estoque Mínimo</h3><p>Funcionalidade em desenvolvimento.</p>";
    resultado.style.display = "block";
  }
}
function gerarEtiqueta(bobina, maquina, usuario) {
  document.getElementById("etiquetaCodigo").textContent =
    bobina.codigoQR || "-"
  document.getElementById("etiquetaTipoPapel").textContent =
    bobina.tipoPapel || "-";
  document.getElementById("etiquetaFabricante").textContent =
    bobina.fabricante || "-";
  document.getElementById("etiquetaPeso").textContent =
    bobina.peso?.toFixed(2) || "0.00";
  document.getElementById("etiquetaLargura").textContent =
    bobina.largura || "-";
  document.getElementById("etiquetaGramatura").textContent =
    bobina.gramatura || "-";
  document.getElementById("etiquetaUsuario").textContent = usuario || "-";
    document.getElementById("etiquetaMaquina").textContent = maquina || "-";
  
  document.getElementById("etiquetaData").textContent =
    new Date().toLocaleString();

  document.getElementById("etiqueta").style.display = "block";
  window.print();
  document.getElementById("etiqueta").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  carregarEstoque();

  // Formulário de cadastro
  // Substitua o listener de submit do formBobina por este
  document.getElementById("formBobina").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = document.getElementById("formBobina");
    const idEditando = form.getAttribute("data-editando");

    const novaBobina = {
      tipoPapel: document.getElementById("tipoPapel").value,
      fabricante: document.getElementById("fabricante").value,
      peso: parseFloat(document.getElementById("peso").value),
      largura: parseFloat(document.getElementById("largura").value),
      gramatura: parseFloat(document.getElementById("gramatura").value),
      localizacao: document.getElementById("localizacao").value,
      fornecedor: document.getElementById("fornecedor").value,
      
    };

    try {
      if (idEditando) {
        // EDIÇÃO: busca a bobina original e mantém campos imutáveis
        const bobinaOriginal = await getBobinaById(idEditando);

        // preserve identificadores e metadados que não devem mudar
        novaBobina._id = bobinaOriginal._id;
        novaBobina.codigoQR = bobinaOriginal.codigoQR;
        novaBobina.dataEntrada = bobinaOriginal.dataEntrada;
        novaBobina.pesoInicial = bobinaOriginal.pesoInicial ?? bobinaOriginal.peso;

        // Faz o PUT com os dados atualizados (mantendo o id)
        await updateBobina(novaBobina);

        alert("✅ Bobina atualizada com sucesso!");
        form.removeAttribute("data-editando");
        document.querySelector("#formBobina button[type='submit']").textContent = "Cadastrar Bobina";
        document.getElementById("cancelarEdicao").style.display = "none";
      } else {
        // NOVA BOBINA
        novaBobina.pesoInicial = novaBobina.peso;
        novaBobina.dataEntrada = new Date();
        //novaBobina.codigoQR = `BOBINA-${Date.now()}`;
        novaBobina.codigoQR = gerarCodigoBobina(novaBobina);

        const data = await addBobina(novaBobina);
        // addBobina já cria e retorna o registro; atualizamos o codigoQR com o _id
        //data.codigoQR = data._id;
        //await updateBobina(data);

        // registra movimentação de entrada
        await addMovimentoHistorico({
          idBobina: data._id,
          tipoMovimentacao: "ENTRADA",
          quantidade: data.peso,
          data: new Date(),
          usuario: "Sistema",
          observacoes: "Cadastro inicial",
        });

        alert("✅ Bobina cadastrada com sucesso!");
      }

      form.reset();
      carregarEstoque();
      if (typeof carregarHistorico === "function") carregarHistorico();
    } catch (error) {
      console.error("Erro ao salvar bobina:", error);
      alert("❌ Erro ao salvar bobina. Consulte o console para mais detalhes.");
    }
  });



  // Formulário de saída
  document
    .getElementById("formSaida")
    .addEventListener("submit", registrarSaida);

  // Formulário de retorno
  document
    .getElementById("formRetorno")
    .addEventListener("submit", registrarRetorno);

  // Controle de tipo de retorno
  document.querySelectorAll('input[name="tipoRetorno"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const tipo = event.target.value;
      const bobinasContainer = document.getElementById("bobinasContainer");
      const folhasContainer = document.getElementById("folhasContainer");

      if (tipo === "bobinas") {
        bobinasContainer.style.display = "block";
        folhasContainer.style.display = "none";
      } else if (tipo === "folhas") {
        bobinasContainer.style.display = "none";
        folhasContainer.style.display = "block";
      } else if (tipo === "ambos") {
        bobinasContainer.style.display = "block";
        folhasContainer.style.display = "block";
      }
    });
  });

  // Controle de quantidade de bobinas geradas
  document
    .getElementById("quantidadeBobinas")
    .addEventListener("change", (event) => {
      const quantidade = parseInt(event.target.value);
      const container = document.getElementById("bobinasGeradasContainer");
      const divBobinas = document.getElementById("bobinasGeradas");

      if (quantidade > 0) {
        container.style.display = "block";
        divBobinas.innerHTML = "";

        for (let i = 0; i < quantidade; i++) {
          divBobinas.innerHTML += `
        <div class="form-group">
            <label>Bobina ${i + 1} - Peso (kg):</label>
            <input type="number" id="pesoBobina${i}" name="pesoBobina${i}" step="0.01" min="0" >
            <label>Largura (cm):</label>
            <input type="number" id="larguraBobina${i}" name="larguraBobina${i}" step="0.01" min="0" >
            <label>Gramatura (g/m²):</label>
            <input type="number" id="gramaturaBobina${i}" name="gramaturaBobina${i}" step="0.01" min="0" >
        </div>
    `;
        }
      } else {
        container.style.display = "none";
      }
    });

  // Filtro de estoque
  document.getElementById("filtro").addEventListener("input", (event) => {
    const filtro = event.target.value.toLowerCase();
    const linhas = document.querySelectorAll("#corpoTabelaEstoque tr");

    linhas.forEach((linha) => {
      const textoLinha = linha.textContent.toLowerCase();
      linha.style.display = textoLinha.includes(filtro) ? "" : "none";
    });
  });

  // Controle do relatório
  document
    .getElementById("tipoRelatorio")
    .addEventListener("change", (event) => {
      const filtroPeriodo = document.getElementById("filtroPeriodo");
      filtroPeriodo.style.display =
        event.target.value === "movimentacaoPeriodo" ? "block" : "none";
    });
  document.getElementById("cancelarEdicao").addEventListener("click", () => {
    document.getElementById("formBobina").reset();
    document.getElementById("formBobina").removeAttribute("data-editando");
    document.querySelector("#formBobina button[type='submit']").textContent =
      "Cadastrar Bobina";
    document.getElementById("cancelarEdicao").style.display = "none";
  });
});

function openTab(tabId, event) {
  // Esconde todos os conteúdos de tab
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
    // como fallback, também escondemos via style (caso o CSS use display)
    tabContents[i].style.display = "none";
  }

  // Remove a classe active de todas as tabs
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Mostra o conteúdo da tab selecionada (se existir)
  const conteudo = document.getElementById(tabId);
  if (conteudo) {
    conteudo.classList.add("active");
    conteudo.style.display = "block";
  } else {
    console.warn(`openTab: conteúdo com id "${tabId}" não encontrado.`);
  }

  // Seta o botão (event.currentTarget) como active, se fornecido
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  } else {
    // fallback: tenta encontrar o botão por texto/atributo (silencioso)
    // (não necessário, só evita que nada quebre)
  }

  // Atualiza os dados se necessário
  if (tabId === "estoque") {
    if (typeof carregarEstoque === "function") carregarEstoque();
  } else if (tabId === "movimentacao") {
    if (typeof carregarHistorico === "function") carregarHistorico();
  } else if (tabId === "relatorios") {
    if (typeof gerarRelatorio === "function") {
      // pega o select de tipoRelatorio e dispara mudança caso necessário
      document.getElementById("tipoRelatorio")?.dispatchEvent(new Event("change"));
    }
  }
}

function deletarBobina(id) {
  if (
    !confirm(
      "Tem certeza que deseja excluir esta bobina? Essa ação não pode ser desfeita."
    )
  ) {
    return;
  }

  fetch(`${API_BASE_URL}/bobinas/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => Promise.reject(text));
      }
      alert("Bobina excluída com sucesso!");
      carregarEstoque();
    })
    .catch((error) => {
      console.error("Erro ao excluir bobina:", error);
      alert(
        "Erro ao excluir a bobina. Verifique o console para mais detalhes."
      );
    });
}

function editarBobina(id) {
  getBobinaById(id)
    .then((bobina) => {
      if (!bobina) {
        alert("Bobina não encontrada para edição.");
        return;
      }

      // Preenche o formulário de cadastro com os dados da bobina
      document.getElementById("tipoPapel").value = bobina.tipoPapel || "";
      document.getElementById("fabricante").value = bobina.fabricante || "";
      document.getElementById("peso").value = bobina.peso || "";
      document.getElementById("largura").value = bobina.largura || "";
      document.getElementById("gramatura").value = bobina.gramatura || "";
      document.getElementById("localizacao").value = bobina.localizacao || "";
      document.getElementById("fornecedor").value = bobina.fornecedor || "";
      

      // Armazena o ID da bobina para uso na atualização
      document
        .getElementById("formBobina")
        .setAttribute("data-editando", bobina._id);
      document.querySelector("#formBobina button[type='submit']").textContent =
        "Salvar Alterações";
      document.getElementById("cancelarEdicao").style.display = "inline-block";

      // Vai para a aba de cadastro
      openTab("cadastro");
    })
    .catch((error) => {
      console.error("Erro ao carregar bobina para edição:", error);
      alert("Erro ao carregar bobina. Consulte o console para mais detalhes.");
    });
}
function normalizarLinhaExcel(linha) {
  return {
    tipoPapel: String(
      linha["Tipo"] ||
      linha["Tipo de Papel"] ||
      ""
    ).trim(),

    fabricante: String(
      linha["Fabricante"] || ""
    ).trim(),

    fornecedor: String(
      linha["Fornecedor"] ||
      linha["Fabricante"] ||
      ""
    ).trim(),

    peso: Number(
      String(
        linha["Peso_kg"] ||
        linha["Peso (kg)"] ||
        ""
      ).replace(",", ".")
    ),

    largura: Number(
      String(
        linha["Largura_cm"] ||
        linha["Largura"] ||
        linha["Largura (cm)"] ||
        ""
      ).replace(",", ".")
    ),

    gramatura: Number(
      String(
        linha["Gramatura_gm2"] ||
        linha["Gramatura"] ||
        linha["Gramatura (g/m²)"] ||
        ""
      ).replace(",", ".")
    ),

    cor: String(linha["Cor"] || "Branco").trim(),
    localizacao: String(
      linha["Localização"] || "Armazém Principal"
    )
  };
}

async function importarExcel() {
  const input = document.getElementById("inputExcel");

  if (!input.files.length) {
    alert("Selecione uma planilha Excel");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = async function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const linhasExcel = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        raw: false
      });

      if (!linhasExcel.length) {
        alert("Planilha vazia");
        return;
      }

      // 🔎 busca bobinas existentes UMA vez
      const resp = await fetch(`${API_BASE_URL}/bobinas`);
      const todasBobinas = await resp.json();

      const novas = [];
      const atualizadas = [];

      for (const linha of linhasExcel) {
        const bobina = normalizarLinhaExcel(linha);

        const codigoExcel = String(
          linha["Código"] || linha["Codigo"] || ""
        ).trim();

        // 🆕 SEM CÓDIGO → NOVA
        if (!codigoExcel) {
          novas.push({
            ...bobina,
            codigoQR: gerarCodigoBobina(bobina),
            dataEntrada: new Date(),
            pesoInicial: bobina.peso
          });
          continue;
        }

        // 🔎 COM CÓDIGO → BUSCA EXISTENTE
        const existente = todasBobinas.find(
          b => String(b.codigoQR).trim() === codigoExcel
        );

        // 🆕 código não existe no sistema
        if (!existente) {
          novas.push({
            ...bobina,
            codigoQR: codigoExcel,
            dataEntrada: new Date(),
            pesoInicial: bobina.peso
          });
          continue;
        }

        // 🔁 EXISTE → ATUALIZA
        atualizadas.push({
          _id: existente._id,
          ...bobina
        });
      }

      // 🚀 ENVIA TUDO DE UMA VEZ
      const response = await fetch(`${API_BASE_URL}/bobinas/importar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novas, atualizadas })
      });

      if (!response.ok) {
        throw new Error("Erro na importação em lote");
      }

      const resultado = await response.json();

      alert(
        `Importação finalizada ✅\n` +
        `Criadas: ${resultado.criadas}\n` +
        `Atualizadas: ${resultado.atualizadas}`
      );

      carregarEstoque();

    } catch (err) {
      console.error("Erro ao importar Excel:", err);
      alert("Erro ao importar planilha. Veja o console.");
    }
  };

  reader.readAsArrayBuffer(file);
}





function parseNumero(valor) {
  if (typeof valor === "number") return valor;
  if (!valor) return NaN;
  return Number(String(valor).replace(",", "."));
}

async function exportarEstoqueCompletoExcel() {
  try {
    const wb = XLSX.utils.book_new();

    /* =======================
       ABA 1 – ESTOQUE ATUAL
       ======================= */
    let bobinas = await getAllBobinas();

    const estoque = bobinas.filter(b => !b.eliminada);
    const eliminadas = bobinas.filter(b => b.eliminada);

    if (estoque.length === 0 && eliminadas.length === 0) {
      alert("⚠️ Não há dados para exportar.");
      return;
    }

    if (estoque.length > 0) {
      const dadosEstoque = estoque.map(b => ({
        Código: b.codigoQR,
        Tipo: b.tipoPapel,
        Fabricante: b.fabricante,
        Peso_kg: b.peso,
        Largura_cm: b.largura,
        Gramatura_gm2: b.gramatura,
        Fornecedor: b.fornecedor || "",
        Localização: b.localizacao || "",
        Status: b.dataSaida ? "EM USO" : "DISPONÍVEL"
      }));

      const wsEstoque = XLSX.utils.json_to_sheet(dadosEstoque);
      XLSX.utils.book_append_sheet(wb, wsEstoque, "Estoque Atual");
    }

    /* =======================
       ABA 2 – ELIMINADAS
       ======================= */
    if (eliminadas.length > 0) {
      const dadosEliminadas = eliminadas.map(b => ({
        Código: b.codigoQR,
        Tipo: b.tipoPapel,
        Fabricante: b.fabricante,
        Peso_kg: b.peso,
        Largura_cm: b.largura,
        Gramatura_gm2: b.gramatura,
        "Data de Saída": b.dataSaida || ""
      }));

      const wsEliminadas = XLSX.utils.json_to_sheet(dadosEliminadas);
      XLSX.utils.book_append_sheet(wb, wsEliminadas, "Bobinas Eliminadas");
    }

    /* =======================
       ABA 3 – HISTÓRICO
       ======================= */
    if (typeof getHistorico === "function") {
      const historico = await getHistorico();

      if (historico && historico.length > 0) {
        const dadosHistorico = historico.map(h => ({
          Data: h.data,
          Bobina: h.codigoQR || h.idBobina,
          Tipo: h.tipoPapel,
          Máquina: h.tipoMaquina,
          Peso_kg: h.peso,
          Usuário: h.usuario,
          Perda_kg: h.perda || 0,
          Observações: h.observacao || ""
        }));

        const wsHistorico = XLSX.utils.json_to_sheet(dadosHistorico);
        XLSX.utils.book_append_sheet(wb, wsHistorico, "Histórico");
      }
    }

    XLSX.writeFile(wb, "controle_estoque_bobinas.xlsx");

  } catch (error) {
    console.error("Erro ao exportar estoque completo:", error);
    alert("❌ Erro ao exportar. Veja o console.");
  }
}


function aplicarEstiloCabecalho(worksheet) {
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const endereco = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[endereco]) continue;

    worksheet[endereco].s = {
      font: { bold: true },
      alignment: { horizontal: "center" }
    };
  }

  // Ativa filtro automático
  worksheet["!autofilter"] = {
    ref: worksheet["!ref"]
  };
}



document.getElementById("inputExcel").addEventListener("change", importarExcel);
 async function apagarTodoEstoque() {
  const senha = prompt("Digite a senha para apagar TODO o estoque:");
  if (senha !== "admin123") {
    alert("❌ Senha incorreta");
    return;
  }

  const confirmar = confirm(
    "⚠️ ATENÇÃO!\nIsso irá apagar TODAS as bobinas do sistema.\nEssa ação é IRREVERSÍVEL.\n\nDeseja continuar?"
  );

  if (!confirmar) return;

  try {
    const res = await fetch(`${API_BASE_URL}/bobinas`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const erro = await res.text();
      throw new Error(erro);
    }

    alert("✅ Estoque apagado com sucesso!");
    carregarEstoque();
    carregarHistorico?.();
  } catch (err) {
    console.error("Erro ao apagar estoque:", err);
    alert("❌ Erro ao apagar o estoque. Veja o console.");
  }
}
