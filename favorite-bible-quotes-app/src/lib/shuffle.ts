import { Celebrities, type CelebrityData } from './types';

function HandleCelebrityData(data: CelebrityData): Celebrities[] {
if (Array.isArray(data)) {
    return data;
} else {
return data.rows;
}
}

export function FisherYatesShuffleArray(data: CelebrityData): Celebrities[] {
    data = HandleCelebrityData(data);
    for (let i = data.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}

export function KnuthShuffleArray(data: CelebrityData): Celebrities[] {
    data = HandleCelebrityData(data);
    for (let i = 0; i < data.length; i++) {
    let j = i + Math.floor(Math.random() * (data.length - i));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}
