export var name = "express-sweet";
export var version = "1.0.12";
export var description = "Extend Express functionality with Express Sweet and start developing fast, minimal web applications.";
export var main = "dist/build.common.js";
export var module = "dist/build.esm.js";
export var types = "types/index.d.ts";
export var files = ["LICENSE","README.md","CHANGELOG.md","dist/","docs/","example/","types/","package.json"];
export var scripts = {"watch":"node --max-old-space-size=8192 node_modules/rollup/dist/bin/rollup -c rollup.config.js --watch","prewatch":"rm -rf dist types && json2module package.json > src/package.ts","build":"node --max-old-space-size=8192 node_modules/rollup/dist/bin/rollup -c rollup.config.js","prebuild":"rm -rf dist types && json2module package.json > src/package.ts","test":"jest","start":"ts-node -r tsconfig-paths/register -P tsconfig.json -O '{\"module\":\"commonjs\"}' -e \"import * as index from '~/index';console.log(index);\"","prestart":"json2module package.json > src/package.ts"};
export var _moduleAliases = {"~":"dist"};
export var repository = {"type":"git","url":"git+https://github.com/takuya-motoshima/express-sweet.git"};
export var keywords = ["nodejs","express","framework","web","rest","restful","router","app","api","shared","library","lib","typescript","ts","esm","es6","orm","mysql","mariadb","sqlite","postgresql","postgres","mssql"];
export var author = "Takuya Motoshima <developer.takuyamotoshima@gmail.com> (https://twitter.com/TakuyaMotoshima)";
export var license = "MIT";
export var bugs = {"url":"https://github.com/takuya-motoshima/express-sweet/issues","email":"developer.takuyamotoshima@gmail.com"};
export var homepage = "https://github.com/takuya-motoshima/express-sweet#readme";
export var dependencies = {"aws-sdk":"^2.690.0","body-parser":"^1.19.0","class-transformer":"^0.2.3","class-validator":"^0.12.2","cookie-parser":"~1.4.4","cors":"^2.8.5","debug":"~2.6.9","dotenv":"^8.2.0","esm":"^3.2.25","express":"^4.16.4","express-hbs":"^2.3.3","express-session":"^1.17.1","fs-extra":"^9.0.1","glob":"^7.1.6","hbs":"~4.0.4","http-errors":"~1.6.3","ioredis":"^4.27.6","mariadb":"^2.4.0","mime-types":"^2.1.27","module-alias":"^2.2.2","moment":"^2.26.0","morgan":"~1.9.1","multer":"^1.4.2","nodejs-shared":"^1.0.2","passport":"^0.4.1","passport-local":"^1.0.0","reflect-metadata":"^0.1.13","sequelize":"^5.22.4","uniqid":"^5.2.0"};
export var devDependencies = {"@types/aws-sdk":"^2.7.0","@types/cookie-parser":"^1.4.2","@types/debug":"^4.1.5","@types/express":"^4.17.11","@types/express-session":"^1.17.3","@types/http-errors":"^1.8.0","@types/ioredis":"^4.26.4","@types/jest":"^26.0.22","@types/multer":"^1.4.5","@types/node":"^14.14.37","@types/passport":"^1.0.6","@types/passport-local":"^1.0.33","@types/validator":"^13.1.3","jest":"^26.6.3","json2module":"0.0.3","rollup":"^2.51.1","rollup-plugin-commonjs":"^10.1.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-terser":"^7.0.2","rollup-plugin-typescript2":"^0.30.0","ts-loader":"^8.1.0","ts-node":"^9.1.1","tsc-alias":"^1.2.9","tsconfig-paths":"^3.9.0","tslint":"^6.1.3","typescript":"^4.2.3"};
