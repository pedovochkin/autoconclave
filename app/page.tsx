'use client';

import { FormEvent, useState } from 'react';

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

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
    model:'Porsche Cayenne', category:'Автомобиль · 3 фотографии',
    meta:'Экстерьер и салон. Реальные фотографии автомобиля после поставки.',
    photos:[
      { image:'/images/cases/porsche-cayenne-01.jpg', alt:'Porsche Cayenne — вид спереди' },
      { image:'/images/cases/porsche-cayenne-02.jpg', alt:'Porsche Cayenne — вид сзади' },
      { image:'/images/cases/porsche-cayenne-03.jpg', alt:'Porsche Cayenne — салон' },
    ],
  },
  {
    model:'BMW X7', category:'Автомобиль · 3 фотографии',
    meta:'Экстерьер и салон. Реальные фотографии автомобиля после поставки.',
    photos:[
      { image:'/images/cases/bmw-x7-01.jpg', alt:'BMW X7 — вид спереди' },
      { image:'/images/cases/bmw-x7-02.jpg', alt:'BMW X7 — вид сзади' },
      { image:'/images/cases/bmw-x7-03.jpg', alt:'BMW X7 — салон' },
    ],
  },
  {
    model:'GMC Yukon', category:'Автомобиль · 3 фотографии',
    meta:'Экстерьер и салон. Реальные фотографии автомобиля после поставки.',
    photos:[
      { image:'/images/cases/gmc-yukon-01.jpg', alt:'GMC Yukon — вид спереди' },
      { image:'/images/cases/gmc-yukon-02.jpg', alt:'GMC Yukon — вид сзади' },
      { image:'/images/cases/gmc-yukon-03.jpg', alt:'GMC Yukon — салон' },
    ],
  },
  {
    model:'Kawasaki Versys 1000', category:'Мотоцикл · 3 фотографии',
    meta:'Внешний вид и ключевые детали. Реальные фотографии мотоцикла после поставки.',
    photos:[
      { image:'/images/cases/kawasaki-versys-01.jpg', alt:'Kawasaki Versys 1000 — общий вид' },
      { image:'/images/cases/kawasaki-versys-02.jpg', alt:'Kawasaki Versys 1000 — бак и логотип' },
      { image:'/images/cases/kawasaki-versys-03.jpg', alt:'Kawasaki Versys 1000 — двигатель' },
    ],
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const currentCase = cases[caseIndex];
  const currentPhoto = currentCase.photos[photoIndex];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className="ra-header ra-shell" id="top">
        <a href="#top" className="ra-brand"><img src={asset('/images/logo-dark-bg.png')} alt="Авто-Конклав" /></a>
        <nav aria-label="Основная навигация"><a href="#services">Услуги</a><a href="#route">Маршрут</a><a href="#cases">Поставки</a><a href="#about">О компании</a></nav>
        <a className="ra-menu-cta" href="#request">Обсудить задачу <span>↗</span></a>
      </header>

      <section className="ra-hero ra-shell">
        <div className="ra-hero-title">
          <div className="ra-index"><span>Автомобили со всего мира</span><b>1998—2026</b></div>
          <h1>Автомобиль.<br /><em>Без границ.</em></h1>
          <div className="ra-hero-bottom"><p>Профессиональный подбор, проверка, выкуп и доставка автомобилей из шести ключевых рынков — под единым контролем.</p><a href="#request">Начать подбор <span>↗</span></a></div>
        </div>
        <div className="ra-hero-media"><img src={asset('/images/case-5.jpg')} alt="Mercedes GLE Coupe, поставленный Авто-Конклав" /><div className="ra-media-label"><small>Поставка под ключ</small><b>Европа → Москва</b></div><span className="ra-media-number">01</span></div>
        <div className="ra-facts"><div><strong>27+</strong><span>лет опыта</span></div><div><strong>1000+</strong><span>доставок</span></div><div><strong>06</strong><span>рынков</span></div><div><strong>01</strong><span>ответственный</span></div></div>
      </section>

      <section className="ra-section ra-services" id="services"><div className="ra-shell">
        <div className="ra-section-title"><span>01 / Система работы</span><h2>Сложный процесс.<br /><em>Простой для вас.</em></h2></div>
        <div className="ra-service-grid">{services.map(([number,title,text]) => <article key={number}><div><span>{number}</span><i>↗</i></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="ra-atlas"><div className="ra-shell ra-atlas-grid">
        <div className="ra-atlas-copy"><span>02 / География</span><h2>Шесть рынков.<br /><em>Один стандарт.</em></h2><p>Знаем особенности каждой площадки, логистического плеча и комплекта документов.</p></div>
        <div className="ra-market-list">{markets.map(([number,name,detail]) => <div key={number}><span>{number}</span><b>{name}</b><small>{detail}</small><i>→</i></div>)}</div>
      </div></section>

      <section className="ra-section ra-route" id="route"><div className="ra-shell">
        <div className="ra-section-title"><span>03 / Путь к автомобилю</span><h2>От запроса<br /><em>до ключей.</em></h2></div>
        <div className="ra-route-tabs" role="tablist">{steps.map(([title],index) => <button className={step===index?'active':''} key={title} type="button" role="tab" aria-selected={step===index} onClick={()=>setStep(index)}><span>{String(index+1).padStart(2,'0')}</span><b>{title}</b></button>)}</div>
        <div className="ra-route-panel" role="tabpanel"><div><small>Текущий этап</small><strong>{String(step+1).padStart(2,'0')}</strong></div><h3>{steps[step][0]}</h3><p>{steps[step][1]}</p><button type="button" onClick={()=>setStep((step+1)%steps.length)}>Следующий <span>→</span></button></div>
      </div></section>

      <section className="ra-section ra-cases" id="cases"><div className="ra-shell">
        <div className="ra-section-title"><span>04 / Поставленные автомобили</span><h2>Выбор,<br /><em>подтверждённый делом.</em></h2></div>
        <div className="ra-case-layout">
          <div className="ra-case-main"><img src={asset(currentPhoto.image)} alt={currentPhoto.alt}/><span>{String(caseIndex+1).padStart(2,'0')} / {String(cases.length).padStart(2,'0')}</span><b>{String(photoIndex+1).padStart(2,'0')} / {String(currentCase.photos.length).padStart(2,'0')}</b></div>
          <div className="ra-case-info"><small>Реальная поставка</small><strong>{String(caseIndex+1).padStart(2,'0')} / {String(cases.length).padStart(2,'0')}</strong><h3>{currentCase.model}</h3><p>{currentCase.category}<br/>{currentCase.meta}</p><a href="#request">Обсудить похожий <span>↗</span></a></div>
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
        <form onSubmit={submit}><label><span>Имя</span><input required name="name" placeholder="Ваше имя"/></label><label><span>Телефон</span><input required name="phone" placeholder="+7 900 000-00-00"/></label><label><span>Автомобиль</span><input name="car" placeholder="Марка и модель"/></label><label><span>Бюджет</span><input name="budget" placeholder="Ориентир"/></label><button type="submit">Отправить запрос <span>↗</span></button>{sent&&<p>Спасибо. Черновик заявки готов — свяжитесь с нами по телефону или почте.</p>}</form>
      </div></section>

      <footer><div className="ra-shell ra-footer"><img src={asset('/images/logo-dark-bg.png')} alt="Авто-Конклав"/><p>Москва · ул. Верхняя, 20к1<br/>Ежедневно 09:00—20:00</p><a href="#top">Наверх ↑</a></div></footer>
    </main>
  );
}
