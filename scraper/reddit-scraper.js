const snoowrap = require('snoowrap');

const sw = new snoowrap({
  userAgent: 'script/javascript',
  clientId: 'IS5vnihXIbWw-A',
  clientSecret: 'failwY5mpnI4i1bdxT_MpYBCBbEe',
  username: 'yesspleasee',
  password: 'firetruck321'
});
//sw.getHot().then(console.log);
//cycle through a constant list of subreddits
sw.getSubreddit('Documentaries').getNewComments().then(console.log);
