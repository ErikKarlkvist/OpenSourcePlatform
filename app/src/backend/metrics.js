/*
see https://developer.github.com/v3/issues/#list-issues
url = URL TO GITHUB
page >= 1 || undefined
type = "bug", "enhancement", "question" etc
WARNING: ONLY WORKS WHEN LABEL "ENHANCEMENT" IS SET ON GITHUB ISSUES
*/
async function getIssueFromGithub(url, page, type) {
  //input example url
  //https://github.com/adam-golab/react-developer-roadmap
  const gitRepo = url.replace("https://github.com", "");
  if (!page) {
    page = 1;
  }

  if (!type) {
    throw new Error("No type specified");
  }

  const urlToOpenIssues = `https://api.github.com/repos${gitRepo}/issues?state=open&labels=${type}&page=${page}`;
  let result = await fetch(urlToOpenIssues);
  result = await result.json();
  return Promise.resolve(result);
}

// see https://developer.github.com/v3/repos/collaborators/#list-collaborators
// url = github url
async function getCollaborators(url) {
  const gitRepo = url.replace("https://github.com", "");
  const urlToCollabs = `https://api.github.com/repos${gitRepo}/contributors`;
  console.log(urlToCollabs);
  let result = await fetch(urlToCollabs);
  console.log(result);
  result = await result.json();
  console.log(result);
  return Promise.resolve(result);
}

export async function getFeatureRequestCount(url) {
  let count = 0;
  let index = 1;

  let features = [];
  let started = false;
  while (features.length === 30 || !started) {
    started = true;
    features = await getIssueFromGithub(url, index, "enhancement");
    count += features.length;
    index++;
  }

  return Promise.resolve(count);
}

export async function getBugCount(url) {
  let count = 0;
  let index = 1;

  let bugs = [];
  let started = false;
  while (bugs.length === 30 || !started) {
    started = true;
    bugs = await getIssueFromGithub(url, index, "bug");
    count += bugs.length;
    index++;
  }

  return Promise.resolve(count);
}

export async function getCollaboratorCount(url) {
  const collaborators = await getCollaborators(url);
  const count = collaborators.length;

  return Promise.resolve(count);
}
