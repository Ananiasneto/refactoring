import { faker } from "@faker-js/faker";
import { CreateNewsData } from "../../src/repositories/news-repository";
import prisma from "../../src/database";
import { title } from "node:process";

export function generateRandomNews(firstHand = false): CreateNewsData {
  return {
    author: faker.person.fullName(),
    firstHand,
    text: faker.lorem.paragraphs(5),
    publicationDate: faker.date.future(),
    title: faker.lorem.words(7)
  }
}
export function generateRandomNewsWhitTitleSpecific(firstHand = false,title): CreateNewsData {
  return {
    author: faker.person.fullName(),
    firstHand,
    text: faker.lorem.paragraphs(5),
    publicationDate: faker.date.future(),
    title
  }
}

export async function persistNewRandomNews(firstHand = false) {
  return await prisma.news.create({
    data: generateRandomNews(firstHand)
  });
}
export async function persistNewRandomNewsWithTitle(firstHand = false,title) {
  return await prisma.news.create({
    data: generateRandomNewsWhitTitleSpecific(firstHand,title)
  });
}

export async function persistNewRandomNewsInThePast(firstHand = false) {
  const eventData = generateRandomNews(firstHand);
  eventData.publicationDate = faker.date.past();

  return await prisma.news.create({
    data: eventData
  });
}
export function generateRandomNewsWithPublicationDate(firstHand = false, publicationDate: Date): CreateNewsData {
  return {
    author: faker.person.fullName(),
    firstHand,
    text: faker.lorem.paragraphs(5),
    publicationDate,
    title: faker.lorem.words(7)
  };
}

export async function persistNewRandomNewsWithPublicationDate(firstHand = false, publicationDate: Date) {
  const newsData = generateRandomNewsWithPublicationDate(firstHand, publicationDate);
  return await prisma.news.create({
    data: newsData
  });
}