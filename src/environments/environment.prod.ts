import pkg from '../../package.json';
let version = pkg.version;
let name = pkg.name;

export const environment = {
  production: true,
  name,
  version,
};
