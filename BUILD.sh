cd src/environments
# api: http://localhost:6014 to http://api.krugozor.space
sed -i '' 's/localhost:6014/api.krugozor.space/g' environment.ts
cd ..
cd ..
# strapi -> https://strapi.krugozor.space 
# domain -> https://krugozor.space
# ng build

cd src/environments
# api: http://api.krugozor.space to http://localhost:6014
# sed -i '' 's/api.krugozor.space/localhost:6014/g' environment.ts
