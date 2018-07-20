const storage = window.localStorage;

export async function getProjectFromDraft(id) {
  const draftLocation = "draft" + id;
  const project = storage.getItem(draftLocation);
  return Promise.resolve(JSON.parse(project));
}

export async function saveToLocalDraft(id, project) {
  const draftLocation = "draft" + id;
  storage.setItem(draftLocation, JSON.stringify(project));
  return Promise.resolve("success");
}

//implement later
export async function saveToRemoteDraft() {}
