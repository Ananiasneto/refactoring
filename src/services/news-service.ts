
import * as newsRepository from "../repositories/news-repository";
import { UpdateNewsData, CreateNewsData } from "../repositories/news-repository";

export async function getNews( page?: number,
  limit?: number,
  order?: string,
  title?: string) {
  const defaultPage = 1;
  const defaultLimit = 10;

  const validatedPage = page && page > 0 ? page : defaultPage;
  const validatedLimit = limit && limit > 0 ? limit : defaultLimit;
  const validatedOrder = order === "asc" ? "asc" : "desc";

  return newsRepository.getNews(validatedPage, validatedLimit, validatedOrder, title);
}


export async function getSpecificNews(id: number) {
  const newsExist = await newsRepository.getNewsById(id);
  if (!newsExist) {
    throw {
      name: "NotFound",
      message: `News with id ${id} not found.`
    }
  }

  return newsExist;
}

export async function createNews(newsData: CreateNewsData) {
  await validate(newsData);
  return newsRepository.createNews(newsData);
}

export async function updateNews(id: number, newsData: UpdateNewsData) {
  const newsExist = await getSpecificNews(id);
  const checkTitleNotExist= newsExist.title !== newsData.title;
  await validate(newsData,checkTitleNotExist);

  return newsRepository.updateNew(id, newsData);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.removeNew(id);
}

async function validate(newsData: CreateNewsData, checkTitleNotExist = true) {

  if (checkTitleNotExist) {
    await validateIfTitleNotExist(newsData.title);
  }

   await validateLengthText(newsData.text);
  
   await validatePublicationDate(newsData.publicationDate)
  

  async function validateIfTitleNotExist(title: string) {
 const newsWithThisTitleExist = await newsRepository.getNewsByTitle(title);


  if (newsWithThisTitleExist) {
    throw {
      name: "Conflict",
      message: `News with title "${title}" already exists.`,
    };
  }
}
function validateLengthText(text: string) {
  const lengthMax=500;
  if (text.length < lengthMax) {
    throw {
      name: "BadRequest",
      message: `The news text must be at least ${lengthMax} characters long`,
    };
  }
}
function validatePublicationDate(date: Date) {
  const publicationDate = new Date(date);
  const now = new Date();
  const isPast=publicationDate.getTime() < now.getTime();
  if (isPast) {
    throw {
      name: "BadRequest",
      message: "The publication date cannot be in the past.",
    };
  }
}
}