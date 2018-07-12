/*
see https://developer.github.com/v3/issues/#list-issues
url = URL TO GITHUB
page >= 1 || undefined
WARNING: ONLY WORKS WHEN LABEL "ENHANCEMENT" IS SET ON GITHUB ISSUES
*/
async function getFeatureRequestsFromGithub(url, page) {
  //input example url
  //https://github.com/adam-golab/react-developer-roadmap
  const gitRepo = url.replace("https://github.com", "");
  if (!page) {
    page = 1;
  }
  const urlToOpenFeatureRequests = `https://api.github.com/repos${gitRepo}/issues?state=open&labels=bug&page=${page}`;
  let result = await fetch(urlToOpenFeatureRequests);
  result = result.json();
  return Promise.resolve(result);
}

export async function getFeatureRequestCount(url) {
  let count = 0;
  let index = 1;

  let features = [];
  let started = false;
  console.log("hello");
  while (features.length === 30 || !started) {
    console.log("running");
    started = true;
    features = await getFeatureRequestsFromGithub(url, index);
    console.log(features);
    count += features.length;
    index++;
  }

  return Promise.resolve(count);
}
