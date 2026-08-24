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

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin),
  title: 'Авто-Конклав — автомобили со всего мира под ключ',
  description: 'Подбор, выкуп и доставка автомобилей из Европы, США, Китая, Кореи, Дубая и Японии. Контроль на каждом этапе.',
  icons: { icon: `${basePath}/icon.png` },
  openGraph: {
    title: 'Авто-Конклав — ваш автомобиль, наш точный маршрут',
    description: 'Подбор, выкуп и доставка автомобилей со всего мира под ключ.',
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: `${basePath}/og.png`, width: 1200, height: 630, alt: 'Авто-Конклав' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Авто-Конклав — ваш автомобиль, наш точный маршрут',
    description: 'Подбор, выкуп и доставка автомобилей со всего мира под ключ.',
    images: [`${basePath}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
