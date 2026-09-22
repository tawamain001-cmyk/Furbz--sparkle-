import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  root: path.resolve(__dirname,'client'),
  plugins:[react()],
  publicDir:path.resolve(__dirname,'public'),
  server:{host:'0.0.0.0',port:5173,proxy:{'/api':'http://localhost:4000','/uploads':'http://localhost:4000'}},
  build:{outDir:path.resolve(__dirname,'dist'),emptyOutDir:true}
});
