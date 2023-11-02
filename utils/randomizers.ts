export const randomSelect = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const shuffler = (arr: any[]) =>
  arr.reduce(
    (newArr, _, i) => {
      var rand = i + Math.floor(Math.random() * (newArr.length - i));
      [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
      return newArr;
    },
    [...arr]
  );

export function getRandomIntInclusive(max: number = 3): number {
    return Math.floor(Math.random() * (max)) - (max - 2);
}