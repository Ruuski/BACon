const HR_TO_MS = 3600000;
const PERCENT_ALC_PROCESSED_PER_HR = 0.016;

// limit is the bac we want to know the time that we'll be at
calcBacInMs = (bac, limit) => {
  return ((bac-limit)/PERCENT_ALC_PROCESSED_PER_HR)*HR_TO_MS
}

export default calcBacInMs;
