# Election Form Data
This directory contains data to import into Ask's mongo database to see it with
the form necessary to power this application.

1. scp `ask-forms.json` to the server where Ask is installed

        scp -i /path/to/aws-key.pem ask-forms.json ubuntu@my-server-name.com:~

2. ssh to the server where Ask is installed

        ssh ubuntu@my-server-name.com -i /path/to/aws-key.pem

3. Use `docker ps` to determine the container where Ask's mongo database is running. Look for the container named `ask_shelf_mongo_1`

        docker ps
        ...
        a0e766e85dc        mongo:3.2                        "/entrypoint.sh mongo"   40 hours ago        Up 40 hours         27017/tcp                                            ask_shelf-mongo_1
        ...

4. Copy the `ask-forms.json` file from the Ask host machine to the docker cotainer

        docker cp /home/ubuntu/ask-election.json a0e766e85dc:/

5. ssh into the docker container and import the json file into Mongo

        docker exec -i -t a0e766e85dc /bin/bash
        mongoimport --db test --collection forms --file ask-forms.json

6. Go to Ask and make a copy of the form.
