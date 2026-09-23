// Verificações sem dependências: sintaxe JS, imports não usados e CSS balanceado.
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(p));
    else files.push(p);
  }
  return files;
}

const files = [
  ...await walk(join(root, 'src')),
  ...await walk(join(root, 'scripts')),
  ...await walk(join(root, 'tests')),
];

for (const file of files.filter((f) => /\.(mjs|js)$/.test(f))) {
  const rel = relative(root, file);
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    problems.push(`${rel}: erro de sintaxe\n${err.stderr}`);
    continue;
  }
  const code = await readFile(file, 'utf8');
  for (const m of code.matchAll(/^import\s+(?:\*\s+as\s+(\w+)|\{([^}]+)\})\s+from/gm)) {
    const names = m[1] ? [m[1]] : m[2].split(',').map((n) => n.trim().split(/\s+as\s+/).pop()).filter(Boolean);
    const body = code.replace(m[0], '');
    for (const name of names) {
      if (!new RegExp(`\\b${name}\\b`).test(body)) problems.push(`${rel}: import não usado "${name}"`);
    }
  }
}

for (const file of files.filter((f) => f.endsWith('.css'))) {
  const css = (await readFile(file, 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  if (open !== close) problems.push(`${relative(root, file)}: chaves desbalanceadas (${open} { / ${close} })`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Lint OK: ${files.length} arquivos verificados`);
