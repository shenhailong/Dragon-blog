umi build
cp -R ./dist ./admin
tar -zcvf ./admin.tar.gz admin
rm -rf ./admin
cp ./admin.tar.gz ../roco-contacts/app/public
rm ./admin.tar.gz
cd ../roco-contacts/app/public
git checkout dev
git pull
rm -rf ./admin
tar -zxvf ./admin.tar.gz
rm ./admin.tar.gz
cd admin
mv ./index.html ./admin.html
\cp -rf ./admin.html ../../view/admin.html
open .
