// --- SISTEMA DE ALTERNÂNCIA DE TEMA (CLARO / ESCURO) ---
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    
    // 1. Verifica se o utilizador já tinha uma preferência salva, caso contrário usa 'dark' como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // 2. Aplica o tema inicial na tag <html>
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(themeBtn, savedTheme);

    // 3. Escutador de clique para alternar o tema
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            // Se está dark, muda para light. Se está light, muda para dark.
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Aplica no HTML e salva no navegador (localStorage)
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            
            // Atualiza o texto/emoji do botão
            updateThemeButton(themeBtn, targetTheme);
        });
    }
});

// Função auxiliar para mudar o visual do botão
function updateThemeButton(button, theme) {
    if (!button) return;
    if (theme === 'dark') {
        button.textContent = '☀️ Modo Claro';
    } else {
        button.textContent = '🌙 Modo Escuro';
    }
}


// --- MENU HAMBÚRGUER RESPONSIVO (MOBILE) ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Fecha o menu móvel automaticamente ao clicar em qualquer link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});