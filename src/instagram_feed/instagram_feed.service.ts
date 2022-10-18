import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramFeedService {
  findOne(id: number) {
    const Instagram = require('instagram-web-api');
    const { username, password } = process.env;

    const client = new Instagram({ username, password });

    client.login().then(() => {
      client.getProfile().then(console.log);
    });
    return `This action returns a #${id} instagramFeed`;
  }
}
