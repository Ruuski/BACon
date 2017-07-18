import { PERCENT_ALC_PROCESSED_PER_HR, HR_TO_MS } from '../constants';

// returns time until a certian BAC in ms
// limit is the bac we want the time that we'll be at. eg for sober set 0
timeTillBac = (bac, limit) => {
  return ((bac-limit)/PERCENT_ALC_PROCESSED_PER_HR)*HR_TO_MS
}

export default timeTillBac;
