# Prerequisites
* Start the whole docker environment in the `../environment` directory by navigating to the directory and issuing `docker-compose up`.

# Running the example
If you already have text files in the HDFS directory `/books`, go to step 7.
You can put text files in the HDFS cluster by following these steps:
1. Open a TTY connection to the HDFS namenode:
    ```bash
    docker exec -ti namenode /bin/bash
    ```
2. Make sure that wget is installed on the namenode:
    ```bash
    apt update
    apt install wget
    ```
3. Download e.g. the alice in wonderland and put it in the root-dir on the namenode:
    ```bash
    wget https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt .
    ```

4. Make the directory on the HDFS cluster:
    ```bash
    hdfs dfs -mkdir /books
    ```

5. Put the text file into the HDFS cluster:
    ```bash
    hdfs dfs -put alice_in_wonderland.txt /books
    ```

6. Open a new terminal on your machine or exit the TTY on the namenode i.e. `exit`
7. Execute the `run.sh` script in this directory which will launch a new docker container that will submit the `app.py` file to the YARN cluster.
    ```bash
    ./run.sh
    ```
8. Output of the submit command will be shown on the screen and should look something like this.
   ```
   Sending build context to Docker daemon  5.632kB
    Step 1/5 : FROM csbc92/spark-base
    ---> 44cae75b8417
    Step 2/5 : ADD execute-example.sh /app/execute-example.sh
    ---> Using cache
    ---> 896167af9ad7
    Step 3/5 : RUN chmod +x /app/execute-example.sh
    ---> Using cache
    ---> 38f16fe86121
    Step 4/5 : ADD app.py /app/app.py
    ---> Using cache
    ---> 83fb5ea86e9c
    Step 5/5 : CMD [ "/app/execute-example.sh"]
    ---> Using cache
    ---> 2ae5874e7a3d
    Successfully built 2ae5874e7a3d
    Successfully tagged spark-python-example:latest
    log4j:WARN No appenders could be found for logger (org.apache.hadoop.util.Shell).
    log4j:WARN Please initialize the log4j system properly.
    log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
    Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
    19/12/14 09:56:51 INFO Client: Requesting a new application from cluster with 1 NodeManagers
    19/12/14 09:56:51 INFO Client: Verifying our application has not requested more than the maximum memory capability of the cluster (8192 MB per container)
    19/12/14 09:56:51 INFO Client: Will allocate AM container, with 1408 MB memory including 384 MB overhead
    19/12/14 09:56:51 INFO Client: Setting up container launch context for our AM
    19/12/14 09:56:51 INFO Client: Setting up the launch environment for our AM container
    19/12/14 09:56:51 INFO Client: Preparing resources for our AM container
    19/12/14 09:56:51 WARN Client: Neither spark.yarn.jars nor spark.yarn.archive is set, falling back to uploading libraries under SPARK_HOME.
    19/12/14 09:56:53 INFO Client: Uploading resource file:/tmp/spark-1369e340-2b39-4afb-a3f4-06d298dc47e0/__spark_libs__8803525472261510756.zip -> hdfs://namenode:9000/user/root/.sparkStaging/application_1576316813779_0003/__spark_libs__8803525472261510756.zip
    19/12/14 09:56:54 INFO Client: Uploading resource file:/app/app.py -> hdfs://namenode:9000/user/root/.sparkStaging/application_1576316813779_0003/app.py
    19/12/14 09:56:54 INFO Client: Uploading resource file:/spark/python/lib/pyspark.zip -> hdfs://namenode:9000/user/root/.sparkStaging/application_1576316813779_0003/pyspark.zip
    19/12/14 09:56:54 INFO Client: Uploading resource file:/spark/python/lib/py4j-0.10.7-src.zip -> hdfs://namenode:9000/user/root/.sparkStaging/application_1576316813779_0003/py4j-0.10.7-src.zip
    19/12/14 09:56:54 INFO Client: Uploading resource file:/tmp/spark-1369e340-2b39-4afb-a3f4-06d298dc47e0/__spark_conf__1858837697623218295.zip -> hdfs://namenode:9000/user/root/.sparkStaging/application_1576316813779_0003/__spark_conf__.zip
    19/12/14 09:56:54 INFO SecurityManager: Changing view acls to: root
    19/12/14 09:56:54 INFO SecurityManager: Changing modify acls to: root
    19/12/14 09:56:54 INFO SecurityManager: Changing view acls groups to: 
    19/12/14 09:56:54 INFO SecurityManager: Changing modify acls groups to: 
    19/12/14 09:56:54 INFO SecurityManager: SecurityManager: authentication disabled; ui acls disabled; users  with view permissions: Set(root); groups with view permissions: Set(); users  with modify permissions: Set(root); groups with modify permissions: Set()
    19/12/14 09:56:55 INFO Client: Submitting application application_1576316813779_0003 to ResourceManager
    19/12/14 09:56:55 INFO YarnClientImpl: Submitted application application_1576316813779_0003
    19/12/14 09:56:56 INFO Client: Application report for application_1576316813779_0003 (state: ACCEPTED)
    19/12/14 09:56:56 INFO Client: 
        client token: N/A
        diagnostics: AM container is launched, waiting for AM container to Register with RM
        ApplicationMaster host: N/A
        ApplicationMaster RPC port: -1
        queue: default
        start time: 1576317415042
        final status: UNDEFINED
        tracking URL: http://resourcemanager:8088/proxy/application_1576316813779_0003/
        user: root
    19/12/14 09:56:57 INFO Client: Application report for application_1576316813779_0003 (state: ACCEPTED)
    19/12/14 09:56:58 INFO Client: Application report for application_1576316813779_0003 (state: ACCEPTED)
    19/12/14 09:56:59 INFO Client: Application report for application_1576316813779_0003 (state: ACCEPTED)
    19/12/14 09:57:00 INFO Client: Application report for application_1576316813779_0003 (state: RUNNING)
   ```

9. Use the tracking-url as shown from the output above to check the output of the job iteself. **NB! The host names (e.g. resourcemanager, historyserver, efcad05ace1a etc.) cannot be resolved because these are docker container names. This can be solved by substituting these host names with localhost, or by adding entries for these hosts in your hosts-file `/etc/hosts`. The entries should follow the scheme `127.0.0.1    resourcemanager`.**

10. Screenshot of tracking URL e.g. (http://resourcemanager:8088/cluster/app/application_1576316813779_0003):
![Resource Manager Screen](resourcemanager-screen.png?raw=true)
1. Screenshot of output on the history server e.g. (http://historyserver:8188/applicationhistory/logs//efcad05ace1a:41045/container_1576316813779_0003_01_000001/container_1576316813779_0003_01_000001/root)
![Resource Manager Screen](historyserver-screen.png?raw=true)