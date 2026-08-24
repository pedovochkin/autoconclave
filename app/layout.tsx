import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://autoconclave.com'),
  title: 'Авто-Конклав — автомобили со всего мира под ключ',
  description: 'Подбор, выкуп и доставка автомобилей из Европы, США, Китая, Кореи, Дубая и Японии. Контроль на каждом этапе.',
  icons: { icon: '/icon.png' },
  openGraph: {
    title: 'Авто-Конклав — ваш автомобиль, наш точный маршрут',
    description: 'Подбор, выкуп и доставка автомобилей со всего мира под ключ.',
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Авто-Конклав' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Авто-Конклав — ваш автомобиль, наш точный маршрут',
    description: 'Подбор, выкуп и доставка автомобилей со всего мира под ключ.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
