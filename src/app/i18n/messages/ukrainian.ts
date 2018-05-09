import {Messages} from './messages';

const ukrainian: Messages = {

  account: {
    account: 'Акаунт',
    accountDetails: 'Деталі акаунту',
    myAccount: 'Мій акаунт',
    returnToAccountDetails: 'Повернутися на сторінку акаунту',
  },

  auth: {
    alreadyHaveAccount: 'Вже маєте акаунт?',
    create: 'Зареєструватись',
    createAccount: 'Створити акаунт',
    forgotYourPassword: 'Забули пароль?',
    invalidLoginCredentials: 'Неправильний email чи пароль.',
    loggedInAs: 'Ви увійшли як',
    logIn: 'Увійдіть',
    login: 'Вхід',
    logOut: 'Вийти',
    logout: 'Вихід',
    passwordResetHint: 'Ми надішлемо вам на email інструкції для відновлення паролю.',
    passwordResetSuccess: 'Інструкції для відновлення паролю надіслано.',
    passwordResetSuccessHint: 'Слідуйте підказкам в електронному листі, щоб відновити пароль.',
    resetPassword: 'Відновлення паролю',
    resetYourPassword: 'відновити ваш пароль',
    signIn: 'Увійти',
    signingIn: 'Авторизація...',
    signUp: 'Зареєструватись',
  },

  cart: {
    addToCart: 'Додати в Кошик',
    cart: 'Кошик',
    loadingCart: 'Кошик завантажується...',
    shoppingCart: 'Кошик',
    yourCartIsEmpty: 'Ваш кошик наразі порожній.',
  },

  checkout: {
    buyThisProduct: 'придбати цей товар',
    checkout: 'Замовити',
    customerInfo: 'Дані замовника',
    gettingOrderReady: 'Підготовка замовлення...',
    itWillBeNeededToTrack: 'Він буде потрібен для слідкування за статусом замовлення.',
    logInInfinitive: 'Увійти',
    logInToView: 'Увійдіть, щоб переглянути',
    logInToViewDetails: 'Увійдіть, щоб переглянути всі деталі',
    notCustomer: 'Купували не ви?',
    orderCheckout: 'Оформлення замовлення',
    orderUpdates: 'Оновлення замовлення',
    pay: 'Сплатити',
    paymentMethod: 'Спосіб оплати',
    //payWithPaypal: 'Сплатити через PayPal',
    returnToCart: 'Повернутися у Кошик',
    showOrderSummary: 'Показати деталі замовлення',
    toRepeatOrShare: 'Щоб повторити або поділитися замовленням, перейдіть за посиланням:',
    trackYourOrderStatusHere: 'Слідкуйте за статусом вашого замовлення тут:',
    updatesWillBeSentTo: 'Оновлення надходитимуть на',
    weVeAcceptedYourOrder: `
      Ми отримали Ваше замовлення і вже готуємо його.
      Поверніться на цю сторінку пізніше, щоб слідкувати за оновленням статусу замовлення.
    `,
    withPayPal: 'через PayPal',
    youAlsoCan: 'Ви також можете',
    youCanFindYourOrderNumber: 'Ви знайдете номер вашого замовлення в електронному листі, який ми надіслали.',
    yourOrderIsConfirmed: 'Ваше замовлення підтверджено',
    yourOrderNumberIs: 'Ваш номер замовлення:',
    youWillReceiveYourPackage: 'Ви отримаєте посилку приблизно через 2-4 тижні.',
  },

  common: {
    cancel: 'Скасувати',
    clickTo: 'Натисніть, щоб',
    continueShopping: 'Продовжити покупки',
    home: 'Головна',
    misona: 'Misona',
    or: 'або',
    returnToStore: 'Повернутися у Магазин',
    send: 'Надіслати',
    showMore: 'Показати ще',
    thankYou: 'Дякуємо,',
    tryAgain: 'спробувати знову',
  },

  delivery: {
    address: 'Адреса',
    city: 'Місто',
    country: 'Країна',
    fullName: `Прізвище та ім'я одержувача`,
    phone: 'Телефон',
    postalCode: 'Поштовий індекс',
    shippingAddress: 'Адреса доставки',
  },

  errors: {
    couldNotConnectToServer: `Не вдалося з'єднатися із сервером.`,
    errorOccurred: 'Помилка',
    ifErrorRemains: 'Якщо помилка не зникне,',
    internalApplicationError: 'Внутрішній збій у системі.',
    itemSoldOutOrPageNotExists: `
      Товар, який ви шукаєте, вже розпродано, або запитаної вами сторінки не існує.
    `,
    pageNotFound: '404 Сторінку не знайдено',
    sorryWeEncounteredError: 'Сталася системна помилка:',
    timeout10sExceeded: 'Час очікування 10 секунд минув.',
  },

  info: {
    blog: 'Блог',
    blogLink: 'https://yaponskie-katushki.misona.jp/',
    company: 'Компанія',
    companyInfo: 'Про компанію',
    confirmYouAreNotRobot: 'Будь ласка, підтвердіть, що ви не робот.',
    contactUs: 'Напишіть нам',
    faq: 'Часті питання',
    feedback: 'Напишіть нам',
    help: 'Допомога',
    message: 'Повідомлення',
    misonaDescription: `
      Misona – це магазин, де ви можете придбати японські риболовні товари 
      з безкоштовною міжнародною доставкою.
    `,
    needHelp: 'Потрібна допомога?',
    orWriteUsDirectlyOn: 'або пишіть нам безпосередньо на',
    privacyPolicy: 'Конфіденційність',
    questionsAndAnswers: 'Запитання та відповіді',
    thanksForContactingUs: 'Дякуємо за звернення. Ми відповімо вам протягом 24 годин.',
    subject: 'Тема',
    termsOfService: 'Правила сервісу',
    whatIsMisona: 'Що таке Misona?',
  },

  marketing: {
    directlyFromJapan: 'Напряму з Японії',
    fishingGoods: 'Риболовні товари',
    freeInternationalDelivery: 'Безкоштовна міжнародна доставка',
    freeInternationalShipping: 'Ціна з доставкою',
    headerSlogan: 'Японські риболовні товари з безкоштовною міжнародною доставкою',
  },

  order: {
    date: 'Дата',
    fulfilled: 'Виконано',
    id: 'ID',
    loadingOrder: 'Завантаження замовлення...',
    order: 'Зам.',
    orderHistory: 'Історія замовлень',
    orderNumber: 'Номер замовлення',
    orderStatus: 'Статус замовлення',
    placed: 'Замовлено',
    status: 'Статус',
    total: 'Всього',
    unfulfilled: 'Не виконано',
    youHaveNotPlacedOrdersYet: `Ви ще не робили замовлень.`,
  },

  product: {
    browseByCategories: 'знайдіть товари за категоріями',
    category: 'Категорія',
    loadingProduct: 'Завантаження товару',
    moreCategories: 'Більше категорій',
    noProductsWereFound: 'За вашим пошуковим запитом товарів не знайдено.',
    price: 'Ціна',
    product: 'Товар',
    quantity: 'К-ть',
    searchBarPlaceholder: 'Пошук',
    searchingForProducts: 'Пошук товарів...',
    searchResultsFor: 'Результати пошуку для:',
    showTranslatedDescription: 'Показати машинний переклад опису',
    tryUpdatingSearchQuery: 'Спробуйте оновити ваш пошуковий запит',
  },

  settings: {
    currency: 'Валюта',
    language: 'Мова',
    settings: 'Налаштування',
    shipTo: 'Країна',
  },

  validation: {
    addressRule: 'Лише латинські літери, цифри, пробіли, знаки пунктуації.',
    digitsOnly: 'Лише цифри.',
    fullNameRule: 'Лише латинські літери, пробіли, дефіси, апострофи.',
    invalidEmailorOrderNumber: 'Неправильний email або номер замовлення.',
    passwordRule: 'Лише латинські літери, цифри, знаки пунктуації; принаймні 4 символи.',
    phoneRule: 'Лише цифри, дефіси, пробіли, плюси, дужки.',
    thisEmailAddressIsTaken: `
      Дана електронна адреса вже використовується.
      Якщо ви є власником цієї адреси, ви можете
    `,
  },

  user: {
    email: 'Email',
    fullName: `Ім'я`,
    password: 'Пароль',
  },

};

export default ukrainian;
