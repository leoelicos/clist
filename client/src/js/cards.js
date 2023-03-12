import { postDb, getDb, deleteDb } from './database'

const form = document.getElementById('contact-form')

window.deleteCard = (e) => {
  let id = parseInt(e.id)

  deleteDb(id)

  fetchCards()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = form.elements['name'].value
  const home = form.elements['home-phone'].value
  const cell = form.elements['cell-phone'].value
  const email = form.elements['email'].value

  postDb(name, home, cell, email)

  form.reset()

  fetchCards()
})

const fetchCards = async () => {
  const result = await getDb()

  let card = ` `

  for (let data of result) {
    card += `
    <div class="card card-rounded col-md-3 m-2">
      <div class="card-header card-rounded">
        <h1>${data.name}</h1>
      </div>
      <div class="card-body">
        <p>Home Phone: ${data.home_phone}</p>
        <p>Cell Phone: ${data.cell_phone}</p>
        <p>Email: ${data.email}</p>
      </div>
      <div class="flex-row justify-flex-end p-1">
        <button class="btn btn-sm btn-danger" id="${data.id}" onclick="deleteCard(this)">Delete</button>
      </div>
    </div>
    `
  }

  document.getElementById('card-group').innerHTML = card
}

fetchCards()
