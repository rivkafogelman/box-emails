import dev from './dev';
import prod from './Prod';
 

let isDevOrLocal=window.location.href.includes('dev')?window.location.href.includes('dev'):window.location.href.includes('localhost')?window.location.href.includes('localhost'):null


const keys = isDevOrLocal ? dev : prod;


export default keys;