import { OAUTH_URL } from "../../utils/urls";

/**
 *
 * @param target [google, kakao, naver]
 */
export default function goOauth(target: string) {
  window.open(`${OAUTH_URL}/${target}`);
}
