// CONFIGURAÇÃO GRÁTIS DO BANCO DE DADOS (Ex: Supabase)
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sua-chave-anonima-do-supabase";

async function carregarNovasNoticias() {
  try {
    // 1. Procura as notícias novas que gravaste no painel
    const resposta = await fetch(`${SUPABASE_URL}/rest/v1/noticias?order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });
    
    const noticias = await resposta.json();
    const contentor = document.getElementById("lista-noticias");
    
    // 2. Adiciona as notícias novas no topo, sem apagar as tuas antigas
    noticias.forEach(noticia => {
      const artigoHTML = `
        <article class="card">
            <img src="${noticia.imagem_url}" alt="${noticia.titulo}">
            <div class="card-body">
                <span class="tag">${noticia.categoria}</span>
                <h3>${noticia.titulo}</h3>
                <time>${noticia.tempo_publicacao}</time>
            </div>
        </article>
      `;
      
      // Coloca a nova notícia logo no início da lista
      contentor.insertAdjacentHTML('afterbegin', artigoHTML);
    });

  } catch (erro) {
    console.error("Erro ao carregar novas notícias:", erro);
  }
}

// Executa a função automaticamente ao abrir o site
carregarNovasNoticias();
