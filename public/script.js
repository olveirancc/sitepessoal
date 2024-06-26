const nome = document.querySelector('#nome')
const perfil = document.querySelector('#perfil')
const localizacao = document.querySelector('#localizacao')
const seguidores = document.querySelector('#seguidores')
const bio = document.querySelector('#bio')
const repositorios = document.querySelector('#repositorios')
const colegas = document.querySelector('#colegas')
const videos = document.querySelector('#videos')
const nick = document.querySelector('#nick')


function getConteudos() {
    fetch('https://api.github.com/users/olveirancc')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            nick.textContent = data.login
            nome.textContent = data.name
            perfil.setAttribute("src", data.avatar_url)
            bio.textContent = data.bio
            followers.innerHTML += data.followers
            localizacao.innerHTML += data.localizacao
        })
}

function getRepos() {
    fetch('https://api.github.com/users/olveirancc/repos')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            data.forEach((repo) => {
                repositorios.innerHTML += `
    <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <a target="_blank" href="/DIW-main%20(2)/ana_yuki_1524619.zip/DIW-main/secao1.html?name=${repo.name}">
              <p class="card-text ">${repo.description}</p>
            </a>
          </div>
        </div>
      </div>
`
            })
        })
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