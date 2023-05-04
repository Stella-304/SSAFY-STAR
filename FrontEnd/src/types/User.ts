export interface User {
  name: string;
  cardId: number;
  x: number;
  y: number;
  z: number;
  generation: number;
  campus: string;
  ban: number;
  githubId: string | null;
  bojId: string | null;
  bojTier: string | null;
  blogAddr: string | null;
  company: string | null;
  track: string;
  email: string | null;
  nickname: string;
  major: string;
  role: string;
  algoTest: string;
  authorized: boolean;
  prize: string;
  mine: boolean;
  etc: string;
  companyIsAuthorized: boolean;
  swTier: string;
  content: string;
}
