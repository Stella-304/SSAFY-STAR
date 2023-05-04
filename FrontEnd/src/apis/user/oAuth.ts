import { OAUTH_URL } from "../../utils/urls";
/**
 *
 * @param target [google, kakao, naver]
 */
export default function goOauth(target: string) {
  window.location.replace(
    `${OAUTH_URL}/${target}?redirect_uri=https://ssafy-star.com/oauth2/token`,
  );
}

// http://ssafy-star.com/app/oauth2/authorization/google?redirect_uri=https://ssafy-star.com/oauth2/token
// http://ssafy-star.com/app/oauth2/authorization/google?redirect_uri=http://ssafy-star.com/oauth2/token
