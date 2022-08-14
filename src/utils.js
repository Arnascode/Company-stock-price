export async function myFetchSym(url, symbol) {
  try {
    const resp = await fetch(url, symbol);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchSym error ===', error);
  }
}
export async function myFetch(url) {
  try {
    const resp = await fetch(url);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetch error ===', error);
  }
}

export const baseUrl = process.env.REACT_APP_BACKEND_URL;
if (!baseUrl) throw new Error('baseUrl nerastas');
