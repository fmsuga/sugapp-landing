import {readdir,readFile,access} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).filter(x=>!['.git','SOM'].includes(x.name)).map(x=>x.isDirectory()?walk(join(dir,x.name)):join(dir,x.name)))).flat();
const files=await walk(root),html=files.filter(x=>x.endsWith('.html')&&!x.endsWith('test.html'));let errors=[];
for(const file of html){const text=await readFile(file,'utf8');const ids=[...text.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);for(const id of new Set(ids))if(ids.filter(x=>x===id).length>1)errors.push(`${file}: ID duplicado ${id}`);for(const match of text.matchAll(/(?:href|src)="([^"]+)"/g)){const ref=match[1];if(/^(?:https?:|mailto:|#|data:)/.test(ref))continue;const target=resolve(dirname(file),ref.split(/[?#]/)[0]);try{await access(target)}catch{errors.push(`${file}: ruta inexistente ${ref}`)}}if(!/<title>[^<]+<\/title>/.test(text))errors.push(`${file}: falta title`);if(!/<meta name="description"/.test(text))errors.push(`${file}: falta description`);}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`OK: ${html.length} páginas, rutas, assets, IDs y metadatos básicos.`);
