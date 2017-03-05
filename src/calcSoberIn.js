const HR_TO_MS = 3600000;

// limit is the bac we want to know the time that we'll be at
calcSoberIn = (bac, limit) => {
  return ((bac-limit)/0.016)*HR_TO_MS
}

export default calcSoberIn;
