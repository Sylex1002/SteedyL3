## Lodphin api django 

## PACKAGE HAVE TO INSTALL
if you want to run this project,you have to install these packages

### `pip install rest_framework`
### `pip install djangorestframework-simplejwt`
### `pip install django-cors-headers`
### `pip install jwt`
### pip install channels_postgres
### python -m pip install -U channels["daphne"]
### pip install channels

**API OF AUTHENTIFICATION**
the api for authentification:

### `http://127.0.0.1:8000/api/signup`
this api is for signup simple user and it takes a lot of input
there are input have to do:
(email,password,username,first_name,last_name)
there is input not have to do:
(domain)
and this is fonction have two option 
option one :(fonction=Etudiant)
option two :(fonction=Professionnel)
this fonction return token

### `http://127.0.0.1:8000/api/superuser`
this api is for signup super user
there are input have to do:
(email,password,username,first_name,last_name)

### `http://127.0.0.1:8000/api/login`
this api is for login  simple user
this api take two input (email and password)

### `http://127.0.0.1:8000/api/refresh/`
this api is for refresh token of user
this api thake one input (Refresh)

### `http://127.0.0.1:8000/api/decodeToken/`
this api is for decode token of user
this api thake one input (token) token mean access

### `http://127.0.0.1:8000/api/users/<int:id>/`
this api are for many thing as get and put simple user

### `http://127.0.0.1:8000/api/hobbies/`
this api is for get all hobbies and post new one but only super user can make it

### `http://127.0.0.1:8000/api/hobbies-superuser/<int:id>/`
this api is for put or delete hobbie but only super user can do it

### `http://127.0.0.1:8000/api/hobbies/<int:id>/`
this api is for get and delete hobbi but it use for simple user

### `http://127.0.0.1:8000/api/highlight_img/`
this api is for post image of highlight


### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`
### `http://127.0.0.1:8000/api/`

<!-- note1 -->
<!-- admin -->
<!-- upload image -->
<!-- cour prof -->