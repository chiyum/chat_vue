import dayjs from "dayjs";

interface TimeInfo {
  formattedTime: string;
  timestamp: number;
}

export const getCurrentTime = (): TimeInfo => {
  const now = dayjs();
  return {
    formattedTime: now.format("HH:mm"),
    timestamp: now.valueOf()
  };
};
