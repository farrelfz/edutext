import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { ModulAjarTemplate } from '@/templates/modul-ajar';
import { RppTemplate } from '@/templates/rpp';
import { ModulPembelajaranTemplate } from '@/templates/modul-pembelajaran';
import type { DocumentType } from '@prisma/client';
import type { DocumentContent } from '@/lib/validators/document';

export function renderTemplate({
  docType,
  content
}: {
  docType: DocumentType;
  content: DocumentContent;
}) {
  const rawHtml =
    docType === 'MODUL_AJAR'
      ? renderToStaticMarkup(<ModulAjarTemplate content={content as any} />)
      : docType === 'RPP'
      ? renderToStaticMarkup(<RppTemplate content={content as any} />)
      : renderToStaticMarkup(<ModulPembelajaranTemplate content={content as any} />);

  const cssPath = path.join(process.cwd(), 'public', 'styles', 'print.css');
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : '';
  const html = rawHtml.replace(
    '<link rel="stylesheet" href="/styles/print.css" />',
    `<style>${css}</style>`
  );

  return `<!DOCTYPE html>${html}`;
}
