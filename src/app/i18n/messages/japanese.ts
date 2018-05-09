import {Messages} from './messages';

const japanese: Messages = {

  account: {
    account: 'アカウント',
    accountDetails: '会員情報',
    myAccount: 'マイアカウント',
    returnToAccountDetails: '注文一覧に戻る',
  },

  auth: {
    alreadyHaveAccount: '既に登録済みですか',
    create: '作成',
    createAccount: 'アカウント作成',
    forgotYourPassword: 'パスワードを忘れた場合',
    invalidLoginCredentials: 'メールアドレスまたはパスワードが違います。',
    loggedInAs: 'こんにちは、',
    logIn: 'ログイン',
    login: 'ログイン',
    logOut: 'ログアウト',
    logout: 'ログアウト',
    passwordResetHint: 'パスワード再設定のメールを送信します。',
    passwordResetSuccess: 'パスワード再設定のメールを送信しました。',
    passwordResetSuccessHint: 'メールに書いてある手順に従って、パスワードを再設定してください。',
    resetPassword: 'パスワードの再設定',
    resetYourPassword: 'パスワードを再設定',
    signIn: 'ログイン',
    signingIn: 'ログイン中...',
    signUp: '新規登録',
  },

  cart: {
    addToCart: 'カートに入れる',
    cart: 'カート',
    loadingCart: 'カートがロード中...',
    shoppingCart: 'ショッピングカート',
    yourCartIsEmpty: 'お客様のショッピングカートに商品はありません。'
  },

  checkout: {
    buyThisProduct: 'この商品を買う',
    checkout: '購入手続き',
    customerInfo: 'お客様情報',
    gettingOrderReady: '注文を準備しています...',
    itWillBeNeededToTrack: '注文状況を確認するために必要です。',
    logInInfinitive: 'ログイン',
    logInToView: '閲覧するにはログイン',
    logInToViewDetails: '詳細を見るにはログインしてください',
    notCustomer: '注文者ではありませんか。',
    orderCheckout: '注文手続き',
    orderUpdates: '注文状況の更新情報',
    pay: '支払う',
    paymentMethod: 'お支払い方法',
    //payWithPaypal: 'PayPalで支払う',
    returnToCart: 'カートに戻る',
    showOrderSummary: '注文詳細を表示',
    toRepeatOrShare: 'シェアまたは再注文するにはこのリンクをクリックしてください:',
    trackYourOrderStatusHere: '注文の状況を確認するには:',
    updatesWillBeSentTo: '注文状況のお知らせはこのメールアドレスに送信されます',
    weVeAcceptedYourOrder: `
      ご注文を承りました。
	  注文状況はいつでもこのページで確認できます。
    `,
    withPayPal: 'PayPalで支払う',
    youAlsoCan: 'ことも可能です',
    youCanFindYourOrderNumber: 'ご注文番号はメールでお送りした詳細に書いてあります。',
    yourOrderIsConfirmed: 'ご注文を受け付けました',
    yourOrderNumberIs: '注文番号は',
    youWillReceiveYourPackage: 'ご注文の商品はおよそ２～４週間で届く予定です。',
  },

  common: {
    cancel: 'キャンセル',
    clickTo: 'このリンクをクリックして',
    continueShopping: '買い物に戻れます。',
    home: 'ホーム',
    misona: 'Misona',
    or: 'または',
    returnToStore: '買い物を続ける',
    send: '送信',
    showMore: 'さらに表示',
    thankYou: 'ありがとうございます,',
    tryAgain: 'もう一度やってみてください',
  },

  delivery: {
    address: '住所',
    city: '市町村',
    country: '国',
    fullName: '受取人のお名前',
    phone: '電話番号',
    postalCode: '郵便番号',
    shippingAddress: '送付先',
  },

  errors: {
    couldNotConnectToServer: 'サーバーに接続できません。',
    errorOccurred: 'エラーが発生しました',
    ifErrorRemains: 'エラーが発生し続ける場合は、',
    internalApplicationError: 'システム内部エラー',
    itemSoldOutOrPageNotExists: `
      お探しの商品は売り切れになっているか、指定されたページは存在しません。
    `,
    pageNotFound: '404 ページが見つかりません',
    sorryWeEncounteredError: 'すみません、予想外のエラーが発生しました。',
    timeout10sExceeded: 'タイムアウト時間10秒が過ぎました。',
  },

  info: {
    blog: 'ブログ',
    blogLink: 'https://yaponskie-katushki.misona.jp/',
    company: '会社情報',
    companyInfo: '会社概要',
    contactUs: 'お問い合わせ',
    confirmYouAreNotRobot: 'あなたがロボットでないことの証明',
    faq: 'よくある質問',
    feedback: 'お問い合わせ',
    help: 'ヘルプ',
    message: 'メッセージ',
    misonaDescription: `
      Misonaは海外から日本の商品を手軽に注文するためのサービスです。すべての表示価格は海外送料込みです。
    `,
    needHelp: '困った時に',
    orWriteUsDirectlyOn: 'あるいは直接書いてください',
    privacyPolicy: 'プライバシーポリシー',
    questionsAndAnswers: 'よくある質問',
    thanksForContactingUs: 'お問い合わせありがとうございます。24時間以内に回答いたします。',
    subject: '題名',
    termsOfService: '利用規約',
    whatIsMisona: 'Misonaとは',
  },

  marketing: {
    directlyFromJapan: '日本から直送',
    fishingGoods: '釣り具',
    freeInternationalDelivery: '海外送料無料',
    freeInternationalShipping: '海外送料込み',
    headerSlogan: '海外から日本商品を簡単に注文。海外送料無料',
  },

  order: {
    date: '日付',
    fulfilled: '完了',
    id: 'ID',
    loadingOrder: '注文詳細をロード中...',
    order: '注文',
    orderHistory: '注文履歴',
    orderNumber: '注文番号',
    orderStatus: '注文状況',
    placed: '受付済み',
    status: '状況',
    total: '合計',
    unfulfilled: '未完了',
    youHaveNotPlacedOrdersYet: `まだご注文がありません。`,
  },

  product: {
    browseByCategories: 'カテゴリーで検索',
    category: 'カテゴリー',
    loadingProduct: '商品ロード中',
    moreCategories: 'さらに表示',
    noProductsWereFound: '検索に一致する商品はありませんでした。',
    price: '価格',
    product: '商品',
    quantity: '数量',
    searchBarPlaceholder: '検索',
    searchingForProducts: '検索中...',
    searchResultsFor: 'このキーワードの検索結果:',
    showTranslatedDescription: '自動翻訳された商品説明を表示',
    tryUpdatingSearchQuery: '検索キーワードを変えてみてください。',
  },

  settings: {
    currency: '通貨',
    language: '言語',
    settings: '設定',
    shipTo: '国',
  },

  validation: {
    addressRule: '英数字、スペース、英語の句読点のみ。',
    digitsOnly: '数字のみ。',
    fullNameRule: '英数字、スペース、ダッシュ、アポストロフィのみ。',
    invalidEmailorOrderNumber: 'メールアドレスまたは注文番号が違います。',
    passwordRule: '英数字、英語の句読点のみ。4文字以上。',
    phoneRule: '数字、ハイフン、スペース、プラス記号、丸括弧のみ。',
    thisEmailAddressIsTaken: `
      このメールアドレスは登録済みです。
	  あたながその持ち主である場合は、
    `,
  },

  user: {
    email: 'メール',
    fullName: 'お名前',
    password: 'パスワード',
  },

};

export default japanese;
