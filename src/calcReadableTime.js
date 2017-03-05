calcReadableTime = (timeMs) => {
  time = new Date(timeMs)
  return time.toTimeString().slice(0, 8);
}

export default calcReadableTime;
