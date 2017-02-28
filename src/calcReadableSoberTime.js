calcReadableSoberTime = (soberInMs) => {
  soberAtMs = new Date().getTime() + soberInMs;
  soberTime = new Date(soberAtMs)
  return dayOfWeekName(soberTime.getDay()) + ' ' + soberTime.toTimeString().slice(0, 8);
}

export default calcReadableSoberTime;
