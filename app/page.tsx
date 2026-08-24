'use client';

import { FormEvent, useState } from 'react';

const advantages = [
  { number: '01', title: 'Прямой доступ', text: 'Ищем на закрытых аукционах и у проверенных дилеров — без цепочки лишних посредников.' },
  { number: '02', title: 'Цена под контролем', text: 'Сразу показываем структуру бюджета: автомобиль, логистика, таможня и оформление.' },
  { number: '03', title: 'Срок в договоре', text: 'Фиксируем этапы и держим вас в курсе движения автомобиля по всему маршруту.' },
  { number: '04', title: 'Проверка до выкупа', text: 'Изучаем историю, состояние и документы до того, как автомобиль станет вашим.' },
];

const routeSteps = [
  { number: '01', title: 'Бриф', kicker: 'Старт', text: 'Фиксируем модель, комплектацию, год, пробег и комфортный бюджет. Помогаем сузить поиск до реально выгодных вариантов.' },
  { number: '02', title: 'Поиск', kicker: 'Аукционы и дилеры', text: 'Подключаем прямые каналы в Европе, США, Китае, Корее, Дубае и Японии. Проверяем историю каждого кандидата.' },
  { number: '03', title: 'Выкуп', kicker: 'Только после согласования', text: 'Вы получаете расчёт и подтверждаете конкретный автомобиль. После этого заключаем договор и проводим выкуп.' },
  { number: '04', title: 'Логистика', kicker: 'Маршрут под контролем', text: 'Организуем перевозку, страхование, таможенное оформление и информируем о статусе на ключевых точках.' },
  { number: '05', title: 'Выдача', kicker: 'Финиш без сюрпризов', text: 'Проверяем соответствие заявленным данным, готовим комплект документов и передаём автомобиль владельцу.' },
];

const cases = [
  { image: '/images/case-1.jpg', model: 'Porsche Macan', year: '2024', mileage: '13 тыс. км', price: '66 000 $', origin: 'США' },
  { image: '/images/case-2.jpg', model: 'Audi A8', year: '2022', mileage: '20 тыс. км', price: '87 000 €', origin: 'Европа' },
  { image: '/images/case-3.jpg', model: 'Porsche Cayenne', year: '2024', mileage: '52 тыс. км', price: '145 000 $', origin: 'США' },
  { image: '/images/case-4.jpg', model: 'GMC Yukon', year: '2022', mileage: '38 тыс. км', price: '129 000 $', origin: 'США' },
  { image: '/images/case-5.jpg', model: 'Mercedes GLE Coupe', year: '2025', mileage: 'Новый', price: '157 000 $', origin: 'Европа' },
  { image: '/images/case-6.jpg', model: 'BMW X7', year: '2022', mileage: '36 тыс. км', price: '119 000 $', origin: 'США' },
];

type RequestDraft = { name: string; phone: string; car: string; budget: string };

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [draft, setDraft] = useState<RequestDraft | null>(null);

  const currentCase = cases[caseIndex];

  function shiftCase(direction: number) {
    setCaseIndex((current) => (current + direction + cases.length) % cases.length);
  }

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft({
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      car: String(data.get('car') || ''),
      budget: String(data.get('budget') || ''),
    });
  }

  const mailBody = draft
    ? encodeURIComponent(`Имя: ${draft.name}\nТелефон: ${draft.phone}\nАвтомобиль: ${draft.car}\nБюджет: ${draft.budget}`)
    : '';

  return (
    <main>
      <section className="hero" id="top">
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="Авто-Конклав — на главную">
            <img src="/images/logo-dark-bg.png" alt="Авто-Конклав" />
          </a>

          <nav className="main-nav" aria-label="Основная навигация">
            <a href="#advantages">Почему мы</a>
            <a href="#route">Как работаем</a>
            <a href="#cases">Кейсы</a>
          </nav>

          <a className="header-cta" href="#request">
            Обсудить автомобиль <span>↗</span>
          </a>
        </header>

        <div className="track track-one" aria-hidden="true" />
        <div className="track track-two" aria-hidden="true" />

        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Автомобили со всего мира · с 1998 года</p>
            <h1>
              Ваш автомобиль.
              <span>Наш точный маршрут.</span>
            </h1>
            <p className="hero-lead">
              Находим, выкупаем и доставляем автомобили и технику из Европы,
              США, Китая, Кореи, Дубая и Японии — с контролем на каждом этапе.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#request">
                Подобрать автомобиль <span>↗</span>
              </a>
              <a className="text-link" href="#cases">Смотреть реальные кейсы <span>↓</span></a>
            </div>

            <div className="trust-row" aria-label="Ключевые показатели">
              <div><strong>27+</strong><span>лет в автобизнесе</span></div>
              <div><strong>1000+</strong><span>доставок с 2022 года</span></div>
              <div><strong>6</strong><span>направлений поставки</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-index">01 / 06</div>
            <div className="red-disc" />
            <img src="/images/hero-car.png" alt="" />
            <div className="route-card">
              <span className="route-pulse" />
              <div>
                <small>Маршрут активен</small>
                <b>Поиск → выкуп → доставка</b>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-footer shell">
          <span>Москва · Верхняя, 20к1</span>
          <span>Ежедневно 09:00—20:00</span>
          <a href="tel:+79031307887">+7 (903) 130-78-87</a>
        </div>
      </section>

      <div className="country-ticker" aria-label="Направления поставки">
        <div>
          <span>Европа</span><i>●</i><span>США</span><i>●</i><span>Китай</span><i>●</i>
          <span>Корея</span><i>●</i><span>Дубай</span><i>●</i><span>Япония</span><i>●</i>
          <span>Европа</span><i>●</i><span>США</span><i>●</i>
        </div>
      </div>

      <section className="section advantages" id="advantages">
        <div className="section-head shell">
          <div className="section-label"><span>01</span> Почему Авто-Конклав</div>
          <div>
            <p className="overline">Не обещаем магию — строим понятный процесс</p>
            <h2>Выгодный автомобиль начинается <em>с правильного доступа.</em></h2>
          </div>
        </div>

        <div className="advantage-grid shell">
          {advantages.map((item) => (
            <article className="advantage-card" key={item.number}>
              <div className="card-top"><span>{item.number}</span><i>↗</i></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="wheel-mark" aria-hidden="true"><b /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section story">
        <div className="story-grid shell">
          <div className="story-media">
            <div className="story-number">02 / О компании</div>
            <div className="portrait-wrap">
              <img src="/images/director-v2.png" alt="Михаил Моженков, управляющий директор" />
              <span className="portrait-outline" aria-hidden="true" />
            </div>
          </div>

          <div className="story-copy">
            <p className="overline">Сделано людьми, одержимыми автомобилями</p>
            <blockquote>«Мы берём на себя сложное, чтобы вам осталось выбрать автомобиль и получить ключи».</blockquote>
            <p>
              С 1998 года команда профессионально занимается поставкой автомобилей,
              мотоциклов, специальной техники, катеров и яхт. Мы сопровождаем сделку
              от первого запроса до передачи документов владельцу.
            </p>
            <div className="signature-line">
              <b>Моженков Михаил Владимирович</b>
              <span>Управляющий директор</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section process" id="route">
        <div className="section-head process-head shell">
          <div className="section-label light"><span>03</span> Маршрут сделки</div>
          <div>
            <p className="overline red">От запроса до ключей</p>
            <h2>Пять этапов. <em>Один ответственный.</em></h2>
          </div>
        </div>

        <div className="process-grid shell">
          <div className="step-list" role="tablist" aria-label="Этапы сделки">
            {routeSteps.map((step, index) => (
              <button
                key={step.number}
                className={index === activeStep ? 'active' : ''}
                type="button"
                role="tab"
                aria-selected={index === activeStep}
                onClick={() => setActiveStep(index)}
              >
                <span>{step.number}</span><b>{step.title}</b><i>↗</i>
              </button>
            ))}
          </div>

          <div className="step-display" role="tabpanel">
            <div className="step-counter">{routeSteps[activeStep].number} / 05</div>
            <p>{routeSteps[activeStep].kicker}</p>
            <h3>{routeSteps[activeStep].title}</h3>
            <div className="step-rule"><span style={{ width: `${((activeStep + 1) / routeSteps.length) * 100}%` }} /></div>
            <p className="step-text">{routeSteps[activeStep].text}</p>
            <button className="next-step" type="button" onClick={() => setActiveStep((activeStep + 1) % routeSteps.length)}>
              Следующий этап <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section cases" id="cases">
        <div className="section-head shell">
          <div className="section-label"><span>04</span> Реальные кейсы</div>
          <div>
            <p className="overline">Автомобили, которые уже прошли наш маршрут</p>
            <h2>Не каталог. <em>Результаты.</em></h2>
          </div>
        </div>

        <div className="case-showcase shell">
          <div className="case-image">
            <img src={currentCase.image} alt={`${currentCase.model}, доставленный автомобиль`} />
            <span className="case-origin">{currentCase.origin}</span>
            <span className="case-index">{String(caseIndex + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}</span>
          </div>

          <div className="case-info" aria-live="polite">
            <p>Под ключ</p>
            <strong>{currentCase.price}</strong>
            <h3>{currentCase.model}</h3>
            <dl>
              <div><dt>Год</dt><dd>{currentCase.year}</dd></div>
              <div><dt>Пробег</dt><dd>{currentCase.mileage}</dd></div>
              <div><dt>Поставка</dt><dd>{currentCase.origin}</dd></div>
            </dl>
            <a href="#request">Хочу похожий вариант <span>↗</span></a>
          </div>
        </div>

        <div className="case-controls shell">
          <div className="case-buttons">
            <button type="button" onClick={() => shiftCase(-1)} aria-label="Предыдущий кейс">←</button>
            <button type="button" onClick={() => shiftCase(1)} aria-label="Следующий кейс">→</button>
          </div>
          <div className="case-dots" aria-label="Выбрать кейс">
            {cases.map((item, index) => (
              <button
                type="button"
                className={index === caseIndex ? 'active' : ''}
                key={item.model}
                onClick={() => setCaseIndex(index)}
                aria-label={`Показать ${item.model}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="request" id="request">
        <div className="request-track" aria-hidden="true" />
        <div className="request-grid shell">
          <div className="request-copy">
            <div className="section-label light"><span>05</span> Начать подбор</div>
            <p className="overline red">Ваш следующий автомобиль уже где-то есть</p>
            <h2>Давайте <em>его найдём.</em></h2>
            <p>Оставьте параметры — мы подготовим первый ориентир по рынкам, бюджету и срокам.</p>
            <div className="request-contacts">
              <a href="tel:+79031307887"><small>Позвонить</small>+7 (903) 130-78-87</a>
              <a href="https://t.me/AutoConclave" target="_blank" rel="noreferrer"><small>Telegram</small>@AutoConclave</a>
            </div>
          </div>

          <form className="request-form" onSubmit={prepareRequest}>
            <label>
              <span>Как вас зовут</span>
              <input name="name" autoComplete="name" placeholder="Имя" required />
            </label>
            <label>
              <span>Телефон</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="+7 999 000-00-00" required />
            </label>
            <label>
              <span>Какой автомобиль ищете</span>
              <input name="car" placeholder="Марка, модель, год" required />
            </label>
            <label>
              <span>Планируемый бюджет</span>
              <select name="budget" defaultValue="">
                <option value="" disabled>Выберите диапазон</option>
                <option>до 5 млн ₽</option>
                <option>5–10 млн ₽</option>
                <option>10–20 млн ₽</option>
                <option>20+ млн ₽</option>
              </select>
            </label>
            <label className="consent">
              <input type="checkbox" required />
              <span>Согласен на обработку данных для связи по заявке</span>
            </label>
            <button className="form-submit" type="submit">Сформировать заявку <span>↗</span></button>

            {draft && (
              <div className="draft-ready" role="status">
                <div><b>Заявка подготовлена</b><span>Отправьте её удобным способом</span></div>
                <a href={`mailto:autoconclave@yandex.ru?subject=${encodeURIComponent('Заявка на подбор автомобиля')}&body=${mailBody}`}>E-mail ↗</a>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer>
        <div className="footer-main shell">
          <img src="/images/logo-dark-bg.png" alt="Авто-Конклав" />
          <nav aria-label="Навигация в подвале">
            <a href="#advantages">Почему мы</a>
            <a href="#route">Как работаем</a>
            <a href="#cases">Кейсы</a>
            <a href="#request">Контакты</a>
          </nav>
          <a className="footer-up" href="#top" aria-label="Наверх">↑</a>
        </div>
        <div className="footer-bottom shell">
          <span>© 2026 Авто-Конклав</span>
          <span>Москва, ул. Верхняя, 20к1 · Ежедневно 09:00—20:00</span>
          <a href="mailto:autoconclave@yandex.ru">autoconclave@yandex.ru</a>
        </div>
      </footer>
    </main>
  );
}
