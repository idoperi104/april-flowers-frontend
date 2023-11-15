export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  reset
}

function query(entityType) {
  const entities = JSON.parse(localStorage.getItem(entityType))
  return entities
}

function reset(entityType){
  _save(entityType, [])
}

function get(entityType, entityId) {
  const entities = query(entityType)
  const entity = entities.find((entity) => entity._id === entityId)
  if (!entity) return "there is no such idx"
  return entity
}

function post(entityType, newEntity) {
  newEntity = JSON.parse(JSON.stringify(newEntity))
  newEntity._id = _makeId()

  const entities = query(entityType)
  entities.push(newEntity)

  _save(entityType, entities)

  return newEntity
}

function put(entityType, updatedEntity) {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity))

  const entities = query(entityType)
  const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
  if (idx < 0) return "there is no such idx"
  entities.splice(idx, 1, updatedEntity)
  _save(entityType, entities)

  return updatedEntity
}

function remove(entityType, entityId) {
  const entities = query(entityType)

  const idx = entities.findIndex((entity) => entity._id === entityId)
  if (idx < 0) return "there is no such idx"
  entities.splice(idx, 1)

  _save(entityType, entities)
}

// Private functions

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var txt = ""
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
