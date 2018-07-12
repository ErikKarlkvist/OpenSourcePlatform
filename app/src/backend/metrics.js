/*
params = see https://developer.github.com/v3/issues/#list-issues
url = URL TO GITHUB
WARNING: ONLY WORKS WHEN LABEL "ENHANCEMENT" IS SET ON GITHUB ISSUES
*/
export async function getFeatureRequestsFromGithub(url, params) {
  //input example url
  //https://github.com/adam-golab/react-developer-roadmap
  const gitRepo = url.replace("https://github.com", "");

  const urlToOpenFeatureRequests = `https://api.github.com/repos${gitRepo}/issues?state=open&label=enhancement`;
  let result = await fetch(urlToOpenFeatureRequests);
  result = result.json();
  return Promise.resolve(result);
}
