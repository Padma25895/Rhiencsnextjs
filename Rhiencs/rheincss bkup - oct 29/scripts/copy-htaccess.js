const { copyFileSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const outputDirectory = join(__dirname, '..', 'out');
const canonicalOrigin = 'https://www.rheincs.com';

function addCanonicalLinks(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      addCanonicalLinks(entryPath);
      continue;
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.html')) {
      continue;
    }

    const relativePath = entryPath
      .slice(outputDirectory.length)
      .split(/[\\/]+/)
      .filter(Boolean)
      .join('/');

    if (relativePath.toLowerCase() === '404.html') {
      continue;
    }

    const routePath = relativePath
      .replace(/(?:^|\/)index\.html$/i, '')
      .replace(/\.html$/i, '');
    const pathname = `/${routePath ? `${routePath.replace(/^\/+|\/+$/g, '')}/` : ''}`;
    const canonicalUrl = new URL(pathname, canonicalOrigin).toString();
    const html = readFileSync(entryPath, 'utf8');

    if (!/<\/head>/i.test(html)) {
      throw new Error(`Cannot add canonical URL because ${entryPath} has no closing head tag`);
    }

    const htmlWithoutCanonicalLinks = html.replace(
      /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\/?>/gi,
      '',
    );

    writeFileSync(
      entryPath,
      htmlWithoutCanonicalLinks.replace(
        /<\/head>/i,
        `<link rel="canonical" href="${canonicalUrl}"></head>`,
      ),
      'utf8',
    );
  }
}

addCanonicalLinks(outputDirectory);
copyFileSync(join(__dirname, '..', '.htaccess'), join(outputDirectory, '.htaccess'));
