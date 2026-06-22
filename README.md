Сделайте npm install внутри каждой папки, при скачивании этого репозитория у вас не будет модулей:
```bash
git clone https://github.com/AsriellDreemurrl/Afisha.git
cd backend
npm install
cd ../frontend
npm install
```
также рекоммендую сделать `npm install typescript@latest --save-dev` раз, если у вас ошибки в package.json
создайте .env в корневой папке frontend с VITE_API_URL=http://localhost:3000
Если у вас ошибка ниже, удалите файлы .tsbuildinfo в backend
```bash
[3:38:18 PM] Starting compilation in watch mode...
[3:38:23 PM] Found 0 errors. Watching for file changes.
node:internal/modules/cjs/loader:1423
  throw err;
  ^
Error: Cannot find module 'C:\Metalabsprojects\Afisha\backend\dist\main'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
Node.js v24.10.0
```
