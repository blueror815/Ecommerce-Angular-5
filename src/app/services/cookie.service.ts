/**
 * Cookie service.
 * Syntactic layer for work with cookies.
 */
export class CookieService {
  /**
   * Gets cookie value for given key
   * @param {string} key cookie key
   * @return {any}
   */
  public static getCookie(key: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const cookieTrimmed = cookie.trim();
      const regexp = new RegExp(`^${key}=`);
      if (regexp.test(cookieTrimmed)) {
        return cookieTrimmed.split(`${key}=`)[1];
      }
    }
    return null;
  }

  /**
   * Changes a value cookie of given key.
   * @param {string} key cookie key
   * @param {string} value new cookie value
   */
  public static changeCookie(key: string, value: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    const expiryDate = new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value};Path=/;Expires=${expiryDate.toUTCString()}`;
  }
}
