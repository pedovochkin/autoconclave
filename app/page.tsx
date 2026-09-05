'use client';

import { FormEvent, TouchEvent, useRef, useState } from 'react';

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

function Arrow({ direction = 'next', diagonal = false }: { direction?: 'next' | 'prev'; diagonal?: boolean }) {
  return <span className={`ra-arrow ${direction === 'prev' ? 'ra-arrow-prev' : 'ra-arrow-next'}${diagonal ? ' ra-arrow-diagonal' : ''}`} aria-hidden="true" />;
}

const markets = [
  ['01', 'Европа', 'Дилеры и закрытые аукционы'], ['02', 'США', 'Широкий выбор и история'], ['03', 'Китай', 'Новые технологии'],
  ['04', 'Корея', 'Проверенные площадки'], ['05', 'Дубай', 'Премиальные автомобили'], ['06', 'Япония', 'Прозрачные аукционы'],
];
const services = [
  ['01', 'Подбор', 'Определяем правильную конфигурацию под задачу и бюджет.'],
  ['02', 'Проверка', 'Изучаем историю, состояние и документы до выкупа.'],
  ['03', 'Поставка', 'Проектируем маршрут, страхуем и ведём таможенное оформление.'],
  ['04', 'Выдача', 'Передаём ключи и комплект документов без скрытых этапов.'],
];
const steps = [
  ['Запрос', 'Расскажите, какой автомобиль нужен и что для вас действительно важно.'],
  ['Шорт-лист', 'Получите несколько проверенных вариантов с понятным сравнением.'],
  ['Сделка', 'Утвердите автомобиль и финальный бюджет перед выкупом.'],
  ['Доставка', 'Следите за ключевыми точками маршрута вместе с менеджером.'],
  ['Ключи', 'Заберите проверенный автомобиль и полный комплект документов.'],
];
const cases = [
  {
    model:'Porsche Cayenne',
    details:['2023 год', '50 000 км', 'США → Москва · 4 месяца'],
    price:'120 000 $ под ключ',
    photos:[
      { image:'/images/cases/porsche-cayenne-01.jpg', alt:'Porsche Cayenne — вид спереди' },
      { image:'/images/cases/porsche-cayenne-02.jpg', alt:'Porsche Cayenne — вид сзади' },
      { image:'/images/cases/porsche-cayenne-03.jpg', alt:'Porsche Cayenne — салон' },
    ],
  },
  {
    model:'BMW X5 3.0d',
    details:['Пробег 5 000 км', 'Европа → Москва · 1,5 месяца'],
    price:'187 000 $ под ключ',
    photos:[
      { image:'/images/cases/bmw-x5-01.jpg', alt:'BMW X5 — вид спереди' },
      { image:'/images/cases/bmw-x5-02.jpg', alt:'BMW X5 — вид сзади' },
      { image:'/images/cases/bmw-x5-03.jpg', alt:'BMW X5 — салон' },
    ],
  },
  {
    model:'GMC Yukon 3.0 дизель',
    details:['2023 год · 61 000 км', 'США → Москва · 4 месяца'],
    price:'105 000 $ под ключ',
    photos:[
      { image:'/images/cases/gmc-yukon-01.jpg', alt:'GMC Yukon — вид спереди' },
      { image:'/images/cases/gmc-yukon-02.jpg', alt:'GMC Yukon — вид сзади' },
      { image:'/images/cases/gmc-yukon-03.jpg', alt:'GMC Yukon — салон' },
    ],
  },
  {
    model:'Mercedes-Benz GLS',
    details:['2023 год · 36 000 км', 'Корея → Москва · 2 месяца'],
    price:'120 000 $ под ключ',
    photos:[
      { image:'/images/cases/mercedes-gls-01.jpg', alt:'Mercedes-Benz GLS — вид спереди' },
      { image:'/images/cases/mercedes-gls-02.jpg', alt:'Mercedes-Benz GLS — вид сзади' },
      { image:'/images/cases/mercedes-gls-03.jpg', alt:'Mercedes-Benz GLS — салон' },
    ],
  },
  {
    model:'Lamborghini Urus',
    details:['2025 год · новый автомобиль', 'Европа → Москва · 1,5 месяца'],
    price:'435 000 $ под ключ',
    photos:[
      { image:'/images/cases/lamborghini-urus-01.jpg', alt:'Lamborghini Urus — вид спереди' },
      { image:'/images/cases/lamborghini-urus-02.jpg', alt:'Lamborghini Urus — вид сзади' },
      { image:'/images/cases/lamborghini-urus-03.jpg', alt:'Lamborghini Urus — салон' },
    ],
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const galleryTouchStart = useRef<{ x: number; y: number } | null>(null);
  const currentCase = cases[caseIndex];
  const currentPhoto = currentCase.photos[photoIndex];
  const showPreviousPhoto = () => setPhotoIndex((photoIndex + currentCase.photos.length - 1) % currentCase.photos.length);
  const showNextPhoto = () => setPhotoIndex((photoIndex + 1) % currentCase.photos.length);

  function startGalleryTouch(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    galleryTouchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function finishGalleryTouch(event: TouchEvent<HTMLDivElement>) {
    const start = galleryTouchStart.current;
    const touch = event.changedTouches[0];
    galleryTouchStart.current = null;
    if (!start) return;
    const distanceX = touch.clientX - start.x;
    const distanceY = touch.clientY - start.y;
    if (Math.abs(distanceX) < 44 || Math.abs(distanceX) < Math.abs(distanceY)) return;
    if (distanceX > 0) showPreviousPhoto(); else showNextPhoto();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className={`ra-header ra-shell${mobileMenuOpen ? ' menu-open' : ''}`} id="top">
        <a href="#top" className="ra-brand" onClick={() => setMobileMenuOpen(false)}><img src={asset('/images/logo-dark-bg.png')} alt="Авто-Конклав" /></a>
        <nav id="site-navigation" aria-label="Основная навигация"><a href="#services" onClick={() => setMobileMenuOpen(false)}>Услуги</a><a href="#route" onClick={() => setMobileMenuOpen(false)}>Маршрут</a><a href="#cases" onClick={() => setMobileMenuOpen(false)}>Поставки</a><a href="#about" onClick={() => setMobileMenuOpen(false)}>О компании</a><a className="ra-nav-request" href="#request" onClick={() => setMobileMenuOpen(false)}>Обсудить задачу <Arrow diagonal /></a></nav>
        <a className="ra-menu-cta" href="#request">Обсудить задачу <Arrow diagonal /></a>
        <button className="ra-mobile-menu" type="button" aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={mobileMenuOpen} aria-controls="site-navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><span /><span /><span /></button>
      </header>

      <section className="ra-hero ra-shell">
        <div className="ra-hero-title">
          <div className="ra-index"><span>Автомобили со всего мира</span><b>1998—2026</b></div>
          <h1>Автомобиль.<br /><em>Без границ<span className="ra-hero-dot">.</span></em></h1>
          <div className="ra-hero-bottom"><p>Профессиональный подбор, проверка, выкуп и доставка автомобилей из шести ключевых рынков — под единым контролем.</p><a href="#request">Начать подбор <Arrow diagonal /></a></div>
        </div>
        <div className="ra-hero-media"><img src={asset('/images/hero-mercedes.jpg')} alt="Mercedes-Benz — автомобиль, поставленный Авто-Конклав" /><div className="ra-media-label"><small>Поставка под ключ</small><b>Европа → Москва</b></div><span className="ra-media-number">01</span></div>
        <div className="ra-facts"><div><strong>27+</strong><span>лет опыта</span></div><div><strong>1000+</strong><span>доставок</span></div><div><strong>6</strong><span>направлений</span></div><div><strong>1</strong><span>менеджер<br/>на связи</span></div></div>
      </section>

      <section className="ra-section ra-services" id="services"><div className="ra-shell">
        <div className="ra-section-title"><span>01 / Система работы</span><h2>Сложный процесс.<br /><em>Простой для вас.</em></h2></div>
        <div className="ra-service-grid">{services.map(([number,title,text]) => <article key={number}><div><span>{number}</span><i><Arrow diagonal /></i></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="ra-atlas"><div className="ra-shell ra-atlas-grid">
        <div className="ra-atlas-copy"><span>02 / География</span><h2>Шесть рынков.<br /><em>Один стандарт.</em></h2><p>Знаем особенности каждой площадки, логистического плеча и комплекта документов.</p></div>
        <div className="ra-market-list">{markets.map(([number,name,detail]) => <div key={number}><span>{number}</span><b>{name}</b><small>{detail}</small><i><Arrow /></i></div>)}</div>
      </div></section>

      <section className="ra-section ra-route" id="route"><div className="ra-shell">
        <div className="ra-section-title"><span>03 / Путь к автомобилю</span><h2>От запроса<br /><em>до ключей.</em></h2></div>
        <div className="ra-route-tabs" role="tablist">{steps.map(([title],index) => <button className={step===index?'active':''} key={title} type="button" role="tab" aria-selected={step===index} onClick={()=>setStep(index)}><span>{String(index+1).padStart(2,'0')}</span><b>{title}</b></button>)}</div>
        <div className="ra-route-panel" role="tabpanel"><div><small>Текущий этап</small><strong>{String(step+1).padStart(2,'0')}</strong></div><h3>{steps[step][0]}</h3><p>{steps[step][1]}</p><button type="button" onClick={()=>setStep((step+1)%steps.length)}>Следующий <Arrow /></button></div>
      </div></section>

      <section className="ra-section ra-cases" id="cases"><div className="ra-shell">
        <div className="ra-section-title"><span>04 / Поставленные автомобили</span><h2>Выбор,<br /><em>подтверждённый делом.</em></h2></div>
        <div className="ra-case-layout">
          <div className="ra-case-main" onTouchStart={startGalleryTouch} onTouchEnd={finishGalleryTouch}><img src={asset(currentPhoto.image)} alt={currentPhoto.alt}/><span>{String(caseIndex+1).padStart(2,'0')} / {String(cases.length).padStart(2,'0')}</span><div className="ra-case-controls"><button type="button" onClick={showPreviousPhoto} aria-label="Предыдущая фотография"><Arrow direction="prev" /></button><b>{String(photoIndex+1).padStart(2,'0')} / {String(currentCase.photos.length).padStart(2,'0')}</b><button type="button" onClick={showNextPhoto} aria-label="Следующая фотография"><Arrow /></button></div></div>
          <div className="ra-case-info"><small>Кейс поставки</small><strong>{String(caseIndex+1).padStart(2,'0')} / {String(cases.length).padStart(2,'0')}</strong><h3>{currentCase.model}</h3><div className="ra-case-details">{currentCase.details.map((detail) => <span key={detail}>{detail}</span>)}</div><div className="ra-case-price"><small>Стоимость с доставкой</small><b>{currentCase.price}</b></div><a href="#request">Обсудить похожий <Arrow diagonal /></a></div>
          <div className="ra-case-strip" aria-label="Выбор автомобиля">{cases.map((item,index)=><button className={caseIndex===index?'active':''} type="button" key={item.model} aria-label={`Открыть кейс ${item.model}`} onClick={()=>{setCaseIndex(index);setPhotoIndex(0);}}><img src={asset(item.photos[0].image)} alt=""/><span>{String(index+1).padStart(2,'0')} · {item.model}</span></button>)}</div>
          <div className="ra-case-gallery" aria-label={`Фотографии ${currentCase.model}`}>{currentCase.photos.map((item,index)=><button className={photoIndex===index?'active':''} type="button" key={item.image} aria-label={`Открыть фотографию ${index+1}`} onClick={()=>setPhotoIndex(index)}><img src={asset(item.image)} alt={item.alt}/><span>{String(index+1).padStart(2,'0')}</span></button>)}</div>
        </div>
      </div></section>

      <section className="ra-section ra-about" id="about"><div className="ra-shell ra-about-grid">
        <div className="ra-about-copy"><span>05 / Авто-Конклав</span><blockquote>«Мы строим доверие не словами, а контролем каждой детали сделки».</blockquote><p>С 1998 года команда поставляет автомобили, мотоциклы, специальную технику, катера и яхты. Международный опыт превратили в понятную систему для частного клиента.</p><div><b>Моженков Михаил Владимирович</b><small>Управляющий директор</small></div></div>
        <div className="ra-about-media"><img src={asset('/images/director-v2.png')} alt="Михаил Моженков, управляющий директор"/><span>27 лет<br/>в автобизнесе</span></div>
      </div></section>

      <section className="ra-request" id="request"><div className="ra-shell ra-request-grid">
        <div><span>06 / Ваш запрос</span><h2>Давайте найдём<br /><em>ваш автомобиль.</em></h2><p>Опишите ориентиры — марку, модель и бюджет. Мы вернёмся с вопросами и понятным планом действий.</p><div className="ra-contacts"><a href="tel:+79031307887">+7 (903) 130-78-87</a><a href="mailto:info@autoconclave.com">info@autoconclave.com</a></div></div>
        <form onSubmit={submit}><label><span>Имя</span><input required name="name" placeholder="Ваше имя"/></label><label><span>Телефон</span><input required name="phone" placeholder="+7 900 000-00-00"/></label><label><span>Автомобиль</span><input name="car" placeholder="Марка и модель"/></label><label><span>Бюджет</span><input name="budget" placeholder="Ориентир"/></label><button type="submit">Отправить запрос <Arrow diagonal /></button>{sent&&<p>Спасибо. Черновик заявки готов — свяжитесь с нами по телефону или почте.</p>}</form>
      </div></section>

      <footer><div className="ra-shell ra-footer"><img src={asset('/images/logo-dark-bg.png')} alt="Авто-Конклав"/><p>Москва · ул. Верхняя, 20к1<br/>Ежедневно 09:00—20:00</p><a href="#top">Наверх <Arrow diagonal /></a></div></footer>
    </main>
  );
}
