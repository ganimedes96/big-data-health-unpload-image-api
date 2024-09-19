FROM  node:18.20.4-alpine3.20

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN apk add --no-cache --virtual .gyp python3 make g++ \ 
    && apk del .gyp \    
    &&  npm install -g pnpm \ 
    && pnpm install 
# 
#

RUN pnpm install --frozen-lockfile


COPY . .

RUN npx prisma generate dev

# RUN pnpm run build

RUN npm install -g pnpm 


# #Certifique-se de copiar o package.json corretamente
# COPY --from=build /usr/src/app/package*.json ./
# COPY --from=build /usr/src/app/pnpm-lock.yaml ./
# COPY tsconfig.json .

# #Copie o diretório node_modules e o build final
# COPY --from=build /usr/src/app/node_modules ./node_modules


EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]