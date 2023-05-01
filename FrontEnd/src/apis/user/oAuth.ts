import { OAUTH_URL } from "../../utils/urls";

/**
 *
 * @param target [google, kakao, naver]
 */
export default function goOauth(target: string) {
  window.open(
    `${OAUTH_URL}/${target}?redirect_uri=https://k8b304.p.ssafy.io/oauth2/token`
  );
}
