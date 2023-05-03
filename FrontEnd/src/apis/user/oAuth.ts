import { OAUTH_URL } from "../../utils/urls";
import { OAUTH_REDIRECT_URL } from "../../utils/urls";
/**
 *
 * @param target [google, kakao, naver]
 */
export default function goOauth(target: string) {
  console.log(
    `${OAUTH_URL}/${target}?redirect_uri=https://ssafy-star.com/oauth2/token`,
  );
  console.log(`${OAUTH_URL}/${target}?redirect_uri=${OAUTH_REDIRECT_URL}`);
  window.location.replace(
    `${OAUTH_URL}/${target}?redirect_uri=https://ssafy-star.com/oauth2/token`,
  );
}
