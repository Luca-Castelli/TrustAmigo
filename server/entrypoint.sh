#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py create_db
python manage.py seed_users
python manage.py seed_company
python manage.py seed_review
python manage.py seed_contact_request

exec "$@"