import axios from 'axios';
import parser from './parser';
import update from './update';

export default (url, watchedState, state) => (axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((r) => {
    const id = state.feeds.length + 1;
    const { feed, posts } = parser(r);
    feed.id = id;
    feed.url = url;

    const feedPosts = posts.map((post, index) => {
      post.id = index;
      post.feedID = feed.id;
      return post;
    });
    watchedState.status = 'success';
    watchedState.feeds.push(feed);
    watchedState.posts.push(...feedPosts);
    update(state, watchedState);
  }).catch((e) => {
    watchedState.error = e.name;
    watchedState.status = 'awaiting';
  }));
