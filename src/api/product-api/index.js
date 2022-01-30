export async function getProductsCatalog() {
    let url = `http://localhost:3006/catalog`;
    let response = await fetch(url);

    return await response.json();
}

