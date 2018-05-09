import {Messages} from './messages';

const russian: Messages = {

  account: {
    account: 'Аккаунт',
    accountDetails: 'Детали аккаунта',
    myAccount: 'Мой аккаунт',
    returnToAccountDetails: 'Вернуться на страницу аккаунта',
  },

  auth: {
    alreadyHaveAccount: 'Уже есть аккаунт?',
    create: 'Зарегистрироваться',
    createAccount: 'Создать аккаунт',
    forgotYourPassword: 'Забыли пароль?',
    invalidLoginCredentials: 'Неправильный email или пароль.',
    loggedInAs: 'Вы зашли как',
    logIn: 'Зайти',
    login: 'Вход',
    logOut: 'Выйти',
    logout: 'Выход',
    passwordResetHint: 'Мы отправим вам на email инструкции для восстановления пароля.',
    passwordResetSuccess: 'Инструкции для восстановления пароля отправлено.',
    passwordResetSuccessHint: 'Следуйте подсказкам в электронном письме, чтобы восстановить пароль.',
    resetPassword: 'Восстановление пароля',
    resetYourPassword: 'восстановить ваш пароль',
    signIn: 'Зайти',
    signingIn: 'Авторизация...',
    signUp: 'Зарегистрироваться',
  },

  cart: {
    addToCart: 'Добавить в Корзину',
    cart: 'Корзина',
    loadingCart: 'Корзина загружается...',
    shoppingCart: 'Корзина',
    yourCartIsEmpty: 'Ваша корзина сейчас пустая.',
  },

  checkout: {
    buyThisProduct: 'купить этот товар',
    checkout: 'Заказать',
    customerInfo: 'Данные заказчика',
    gettingOrderReady: 'Подготовка заказа...',
    itWillBeNeededToTrack: 'Он будет необходим для отслеживания статуса вашего заказа.',
    logInInfinitive: 'Зайти',
    logInToView: 'Зайдите, чтобы просмотреть',
    logInToViewDetails: 'Зайдите, чтобы просмотреть все детали',
    notCustomer: 'Покупали не вы?',
    orderCheckout: 'Оформление заказа',
    orderUpdates: 'Обновление заказа',
    pay: 'Оплатить',
    paymentMethod: 'Способ оплаты',
    //payWithPaypal: 'Заплатить через PayPal',
    returnToCart: 'Вернуться в Корзину',
    showOrderSummary: 'Показать детали заказа',
    toRepeatOrShare: 'Чтобы повторить или поделиться заказом, перейдите по ссылке:',
    trackYourOrderStatusHere: 'Следите за статусом вашего заказа тут:',
    updatesWillBeSentTo: 'Обновления будут приходить на',
    weVeAcceptedYourOrder: `
      Мы получили Ваш заказ и уже готовим его.
      Вернитесь на эту страницу позже, чтобы следить за обновлением статуса заказа.
    `,
    withPayPal: 'через PayPal',
    youAlsoCan: 'Вы также можете',
    youCanFindYourOrderNumber: 'Вы найдете номер вашего заказа в электронном письме, которое мы вам отправили.',
    yourOrderIsConfirmed: 'Ваш заказ подтвержден',
    yourOrderNumberIs: 'Ваш номер заказа:',
    youWillReceiveYourPackage: 'Вы получите посылку примерно через 2-4 недели.',
  },

  common: {
    cancel: 'Отменить',
    clickTo: 'Нажмите, чтобы',
    continueShopping: 'Продолжить покупки',
    home: 'Главная',
    misona: 'Misona',
    or: 'или',
    returnToStore: 'Вернуться в Магазин',
    send: 'Отправить',
    showMore: 'Показать ещё',
    thankYou: 'Спасибо,',
    tryAgain: 'попробовать ещё раз',
  },

  delivery: {
    address: 'Адрес',
    city: 'Город',
    country: 'Страна',
    fullName: `Фамилия и имя получателя`,
    phone: 'Телефон',
    postalCode: 'Почтовый индекс',
    shippingAddress: 'Адрес доставки',
  },

  errors: {
    couldNotConnectToServer: `Не удалось соединиться с сервером.`,
    errorOccurred: 'Ошибка',
    ifErrorRemains: 'Если ошибка не исчезнет,',
    internalApplicationError: 'Внутренний сбой в системе.',
    itemSoldOutOrPageNotExists: `
      Товар, который вы ищите, уже распродался, или запрашиваемая страница не существует.
    `,
    pageNotFound: '404 Страницу не найдено',
    sorryWeEncounteredError: 'Случилась системная ошибка:',
    timeout10sExceeded: 'Время ожидания 10 секунд истекло.',
  },

  info: {
    blog: 'Блог',
    blogLink: 'https://yaponskie-katushki.misona.jp/',
    company: 'Компания',
    companyInfo: 'О компании',
    confirmYouAreNotRobot: 'Пожалуйста, подтвердите, что вы не робот.',
    contactUs: 'Напишите нам',
    faq: 'Частые вопросы',
    feedback: 'Напишите нам',
    help: 'Помощь',
    message: 'Сообщение',
    misonaDescription: `
      Misona – это магазин, где вы можете купить японские рыболовные товары с бесплатной международной доставкой.
    `,
    needHelp: 'Нужна помощь?',
    orWriteUsDirectlyOn: 'или напишите нам непосредственно на',
    privacyPolicy: 'Конфиденциальность',
    questionsAndAnswers: 'Вопросы и ответы',
    thanksForContactingUs: 'Спасибо за сообщение. Мы вам ответим в течение 24 часов.',
    subject: 'Тема',
    termsOfService: 'Правила сервиса',
    whatIsMisona: 'Что такое Misona?',
  },

  marketing: {
    directlyFromJapan: 'Прямо из Японии',
    fishingGoods: 'Рыболовные товары',
    freeInternationalDelivery: 'Бесплатная международная доставка',
    freeInternationalShipping: 'Цена с доставкой',
    headerSlogan: 'Японские рыболовные товары с бесплатной международной доставкой',
  },

  order: {
    date: 'Дата',
    fulfilled: 'Выполнено',
    id: 'ID',
    loadingOrder: 'Загрузка заказа...',
    order: 'Заказ',
    orderHistory: 'История заказов',
    orderNumber: 'Номер заказа',
    orderStatus: 'Статус заказа',
    placed: 'Заказано',
    status: 'Статус',
    total: 'Итого',
    unfulfilled: 'Не выполнено',
    youHaveNotPlacedOrdersYet: `Вы ещё не делали заказов.`,
  },

  product: {
    browseByCategories: 'найдите товары по категориям',
    category: 'Категория',
    loadingProduct: 'Загрузка товара',
    moreCategories: 'Больше категорий',
    noProductsWereFound: 'По вашему поисковому запросу ничего не найдено.',
    price: 'Цена',
    product: 'Товар',
    quantity: 'К-во',
    searchBarPlaceholder: 'Поиск',
    searchingForProducts: 'Поиск товаров...',
    searchResultsFor: 'Результаты поиска для:',
    showTranslatedDescription: 'Показать машинный перевод описания',
    tryUpdatingSearchQuery: 'Попробуйте обновить ваш поисковый запрос',
  },

  settings: {
    currency: 'Валюта',
    language: 'Язык',
    settings: 'Настройки',
    shipTo: 'Страна',
  },

  validation: {
    addressRule: 'Только латинские буквы, цифры, пробелы и знаки пунктуации.',
    digitsOnly: 'Только цифры.',
    fullNameRule: 'Только латинские буквы, пробелы, дефисы, апострофы.',
    invalidEmailorOrderNumber: 'Неправильный email или номер заказа.',
    passwordRule: 'Только латинские буквы, цифры, знаки пунктуации; не меньше 4 символов.',
    phoneRule: 'Только цифры, дефисы, пробелы, плюсы, скобки.',
    thisEmailAddressIsTaken: `
      Данный электронный адрес уже используется.
      Если вы владелец этого адреса, вы можете
    `,
  },

  user: {
    email: 'Email',
    fullName: 'Имя',
    password: 'Пароль',
  },

};

export default russian;
