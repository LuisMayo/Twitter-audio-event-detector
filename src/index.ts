import express from 'express';
import getBearerToken from 'get-twitter-bearer-token';
import { readFileSync } from 'fs';
import { Conf } from './conf';
import Twitter from 'twitter';
import wget from 'node-wget-promise';
import child_process from 'child_process';

const config: Conf = JSON.parse(readFileSync('./conf/conf.json', { encoding: 'utf-8' }));
let client: Twitter;

getBearerToken(config.apiKey, config.apiSecret, (err, res) => {
  if (err) {
    // handle error
  } else {
    // bearer token
    client = new Twitter({
      consumer_key: config.apiKey,
      consumer_secret: config.apiSecret,
      bearer_token: res.body.access_token
    });
  }
})

const app = express();

app.get('/tweet/:id', function (req, res) {
  client.get('statuses/show/' + req.params.id, (error, data, response) => {
    if (error) {
      
    } else {
      if (data.extended_entities && data.extended_entities && data.extended_entities.media && data.extended_entities.media.length > 0) {
        const firstMedia = data.extended_entities.media[0];
        if (firstMedia.type === 'video') {
          const url: string = (firstMedia.video_info.variants as any[]).sort((a, b) => a.bitrate - b.bitrate).pop().url;
          const fileNameWithHash = url.substring(url.lastIndexOf('/') + 1);
          const fileName = fileNameWithHash.substring(0, fileNameWithHash.indexOf('?'));
          wget(url).then(value => {
            const result: string = child_process.execFileSync(`python3 ./process.py ./config.py ../${fileName};`, {cwd: 'audio-detect', encoding: 'ascii'});
            if (result.includes('Matches')) {
              const matches = result.substring(result.indexOf('Matches'));
              res.send(/\d/.test(matches));
            } else {
              res.send('false');
            }
            res.send(result != null && result.substring(result.indexOf('Matches')))
          });
        }
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
