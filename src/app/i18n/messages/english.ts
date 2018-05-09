import {Messages} from './messages';

const english: Messages = {

  account: {
    account: 'Account',
    accountDetails: 'Account Details',
    myAccount: 'My Account',
    returnToAccountDetails: 'Return to Account Details',
  },

  auth: {
    alreadyHaveAccount: 'Already have an account?',
    create: 'Create',
    createAccount: 'Create Account',
    forgotYourPassword: 'Forgot your password?',
    invalidLoginCredentials: 'Invalid login credentials.',
    loggedInAs: 'Logged in as',
    logIn: 'Log in',
    login: 'Login',
    logOut: 'Log out',
    logout: 'Logout',
    passwordResetHint: 'We will send you an email with password reset instructions.',
    passwordResetSuccess: 'We have sent you the email with password reset instructions.',
    passwordResetSuccessHint: 'Please follow the instructions in the email to reset your password.',
    resetPassword: 'Reset Password',
    resetYourPassword: 'reset your password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    signUp: 'Sign Up',
  },

  cart: {
    addToCart: 'Add to Cart',
    cart: 'Cart',
    loadingCart: 'Loading cart...',
    shoppingCart: 'Shopping Cart',
    yourCartIsEmpty: 'Your shopping cart is currently empty.'
  },

  checkout: {
    buyThisProduct: 'buy this product',
    checkout: 'Checkout',
    customerInfo: 'Customer Information',
    gettingOrderReady: 'Getting your order ready...',
    itWillBeNeededToTrack: 'It will be needed to track your order status.',
    logInInfinitive: 'Log in',
    logInToView: 'Log in to view',
    logInToViewDetails: 'Log in to view more details',
    notCustomer: 'Not a customer?',
    orderCheckout: 'Order Checkout',
    orderUpdates: 'Order updates',
    pay: 'Pay',
    paymentMethod: 'Payment method',
    //payWithPaypal: 'Pay with PayPal',
    returnToCart: 'Return to Cart',
    showOrderSummary: 'Show order summary',
    toRepeatOrShare: 'To repeat or share the order, visit this link:',
    trackYourOrderStatusHere: 'Track your order status here:',
    updatesWillBeSentTo: 'Updates will be sent to',
    weVeAcceptedYourOrder: `
      We've accepted your order, and we're getting it ready.
      Come back to this page for updates on your order status.
    `,
    withPayPal: 'with PayPal',
    youAlsoCan: 'You also can',
    youCanFindYourOrderNumber: 'You can find your order number in the receipt you received via email.',
    yourOrderIsConfirmed: 'Your order is confirmed',
    yourOrderNumberIs: 'Your order number is:',
    youWillReceiveYourPackage: 'You will receive your package in about 2-4 weeks.',
  },

  common: {
    cancel: 'Cancel',
    clickTo: 'Click to',
    continueShopping: 'Continue shopping',
    home: 'Home',
    misona: 'Misona',
    or: 'or',
    returnToStore: 'Return to Store',
    send: 'Send',
    showMore: 'Show more',
    thankYou: 'Thank you,',
    tryAgain: 'try again',
  },

  delivery: {
    address: 'Address',
    city: 'City',
    country: 'Country',
    fullName: `Recipient's full name`,
    phone: 'Phone',
    postalCode: 'Postal code',
    shippingAddress: 'Shipping address',
  },

  errors: {
    couldNotConnectToServer: `Couldn't connect to server.`,
    errorOccurred: 'Error occurred',
    ifErrorRemains: 'If the error remains,',
    internalApplicationError: 'Internal application error.',
    itemSoldOutOrPageNotExists: `
      The item you are looking for is sold out or the page you requested does not exist.
    `,
    pageNotFound: '404 Page Not Found',
    sorryWeEncounteredError: 'Sorry, we\'ve encountered an unexpected error:',
    timeout10sExceeded: 'Timeout 10s exceeded.',
  },

  info: {
    blog: 'Blog',
    blogLink: 'https://yaponskie-katushki.misona.jp/',
    company: 'Company',
    companyInfo: 'Company Info',
    contactUs: 'Contact us',
    confirmYouAreNotRobot: 'Please confirm that you are not a robot.',
    faq: 'FAQ',
    feedback: 'Contact Us',
    help: 'Help',
    message: 'Message',
    misonaDescription: `
      Misona is a marketplace where you can buy Japanese fishing goods
      with free worldwide delivery.
    `,
    needHelp: 'Need help?',
    orWriteUsDirectlyOn: 'or write to us directly on',
    privacyPolicy: 'Privacy Policy',
    questionsAndAnswers: 'Questions and Answers',
    thanksForContactingUs: 'Thanks for contacting us. We\'ll get back to you within 24 hours.',
    subject: 'Subject',
    termsOfService: 'Terms of Service',
    whatIsMisona: 'What is Misona?',
  },

  marketing: {
    directlyFromJapan: 'Directly from Japan',
    fishingGoods: 'Fishing goods',
    freeInternationalDelivery: 'Free worldwide delivery',
    freeInternationalShipping: 'Worldwide shipping included',
    headerSlogan: 'Japanese fishing goods with free worldwide delivery',
  },

  order: {
    date: 'Date',
    fulfilled: 'Fulfilled',
    id: 'ID',
    loadingOrder: 'Loading order...',
    order: 'Order',
    orderHistory: 'Order History',
    orderNumber: 'Order Number',
    orderStatus: 'Order Status',
    placed: 'Placed',
    status: 'Status',
    total: 'Total',
    unfulfilled: 'Unfulfilled',
    youHaveNotPlacedOrdersYet: `You haven't placed any orders yet.`,
  },

  product: {
    browseByCategories: 'browse items by categories',
    category: 'Category',
    loadingProduct: 'Loading product',
    moreCategories: 'More categories',
    noProductsWereFound: 'No items were found.',
    price: 'Price',
    product: 'Product',
    quantity: 'Qty',
    searchBarPlaceholder: 'Search',
    searchingForProducts: 'Searching for products...',
    searchResultsFor: 'Search results for:',
    showTranslatedDescription: 'Show machine translated description',
    tryUpdatingSearchQuery: 'Try updating your search query',
  },

  settings: {
    currency: 'Currency',
    language: 'Language',
    settings: 'Settings',
    shipTo: 'Ship to',
  },

  validation: {
    addressRule: 'Only English letters, digits, spaces, punctuation.',
    digitsOnly: 'Only digits.',
    fullNameRule: 'Only English letters, spaces, dashes, apostrophes.',
    invalidEmailorOrderNumber: 'Invalid email or order number',
    passwordRule: 'Only English letters, digits, punctuation characters; minimum 4 symbols.',
    phoneRule: 'Only digits, hyphens, spaces, plus signs, parenthesis.',
    thisEmailAddressIsTaken: `
      This email address has already been registered.
      If you are an owner of the email, you can
    `,
  },

  user: {
    email: 'Email',
    fullName: 'Name',
    password: 'Password',
  },

};

export default english;
