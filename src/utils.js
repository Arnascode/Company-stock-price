// export async function myFetch(url, method = 'GET', data = null) {
//   try {
//     const options = {
//       headers: { 'Content-Type': 'application/json' },
//     };
//     options.method = method === 'POST' ? 'POST' : 'GET';
//     options.body = data ? JSON.stringify(data) : null;

//     const resp = await fetch(url, options);
//     const dataInJs = await resp.json();
//     return dataInJs;
//   } catch (error) {
//     console.log('myFetch error ===', error);
//   }
// }

export async function myFetchAuth(url, symbol) {
  try {
    // const options = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    const resp = await fetch(url, symbol);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}
export async function myFetch(url) {
  try {
    // const options = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    const resp = await fetch(url);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}

export const baseUrl = process.env.REACT_APP_BACKEND_URL;
if (!baseUrl) throw new Error('baseUrl nerastas');
