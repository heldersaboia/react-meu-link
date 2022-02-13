// Buscar os links salvos
export async function getSavedLinks(key) {
  const myLinks = await localStorage.getItem(key);

  let savedLinks = JSON.parse(myLinks) || [];
  return savedLinks;
}
// Salvar links do storage
export async function saveLink(key, newLink) {
  let storedLinks = await getSavedLinks(key);

  // Sejá existir o link, não gravar
  const hasLink = storedLinks.some((link) => link.id === newLink.id);

  if (hasLink) return;

  // Adicionar novo link
  storedLinks.push(newLink);

  await localStorage.setItem(key, JSON.stringify(storedLinks));
}

// Excluir links
export function deleteLink(myLinks, id) {
  let newLinks = myLinks.filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem("@linksCurtos", JSON.stringify(newLinks));

  return newLinks;
}
