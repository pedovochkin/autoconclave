import type { Metadata } from 'next';
import './globals.css';

const repository = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const repositoryOwner = repository[0];
const repositoryName = repository[1];
const isProjectPages = process.env.GITHUB_ACTIONS === 'true'
  && repositoryName
  && !repositoryName.endsWith('.github.io');
const basePath = isProjectPages ? `/${repositoryName}` : '';
const publicOrigin = repositoryOwner && process.env.GITHUB_ACTIONS === 'true'
  ? `https://${repositoryOwner}.github.io`
  : 'https://autoconclave.com';
const siteUrl = `${publicOrigin}${basePath}`;
const canonicalUrl = `${siteUrl}/`;
const siteDescription = 'Подбор, проверка, выкуп и доставка автомобилей из Европы, США, Кореи, Китая, Японии и Дубая в Москву. Полное сопровождение сделки под ключ.';
const fontFace = `@font-face{font-family:"AutoConclave Impact";src:url("${basePath}/fonts/impact.ttf") format("truetype");font-style:normal;font-weight:400 900;font-display:swap;}`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${canonicalUrl}#website`,
      url: canonicalUrl,
      name: 'Авто-Конклав',
      alternateName: ['Авто Конклав', 'AutoConclave'],
      inLanguage: 'ru-RU',
      publisher: { '@id': `${canonicalUrl}#organization` },
    },
    {
      '@type': 'AutomotiveBusiness',
      '@id': `${canonicalUrl}#organization`,
      name: 'Авто-Конклав',
      url: canonicalUrl,
      logo: `${siteUrl}/images/logo-dark-bg.png`,
      image: `${siteUrl}/og.png`,
      description: siteDescription,
      telephone: '+79031307887',
      email: 'autoconclave@yandex.ru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'улица Верхняя, 20к1',
        addressLocality: 'Москва',
        addressCountry: 'RU',
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00',
      }],
      areaServed: { '@type': 'City', name: 'Москва' },
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: '+79031307887',
        contactType: 'customer service',
        availableLanguage: 'ru',
      }],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Авто из Европы, США, Кореи и Китая под ключ — Авто-Конклав',
  description: siteDescription,
  applicationName: 'Авто-Конклав',
  category: 'Автомобили',
  alternates: { canonical: canonicalUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: `${siteUrl}/icon.png` },
  openGraph: {
    title: 'Авто из Европы, США, Кореи и Китая под ключ — Авто-Конклав',
    description: siteDescription,
    type: 'website',
    locale: 'ru_RU',
    url: canonicalUrl,
    siteName: 'Авто-Конклав',
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: 'Авто-Конклав — автомобили со всего мира под ключ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Авто из Европы, США, Кореи и Китая под ключ — Авто-Конклав',
    description: siteDescription,
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <style dangerouslySetInnerHTML={{ __html: fontFace }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
