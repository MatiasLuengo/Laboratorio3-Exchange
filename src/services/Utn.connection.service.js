import axios from "axios";
const UtnInstance = axios.create({
/*   baseURL:  'https://laboratorio3-f36a.restdb.io/rest/',  
headers: { 'x-apikey': '60eb09146661365596af552f' },
*/
baseURL: 'https://labor3-d60e.restdb.io/rest/',
headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'}
});
export default UtnInstance;
