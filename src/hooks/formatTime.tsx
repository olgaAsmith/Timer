function formatTime({
  minutes,
  seconds,
}: {
  minutes: number;
  seconds: number;
}): string {
  const formattedMinutes = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const formattedSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default formatTime;
