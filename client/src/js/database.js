import { openDB } from 'idb'

const initdb = async () =>
  openDB('contact', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contact')) return
      else db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true })
    }
  })

export const postDb = async (name, home, cell, email) => {
  const contactDb = await openDB('contact', 1)
  const tx = contactDb.transaction('contact', 'readwrite')
  const store = tx.objectStore('contact')
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email })
  const result = await request
  return result
}

export const getDb = async () => {
  const contactDb = await openDB('contact', 1)
  const tx = contactDb.transaction('contact', 'readonly')
  const store = tx.objectStore('contact')
  const request = store.getAll()
  return await request
}

export const deleteDb = async (id) => {
  const contactDb = await openDB('contact', 1)
  const tx = contactDb.transaction('contact', 'readwrite')
  const store = tx.objectStore('contact')
  const request = store.delete(id)
  const result = await request
  return result?.value
}

initdb()
