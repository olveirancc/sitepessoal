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
            followers.innerHTML += data.followers
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
                                <p class="card-text">${repo.description}</p>
                                <p class="card-text">Principal linguagem: ${repo.language}</p>
                                <p class="card-text">${repo.visibility}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

function getRecomendacoes() {
    fetch('http://localhost:3000/videos_recommendations')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            data.forEach((video, index) => {
                videos.innerHTML += `
         <div class="slide slide_${index + 1}">
                  <div class="slide-content">
                    <iframe width="560" height="315" src="${video.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
               </div>
`
            })
        })

}



function getColegas() {
    fetch('http://localhost:3000/colegas')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            data.forEach(colega => {
                colegas.innerHTML += `
   <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${colega.name}</h5>
              <img src="${colega.image}" id="pente" alt="">
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