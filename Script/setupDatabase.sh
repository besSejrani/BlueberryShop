mongorestore -d api_dev_db --host localhost:27017 \
--username api_user \
--password api1234 \
--authenticationDatabase api_dev_db \
--dir ./api_dev_db \
--gzip
