/* =========================================================
   SPT — SCRIPT.JS
   PESQUISA + MENU MOBILE + INTERAÇÕES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenuBtn = document.getElementById("closeMenu");
    const mobileMenuOverlay =
        document.getElementById("mobileMenuOverlay");

    const searchBtn =
        document.getElementById("searchBtn");

    const searchPanel =
        document.getElementById("searchPanel");

    const closeSearchBtn =
        document.getElementById("closeSearch");

    const searchInput =
        document.getElementById("searchInput");

    const searchMessage =
        document.getElementById("searchMessage");


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add("open");
        }

        document.body.classList.add("menu-open");

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "true");
        }

        mobileMenu.setAttribute("aria-hidden", "false");
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove("open");
        }

        document.body.classList.remove("menu-open");

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "false");
        }

        mobileMenu.setAttribute("aria-hidden", "true");
    }


    /* =====================================================
       BOTÃO ☰
    ===================================================== */

    if (menuBtn) {

        menuBtn.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (mobileMenu.classList.contains("open")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    /* =====================================================
       BOTÃO ×
    ===================================================== */

    if (closeMenuBtn) {

        closeMenuBtn.addEventListener("click", (event) => {

            event.preventDefault();

            closeMobileMenu();

        });

    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    if (mobileMenuOverlay) {

        mobileMenuOverlay.addEventListener("click", () => {

            closeMobileMenu();

        });

    }


    /* =====================================================
       LINKS DO MENU
    ===================================================== */

    if (mobileMenu) {

        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    closeMobileMenu();

                });

            });

    }


    /* =====================================================
       FECHAR MENU AO VOLTAR PARA DESKTOP
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       PESQUISA — ABRIR
    ===================================================== */

    function openSearch() {

        if (!searchPanel) return;

        searchPanel.classList.add("open");

        document.body.classList.add("menu-open");

        setTimeout(() => {

            if (searchInput) {
                searchInput.focus();
            }

        }, 100);

    }


    /* =====================================================
       PESQUISA — FECHAR
    ===================================================== */

    function closeSearch() {

        if (!searchPanel) return;

        searchPanel.classList.remove("open");

        document.body.classList.remove("menu-open");

    }


    /* =====================================================
       BOTÃO PESQUISA
    ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener("click", (event) => {

            event.preventDefault();

            openSearch();

        });

    }


    /* =====================================================
       FECHAR PESQUISA
    ===================================================== */

    if (closeSearchBtn) {

        closeSearchBtn.addEventListener("click", (event) => {

            event.preventDefault();

            closeSearch();

        });

    }


    /* =====================================================
       CLICAR FORA DA PESQUISA
    ===================================================== */

    if (searchPanel) {

        searchPanel.addEventListener("click", (event) => {

            if (event.target === searchPanel) {

                closeSearch();

            }

        });

    }


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();
            closeSearch();

        }

    });


    /* =====================================================
       PESQUISA NOS CONTEÚDOS
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const term =
                searchInput.value.trim();

            if (!searchMessage) return;


            if (!term) {

                searchMessage.textContent =
                    "Pesquise por notícias, programas ou temas.";

                return;

            }


            const searchTerm =
                term.toLowerCase();


            const elements =
                document.querySelectorAll(
                    ".card h3, " +
                    ".mini-grid h3, " +
                    ".ranking p, " +
                    ".section-heading h2, " +
                    ".program strong, " +
                    ".topics a"
                );


            let found = false;


            elements.forEach((element) => {

                if (
                    element.textContent
                        .toLowerCase()
                        .includes(searchTerm)
                ) {

                    found = true;

                }

            });


            if (found) {

                searchMessage.textContent =
                    `Foram encontrados conteúdos relacionados com "${term}".`;

            } else {

                searchMessage.textContent =
                    `Não foram encontrados resultados para "${term}".`;

            }

        });

    }


    /* =====================================================
       CATEGORIAS
    ===================================================== */

    const topicLinks =
        document.querySelectorAll(".topics a");


    topicLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            topicLinks.forEach((item) => {

                item.classList.remove("selected");

            });

            event.currentTarget.classList.add("selected");

        });

    });


    /* =====================================================
       BOTÕES DIRETO
    ===================================================== */

    document
        .querySelectorAll(
            ".live-button, .mobile-live, .watch"
        )
        .forEach((button) => {

            button.addEventListener("click", () => {

                console.log(
                    "SPT — transmissão em direto"
                );

            });

        });


    /* =====================================================
       BOTÕES PLAY
    ===================================================== */

    document
        .querySelectorAll(".play-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                console.log(
                    "SPT — reprodução"
                );

            });

        });

});