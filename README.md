# FCC Image Search Abstraction Layer Microservice

Get image URLs, image tags and page urls for a set of images relating to a given search string.
Images are retrieved using the Pixabay API.
Paginate through the responses by adding a ?offset=2 parameter to the URL.
Get a list of the most recently submitted search strings.

### Prerequisites

Node.js 8.10+

### Installing

Requires a Pixabay API Key set as an environment variable.
MongoDB databases called `fcc-image-search` and `test-fcc-image-search`.

```
yarn install

npm start
```

### Testing

`yarn test`

Local Demo: `localhost:8000`

Live Demo: https://fcc-image-search-abstraction-layer-microservice-jp.glitch.me/


## Example Usage: Search for Images

https://fcc-image-search-abstraction-layer-microservice-jp.glitch.me/api/imagesearch/spiral

## Example Output:
```
[
  {
    imageURL: "https://pixabay.com/get/eb3db70e29f4063ecd0b4d01ee44449ee76ae3d01bb3184694f0c17d.jpg",
    tags: "fantasy, light, mood",
    previewURL: "https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_150.jpg",
    pageURL: "https://pixabay.com/en/fantasy-light-mood-sky-beautiful-2861107/"
  },
  {
    imageURL: "https://pixabay.com/get/ea37b9062af3023ecd0b4d01ee44449ee76ae3d01bb3184694f0c17d.jpg",
    tags: "rainbow, color, motley",
    previewURL: "https://cdn.pixabay.com/photo/2018/04/04/09/24/rainbow-3289273_150.jpg",
    pageURL: "https://pixabay.com/en/rainbow-color-motley-bright-3289273/"
  },
  {
    imageURL: "https://pixabay.com/get/ea37b90d28f0053ecd0b4d01ee44449ee76ae3d01bb3184694f0c17d.jpg",
    tags: "rope, lot of, marine",
    previewURL: "https://cdn.pixabay.com/photo/2018/04/01/20/28/rope-3282044_150.jpg",
    pageURL: "https://pixabay.com/en/rope-lot-of-marine-closeup-3282044/"
  },
...
]
```

## Example Usage: Search for Images with offset

https://fcc-image-search-abstraction-layer-microservice-jp.glitch.me/api/imagesearch/spiral?offset=25

## Example Usage: 10 Recent Searches

https://fcc-image-search-abstraction-layer-microservice-jp.glitch.me/api/imagesearch/

## Example Output:

```
[
  {
    term: "music",
    when: "2018-04-05T19:24:10.051Z"
  },
  {
    term: "chopper",
    when: "2018-04-05T19:24:01.564Z"
  },
  {
    term: "life",
    when: "2018-04-05T19:23:54.789Z"
  },
  {
    term: "cows",
    when: "2018-04-05T19:23:46.036Z"
  },
  {
    term: "computers",
    when: "2018-04-05T19:22:56.578Z"
  },
...
]
```
