mongodump --host localhost:27017 \
--username api_user \
--password api1234 \
--db api_dev_db \
--gzip \
--out ../Backup/`date +"%Y-%m-%d"`