const GITHUB_USERNAME = 'olveirancc';
        const JSON_SERVER_URL = 'http://localhost:3000';
        async function fetchGitHubProfile() {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            const data = await response.json();
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').innerText = data.name;
            document.getElementById('bio').innerText = data.bio;
            document.getElementById('email').href = `mailto:${data.email}`;
            document.getElementById('email').innerText = 'Email';
            // Preencher LinkedIn com seu link
            document.getElementById('linkedin').href = 'https://www.linkedin.com/in/seu-linkedin/';
        }

        // Função para buscar repositórios do GitHub
        async function fetchGitHubRepos() {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
            const data = await response.json();
            const reposList = document.getElementById('repos-list');
            data.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description}</p>
                        <a href="${repo.html_url}" class="btn btn-primary">Ver Repositório</a>
                    </div>
                `;
                reposList.appendChild(card);
            });
        }

        // Função para buscar conteúdo sugerido do JSONServer
        async function fetchSuggestedContent() {
            const response = await fetch(`${JSON_SERVER_URL}/suggestedContent`);
            const data = await response.json();
            const contentSuggestions = document.getElementById('content-suggestions');
            data.forEach((content, index) => {
                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
                    <img src="${content.image}" class="d-block w-100" alt="${content.title}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${content.title}</h5>
                        <p>${content.description}</p>
                    </div>
                `;
                contentSuggestions.appendChild(item);
            });
        }

        // Função para buscar colegas de trabalho do JSONServer
        async function fetchColleagues() {
            const response = await fetch(`${JSON_SERVER_URL}/colleagues`);
            const data = await response.json();
            const colleaguesList = document.getElementById('colleagues-list');
            data.forEach(colleague => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${colleague.name}</h5>
                            <p class="card-text">${colleague.description}</p>
                        </div>
                    </div>
                `;
                colleaguesList.appendChild(col);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            fetchGitHubProfile();
            fetchGitHubRepos();
            fetchSuggestedContent();
            fetchColleagues();
        });
