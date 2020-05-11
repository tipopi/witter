import {Tag} from "./tag";

export interface Blog {
  blogId: number,
  title: string,
  contentId: number,
  description?: string,
  content?: string,
  browse: number,
  creatTime: Date,
  tags?: Tag[]
}
