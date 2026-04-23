cd src/environments
# api: http://localhost:6014 to http://api.krugozor.davidishe.pro
sed -i '' 's/localhost:6014/api.krugozor.davidishe.pro/g' environment.ts
cd ..
cd ..
# strapi -> https://strapi.krugozor.davidishe.pro 
# domain -> https://krugozor.space
# ng build

cd src/environments
# api: http://api.krugozor.davidishe.pro to http://localhost:6014
# sed -i '' 's/api.krugozor.davidishe.pro/localhost:6014/g' environment.ts
