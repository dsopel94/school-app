# School Management App
An MVP application that allows instructors to keep track of their student's contact information and delete or edit any such information as needed. 
### API
-- `GET`
`/courses`
```
{
  name: "Math 101",
  _creator: "4ae4f123456754324567"
}
```
-- `GET by ID`
`/courses/:id`
```
{
    "_id": "Object ID",
    name: "Math 101",
  _creator: "4ae4f123456754324567"

}
```

-- `POST`
`/courses/`
```
{
  name: "Math 101",
  _creator: "4ae4f123456754324567"
}
```
-- `PUT`
`/courses/:id`
```
{
  "_id": "Object ID",
    name: "Math 101",
  _creator: "4ae4f123456754324567"
}
```
-- `DELETE`
`/courses/:id`
```
null
```

-- `GET`
`/instructors`
```
{
  fullName: "John Smith",
  username: "jsmith",
  password: "Password1",
}
```
-- `GET by ID`
`/instructors/:id`
```
{
  "_id": "4aef345678654321345321",
  fullName: "John Smith",
  username: "jsmith",
  password: "Password1",

}
```

-- `POST`
`/instructors/`
```
{
  fullName: "John Smith",
  username: "jsmith",
  password: "Password1",
}
```
-- `PUT`
`/instructors/:id`
```
{
  "_id": "Object ID",
  fullName: "John Smith",
  username: "jsmith",
  password: "Password1",
}
```
-- `DELETE`
`/instructors/:id`
```
null
```

-- `GET`
`/students`
```
{
  firstName: "John",
  lastName: "Smith",
  phoneNumber: 3124008900,
  courses: "432qwertewqer",
  streetAddress: "2500 River Ave",
  miscAddress: "Chicago IL 60654"
}
```
-- `GET by ID`
`/students/:id`
```
{
  "_id": "4aef345678654321345321",
  firstName: "John",
  lastName: "Smith",
  phoneNumber: 3124008900,
  courses: "432qwertewqer",
  streetAddress: "2500 River Ave",
  miscAddress: "Chicago IL 60654"

}
```

-- `POST`
`/students/`
```
{
  firstName: "John",
  lastName: "Smith",
  phoneNumber: 3124008900,
  courses: "432qwertewqer",
  streetAddress: "2500 River Ave",
  miscAddress: "Chicago IL 60654"
}
```
-- `PUT`
`/students/:id`
```
{
  "_id": "Object ID",
  firstName: "John",
  lastName: "Smith",
  phoneNumber: 3124008900,
  courses: "432qwertewqer",
  streetAddress: "2500 River Ave",
  miscAddress: "Chicago IL 60654"
}
```
-- `DELETE`
`/students/:id`
```
null
```

[Screenshot]("")

Built with Mongoose, Express, React, and Node. Application hosted on gh-pages and Heroku.
