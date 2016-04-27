SELECT count(@rid) AS count
FROM User
WHERE genericId = '<%= genericId %>'
LIMIT 1