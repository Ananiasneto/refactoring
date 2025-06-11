import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type UpdateNewsData = CreateNewsData;

export function getNews(
  page?: number,
  limit?: number,
  order?: "asc" | "desc",
  title?: string
) {
  const take = limit;
  const skip = (page - 1) * take;

 const where = title ? {
  title: {
    contains: title,
    mode: "insensitive" as const,
  }
  } : undefined;


  return prisma.news.findMany({
    skip,
    take,
    orderBy: { publicationDate: order },
    where,
  });
}

export function getNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id }
  })
}
export function getNewsByTitle(title: string) {
  return prisma.news.findFirst({
    where: { title }
  })
}

export async function createNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) }
  });
}

export async function updateNew(id: number, news: UpdateNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...news, publicationDate: new Date(news.publicationDate) }
  })
}

export async function removeNew(id: number) {
  return prisma.news.delete({
    where: { id }
  })
}