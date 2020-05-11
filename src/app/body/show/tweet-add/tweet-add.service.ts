import {Injectable} from '@angular/core';
import {HttpUtilService} from "../../../framework/service/http-util.service";

@Injectable()
export class TweetAddService {
  private url_add = '/tweet/addTweet';
  private url_add_tag = '/tag/add';
  private url_tag_map = '/tag/addMap';

  constructor(private http: HttpUtilService) {
  }

  addTweet(userId, text) {
    return this.http.post(this.url_add,
      {
        userId, text
      });
  }

  addMap(href, tags) {
    let type = '0';
    return this.http.post(this.url_tag_map, {href, tags, type});
  }

  addTag(name) {
    let type = '0';
    return this.http.post(this.url_add_tag, {name, type});
  }

}
