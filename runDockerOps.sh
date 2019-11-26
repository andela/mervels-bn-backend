cd docker
rm .env

echo 'Cloning Backend Repo ... '
git clone https://github.com/andela/mervels-bn-backend.git
echo 'Pulling Changes ... '
cd mervels-bn-backend && git reset HEAD --hard
git pull
rm DockerFile
cd ..

echo "Getting environment variables"
cp ../.env .
echo "\nFRONTEND_URL=localhost:3000" >> .env

echo 'Cloning Frontend Repo ... '
git clone https://github.com/andela/mervels-bn-frontend.git
echo 'Pulling Changes ... '
cd mervels-bn-frontend && git reset HEAD --hard 
git pull
rm DockerFile
cd ..
echo 'Adding DockerFile to frontend ... '
cp -f ReactFile mervels-bn-frontend
mv mervels-bn-frontend/ReactFile mervels-bn-frontend/Dockerfile
echo 'Adding DockerFile to backend ... '
cp -f NodeFile mervels-bn-backend
mv mervels-bn-backend/NodeFile mervels-bn-backend/Dockerfile

echo "Running docker-compose ... "
docker-compose stop
docker-compose build
docker-compose up