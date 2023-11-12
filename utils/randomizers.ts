export const randomSelect = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export const shuffler = (arr: any[]) => arr.reduce(
  (newArr, _, i) => {
    const rand = i + Math.floor(Math.random() * (newArr.length - i));
    // eslint-disable-next-line no-param-reassign
    [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
    return newArr;
  },
  [...arr],
);

export function getRandomIntInclusive(max: number = 3): number {
  return Math.floor(Math.random() * (max)) - (max - 2);
}

export function createRoomId(): string {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export function getRandomNumber(min: number, max: number):number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
