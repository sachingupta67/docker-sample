## BUILD DOCKER IMAGE

- docker image build -t <IMAGE_NAME> <DOCKER_FILE_LOCATION>
 # IMAGE_NAME | Any name can be give (unique it should be)
 # DOCKER_FILE_LOCATION | Where DockerFile Written , generally "."

# Check Docker Image list (we can see in application as well)

- docker images OR docker image ls

# Create new container to run this image , it will create & run | You can see in app as well

- docker container run <IMAGE_NAME>

# see files in docker container 
- open app > open terminal > ls


# list docker container (but it will show running container only)
- docker container ls 

# list docker container which is not running 
- docker container ls -a

# run existing container 
- docker container start <CONTAINER_ID>

# stop running container  by id
- (it will take some time) docker container stop <CONTAINER_ID>
- (it will stop immediate ) docker container kill <CONTAINER_ID>

# stop running container  by name

- (it will take some time) docker container stop <CONTAINER_NAME>
- (it will stop immediate ) docker container kill <CONTAINER_NAME>

# view file in docker container 
- Approach  1 : Open app then see via command line 
- Approach 2 : Create shell then via command line
    - docker exec -it <CONTAINER_ID> sh
    - now run linux command to view / list file
    - exit : write exit


# Create a fresh container with custom name , by default it will give random name

- (run in same terminal, it will consume our terminal) docker container run --name <CONTAINER_CUSTOM_N>  <IMAGE_NAME>
- (run in background,in detached mode,will use -d) docker container run -d --name <CONTAINER_CUSTOM_N>  <IMAGE_NAME>



# see logs of particular container 

- (it will show all logs) docker logs <CONTAINER_NAME>
- (want to see few lines like 2) docker logs <CONTAINER_NAME> -n <LINENO>



# now suppose your app is running on port 3000 , then in browser on localhost it will not run , you need to map these port with our docker

- Here need to EXPOSE <PORT> into docker file


# if you need to rebuild the image then run create build command with same image name

- docker image build -t <EXISTING_IMAGE_NAME> .  | Here . for current directory
- Map the port with this image on new container
   -- docker container run -d -p <EXPOSED_LOCAL_APP_PORT>:<DOCKER_PORT> <CONTAINER_NEW_NAME> <IMAGE_NAME> | Here EXPOSED_LOCAL_APP_PORT & DOCKER_PORT CAN BE SAME AND DIFFERENT TOO


   # when you rebuild same image , then in docker you will see a another image "none" which in use its in daingling mode , you need to remove this but before this you need to remove container where this was running , then you can delete image (means stopped container)


# Delete All Docker Container
- docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# Remove Stopped Container (Helpful in dangling)
- docker container prune
  # then remove unused image
   - docker image prune

# removed all dangling image and stopped container both (dangling)

- docker system prune


# Tag & Versioning
- we can use build image command with tag or version (Eg:tag is 1.0.0 , or dev , anything as tag)
- docker image build -t <IMAGE_NAME>:<TAG> <DOCKER_FILE_LOCATIOn>
  -- docker image build -t node-app-test:1.0.0 . 

# Share Application Docker Image to with our friend/any one say developer
 Approach 1 : Create Tar file , then share with friend (not recommended)
 Approach 2 : Push Docker Image to docker hub, then anyone can pull that image (Recommended)
     - Go to docker hub , create an account
     - make a repo ,(remember this name)
     -[BUILD DOCKER IMAGE] docker image build -t <DOCKER_HUB_USER_NAME>/<DOCKER_IMAGE_NAME_SAME_AS_REPO>:<TAG_NAME> <DOCKER_FILE_LOCATION>
     - [Make sure before push we need to login] - docker login
     -[PUSH TO DOCKER HUB] docker push <DOCKER_HUB_USER_NAME>/<DOCKER_IMAGE_NAME_SAME_AS_REPO>:<TAG_NAME>


# Create Image , RUn to Container & manual port mapping all we can do with docker compose
- it will be helpful to spin up multiple container (in one container we have node app another is python we can spinup both at same time)
- 1. Create docker-compose.yaml file outside the application
- 2 . setup your service ,port etc.
- 3. where you written your .yaml , at this location write command
- [command] docker-compose up | (if image exist not then it will create otherwise update and run into container automatically)   Her it took terminal ,
- [Command] Terminate with ctrl+c
- docker-compose up -d | in detacched mode


## [Docker compose]
   # List Out Containers
    - docker-compose ps
   # Stop container & removed container
    - docker-compose down
   # Build image only , dont want to spin up container
    - docker-compose build
   # Build Image & Spin up container
    - docker-compose up -d 


## Volume 
- if you want to persist some data into container , then you need to you volume
- so the that which we are persisting is not in container , its a saparate space outside container, so our container size not increased due to this
- when container shutdown , then still we have data access , if we spin up again , so data will not loose due to this approach

## How to take Leverage

- Suppose in Volume we have folder "some-data" , in this folder we have data.js
- now we can map this in to container like "some-data" --->"data" , so if we change something in some-data , then automatically "data" folder in the container


Ex : like if we change node-app locally then it will not update on docker container ,thats why change will not reflect

Want - if i change something on local is should update the container itself

Solve - Lets do mapping with volume  , need to add volumes in .yaml file

   volumes:
           - <LOCAL_FOLDER_PATH_FROM_YAML>:<DOCKER_FILE_DIRECTIORY>


# We can set Env Variable too

   environment:
          API_KEY: 123455

# Sometime we need to make env based docker file
  - Dockerfile.prod
  - docker-compose.prod.yaml