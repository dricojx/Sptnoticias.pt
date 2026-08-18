// Função para carregar as notícias guardadas na pasta do teu site
async function carregarNoticiasDoPainel() {
  try {
    // 1. Lemos a lista de notícias da tua pasta local (onde o site está publicado)
    // Criamos um ficheiro central index.json ou lemos a rota direta das notícias
    const resposta = await fetch('/conteudo/noticias/dados.json');
    if (!resposta.ok) {
        console.log("A aguardar dados do painel de edição.");
        return;
    }
    
    const dados = await resposta.json();
    
    // 2. SE APENAS COLOCASTE UMA MANCHETE PARA O CARROSSEL PRINCIPAL (HERO)
    if (dados.noticia_principal) {
        const hero = dados.noticia_principal;
        
        // Altera a imagem de fundo do teu carrossel/hero
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) heroImage.src = hero.imagem_url;
        
        // Altera a categoria (ex: Última Hora)
        const heroCategory = document.querySelector('.hero-content .category');
        if (heroCategory) heroCategory.innerText = hero.categoria;
        
        // Altera o título principal gigante
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) heroTitle.innerText = hero.titulo;
        
        // Altera o texto de descrição abaixo do título
        const heroDesc = document.querySelector('.hero-content p');
        if (heroDesc) heroDesc.innerText = hero.conteudo;
    }

    // 3. ADICIONA AS OUTRAS NOTÍCIAS NORMAIS NA TUA ÁREA DE CARDS
    const contentor = document.getElementById("lista-noticias");
    if (dados.noticias_normais && contentor) {
        // Limpa as repetidas se quiseres, ou deixa as originais e mete as novas no topo
        dados.noticias_normais.forEach(noticia => {
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
            // Enfia a nova notícia logo no início da lista de destaques
            contentor.insertAdjacentHTML('afterbegin', artigoHTML);
        });
    }

  } catch (erro) {
    console.error("Erro ao atualizar o carrossel e notícias:", erro);
  }
}

// Executa automaticamente sempre que o leitor abre o teu site da SPT
carregarNoticiasDoPainel();
