declare module 'get-twitter-bearer-token' {
    export default function (twitter_consumer_key: string, twitter_consumer_secret: string, cb: (error: Error, response: {body: {token_type: 'bearer', access_token: string}}) => void):  {

    }
}