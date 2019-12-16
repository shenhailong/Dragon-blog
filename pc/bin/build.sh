vue-cli-service build
cp -R ./dist ./pc
tar -zcvf ./pc.tar.gz pc
rm -rf ./pc
cp ./pc.tar.gz ../service/app/public
rm ./pc.tar.gz
cd ../service/app/public
# git checkout dev
# git pull
rm -rf ./pc
tar -zxvf ./pc.tar.gz
rm ./pc.tar.gz
cd pc
mv ./index.html ./pc.html
\cp -rf ./pc.html ../../view/pc.html
open .
