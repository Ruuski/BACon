import { HR_TO_MS } from '../constants';

bacFromSoberAt = (soberAtMs) => {
  const curTimeMs = new Date().getTime();
  const soberInMs = soberAtMs - curTimeMs;
  const bac = (soberInMs/HR_TO_MS)*0.016;
  return bac;
}

export default bacFromSoberAt;
