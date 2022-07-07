const REPO_URL_REGEX = /^(?!.+:\/\/)(?:(?<auth>.*)@)?(?<host>.*?):(?<path>.*)$/;
const PATHNAME_REGEX = /^\/(?<owner>[^/]+)?\/?(?<repo>.+?)(?:\.git)?$/;

const sshUrl = (auth: string | undefined, host: string, path: string) =>
  `ssh://${auth ? `${auth}@` : ''}${host}/${path}`;

export default (repositoryUrl: string) => {
  const [match, auth, host, path] = REPO_URL_REGEX.exec(repositoryUrl) || [];
  const { pathname } = new URL(match ? sshUrl(auth, host, path) : repositoryUrl);
  const [, owner, repo] = PATHNAME_REGEX.exec(pathname);
  return { owner, repo };
};
