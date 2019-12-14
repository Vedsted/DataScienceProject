# How to use this image
This image contains basic configurations for submitting Spark jobs written in Python/Java to a YARN cluster. Furthermore, the image is supposed to be extended in order to submit jobs to a YARN cluster. 

## Files included

### Configuration files (part of the image)
* The `conf` directory contains xml-files with settings that are replicated to every nodemanager in the YARN cluster. One can expect to find settings regarding namenode URL settings, YARN settings and history server settings. Be sure that you read through the settings and set them appropriately for your needs.

* The `jars` directory contains jars that are needed in order to run spark jobs and upload the result to the history server.

* The `spark-defaults.conf` file contains default configuration for spark jobs. If settings are not overridden through the SparkConfig class in e.g. a Python/Java program, then the defaults will be used.

* The `spark-env.sh` file contains environment variables needed in order to submit spark jobs. For example, it is in this file we specify that we want to use the xml-files from the `conf` directory.

### Scripts (not part of the image)
* `run.sh` provides an example of launching the image as a docker container.

* `build.sh` provides an example of building the image and pushing it to dockerhub.


## Extending the image
An example of extending the image is provided in steps here:

1. Create a new folder that should contain your extended settings.
    ```bash
    mkdir my-extended-spark-image
    ```
1. Create a new file named `Dockerfile` and use one of the boilerplates below. If you create Java programs you must add the jar-files to the image with the use of the `ADD` command in the `Dockerfile`.

    For Java programs:
    ```bash
    FROM csbc92/spark-base

    ADD submit-job.sh /app/submit-job.sh
    RUN chmod +x /app/submit-job.sh
    ADD your-jar.jar /app/your-jar.jar

    CMD [ "/app/submit-job.sh"]
    ```

    For Python programs:
    ```bash
    ADD submit-job.sh /app/submit-job.sh
    RUN chmod +x /app/submit-job.sh
    ADD app.py /app/app.py
    ```

    It is possible to override the configuration files by adding them with the `ADD` command in the `Dockerfile`. For example, if you want to use another `spark-defaults.conf` file, create it and do the following:

    ```bash
    # Add your config file and override the default provided in the spark-base image
    ADD spark-defaults.conf /spark/conf/spark-defaults.conf
    ```

2. Create the `submit-job.sh` file which should contain the command you want to use when deploying spark jobs to the YARN cluster. Use one of the boilerplates below. If you create Java programs make sure that you point to the location of your jar-file.

    For Java programs:
    ```bash
    #!/bin/bash
    # The script submits the java program to the YARN cluster
    /spark/bin/spark-submit --class org.apache.spark.examples.SparkPi \ # Your program's entry point
        --master yarn \
        --deploy-mode cluster \
        /spark/examples/jars/spark-examples*.jar \ # Your executable spark jar program
        10 # Program argument (not necessary)
    ```

    For Python programs:
    ```bash
    #!/bin/bash
    # The script submits the python script to the YARN cluster
    /spark/bin/spark-submit \
    --master yarn \
    --deploy-mode cluster \
    /app/app.py # Your Python spark program
    ```



3. Build your extended Docker image
    ```
    docker build --rm -t my-extended-spark-image .
    ```
4. Run your extended Docker image
    ```
    docker run --rm --name my-extended-spark-image --network hadoop --ip 172.25.0.241 my-extended-spark-image
    ```