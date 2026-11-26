import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = new URL('./', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const script = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!script) throw new Error('Missing application module in index.html');

const result = await build({
  stdin: { contents: script[1], resolveDir: fileURLToPath(root), loader: 'js' },
  bundle: true,
  minify: true,
  format: 'iife',
  legalComments: 'inline',
  target: 'safari13',
  write: false,
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const license = await readFile(new URL('node_modules/three/LICENSE', root), 'utf8');
const page = html
  .replace(/^\s*<link[^>]+https:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net\/npm\/lxgw-wenkai-webfont)[^>]*>\s*$/gm, '')
  .replace(/\s*<script type="importmap">[\s\S]*?<\/script>/, '')
  .replace(script[0], () => '<script>\n' + js + '</script>')
  .replace('</html>', () => '<!-- Three.js license\n' + license + '-->\n</html>');

await mkdir(new URL('dist/', root), { recursive: true });
await writeFile(new URL('dist/index.html', root), page);
console.log('Built dist/index.html');
