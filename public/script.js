const nome = document.querySelector('#nome')
const perfil = document.querySelector('#perfil')
const local = document.querySelector('#local')
const seguidores = document.querySelector('#seguidores')
const bio = document.querySelector('#bio')
const repositorios = document.querySelector('#repositorios')
const colegas = document.querySelector('#colegas')
const videos = document.querySelector('#videos')
const nick = document.querySelector('#nick')
const compania = document.querySelector('#compania')



function getConteudos() {
    fetch('https://api.github.com/users/olveirancc')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            nick.textContent = data.login
            nome.textContent = data.name
            compania.textContent = data.company
            perfil.setAttribute("src", data.avatar_url)
            bio.textContent = data.bio
            followers.textContent = data.followers
            local.textContent = data.location
        })
}

function getRepos() {
    fetch('https://api.github.com/users/olveirancc/repos')
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            const repositorios = document.getElementById('repositorios');
            data.forEach((repo) => {
                repositorios.innerHTML += `
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <a target="_blank" href="https://github.com/olveirancc/${repo.name}">
                                    <h5 class="card-title">${repo.name}</h5> 
                                </a>
                                <br>
                                <p class="card-text">Descrição: ${repo.description}</p>
                                <p class="card-text">Principal linguagem: ${repo.language}</p>
                                <p class="card-text">Criado em: ${repo.created_at}</p>
                                <p class="card-text">Atualizado em: ${repo.updated_at}</p>
                                <p class="card-text">Visibilidade: ${repo.visibility}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

function getRecomendacoes() {
    fetch('http://localhost:3000/recomendacoes')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            const recomendacoes = document.getElementById('recomendacoes');
            recomendacoes.innerHTML += `
   <div class="slider-wrapper">
            <div class="slider">
                <img id="slide-1" src="${reco.img1}">
                <img id="slide-2" src="${reco.img2}">
                <img id="slide-3" src="${reco.img3}">
            </div>
            <div class="slider-nav">
                <a href="#slide-1"></a>
                <a href="#slide-2"></a>
                <a href="#slide-3"></a>
            </div>
        </div>
    `

        })

}



function getColegas() {
    fetch('http://localhost:3000/colegas')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            const colegas = document.getElementById('colegas');
            data.forEach(colega => {
                colegas.innerHTML += `
   <div class="col">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">${colega.nome}</h2>
              <h4 class="card-title"><a href="https://github.com/${colega.git}">${colega.git}</a></h4>
              <img src="${colega.foto}" id="pente" alt="">
            </div>
          </div>
        </div>
    `

            })

        })
}


getConteudos()
getColegas()
getRecomendacoes()
getRepos()