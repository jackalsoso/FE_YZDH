const modulesFiles = require.context('./../static/img', true, /\.png$/);
// const modulesFiles2 = require.context('./../static/img', true, /\.png$/);
const modules = [];
// const modeles2x = [];
// const modeles3x = [];
const pushFileName = (obj = {}, path) => {
  obj.keys().forEach((modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    if (RegExp(/@2x/).test(moduleName)) {
      modeles2x.push(path + moduleName);
    } else if (RegExp(/@3x/).test(moduleName)) {
      modeles3x.push(path + moduleName);
    } else {
      modules.push(path + moduleName);
    }
  });
};
pushFileName(modulesFiles, 'img/');
// pushFileName(modulesFiles2, 'img/');
export { modules };
