import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "./../services/news-service";

import { UpdateNewsData, CreateNewsData } from "../repositories/news-repository";

function validateId(id){
  if (isNaN(id) || id <= 0) {
    return false;
  }else{
    return true;
  }
}

export async function getNews(req: Request, res: Response) {
 const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const order = (req.query.order as string)?.toLowerCase();
  const title = req.query.title as string;

  const news = await service.getNews(
    isNaN(page) ? undefined : page,
    isNaN(limit) ? undefined : limit,
    order,
    title
  );

  return res.send(news);
    
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const isvalid=validateId(id);
  if (!isvalid) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const news = await service.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function updateNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
 const isvalid=validateId(id);
  if (!isvalid) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const newsData = req.body as UpdateNewsData;
  const alteredNews = await service.updateNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const isvalid=validateId(id);
  if (!isvalid) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}