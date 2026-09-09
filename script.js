// Atualizar Relógio e Data em Tempo Real
function updateClock() {
    const now = new Date();
    
    // Horário (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}`;

    // Data Formatada
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const dateString = now.toLocaleDateString('pt-BR', options);
    document.getElementById('widget-date').innerText = dateString;
}

setInterval(updateClock, 1000);
updateClock();

// Função para abrir Aplicativos
function openApp(appId) {
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetApp = document.getElementById(appId);
    if (targetApp) {
        targetApp.classList.add('active');
    }
}

// Botões Físicos de Navegação do Celular
function goHome() {
    openApp('home-screen');
}

function goBack() {
    const browserHome = document.getElementById('google-home');
    const webFrame = document.getElementById('web-frame');

    // Se o iframe estiver visível, volta para a tela inicial do Google
    if (webFrame.style.display === 'block') {
        webFrame.style.display = 'none';
        webFrame.src = '';
        browserHome.style.display = 'flex';
        document.getElementById('url-input').value = '';
    } else {
        // Se já estiver na Home do navegador, volta para a Home do Celular
        goHome();
    }
}

function showTabs() {
    alert("Recurso de Multitarefas / Abas em breve!");
}

// LÓGICA DE PESQUISA E NAVEGAÇÃO WEB
function searchWeb(query) {
    if (!query.trim()) return;

    const webFrame = document.getElementById('web-frame');
    const googleHome = document.getElementById('google-home');
    const urlInput = document.getElementById('url-input');

    let finalUrl = '';

    // Verifica se o usuário digitou um link (URL) ou um termo de busca
    if (query.startsWith('http://') || query.startsWith('https://')) {
        finalUrl = query;
    } else if (query.includes('.') && !query.includes(' ')) {
        finalUrl = 'https://' + query;
    } else {
        // Motor de busca configurado (DuckDuckGo/Bing incorporável)
        finalUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    }

    // Exibe o iframe com o resultado e oculta a tela 'Google Home'
    urlInput.value = query;
    googleHome.style.display = 'none';
    webFrame.style.display = 'block';
    webFrame.src = finalUrl;
}

// Trata o Input da barra superior do navegador
function handleSearch(event) {
    if (event.key === 'Enter') {
        executeSearch();
    }
}

function executeSearch() {
    const query = document.getElementById('url-input').value;
    searchWeb(query);
}

// Trata o Input da página inicial estilo Google
function handleGoogleHomeSearch(event) {
    if (event.key === 'Enter') {
        executeGoogleHomeSearch();
    }
}

function executeGoogleHomeSearch() {
    const query = document.getElementById('google-search-input').value;
    searchWeb(query);
}

