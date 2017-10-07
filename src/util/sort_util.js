export function nameSort(a, b) {
  var nameA = a.name.toUpperCase()
  var nameB = b.name.toUpperCase()
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
}
