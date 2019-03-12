const HOST = 'https://api.invoice-app.2muchcoffee.com/api';
//const HOST = 'http://10.0.3.2:8000/api';
export const URL_ALL_CUSTOMERS = `${HOST}/customers`;
export const URL_ALL_INVOICES = `${HOST}/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/products`;

export async function request<T>(url: string, config: object = {}): Promise<T> {
  try {
    const res = await fetch(url, config);
    if (res.ok) return await res.json();
    throw new Error((await res.json()).message);
  } catch (err) {
    throw err;
  }
}

export async function fetchAll<T>(url: string, config: object = {}): Promise<T[]> {
  try {
    const res = await fetch(url, config);
    if (res.ok) return await res.json();
    throw new Error((await res.json()).message);
  } catch (err) {
    throw err;
  }
}
