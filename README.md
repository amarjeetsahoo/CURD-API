# CURD-API

### API DOCUMENTATION

`POST: http://localhost:3000/api/user`
```
Body:
{
    "username": "username",
    "fullname": "tester tester",
    "password":"testertester"
}
```
<br>

`GET: http://localhost:3000/api/user`

<br>

`PUT: http://localhost:3000/api/user/:_ID`
```
Body:
{
    "username": "Update username",
    "fullname": "tester newtester"
}
```
<br>

`DELETE: http://localhost:3000/api/user/:_ID`
