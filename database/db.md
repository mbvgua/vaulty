# Vaulty Database Schema

Vaulty is not a large application and will thus similarly comprise of a rather small but efficient database schema. I used a relational database, namely MySql, and created only two databases:
- userBasicInfo
- userPersonalInfo

> The contents might have been summed into one gigantic table, but for modularity I opted to go with two, each is discussed below:

## userBasicInfo
The first table that loads user data when a new user is created. It has 8 columns, namely:

- id: automaticlly created for each new user.
- username: 
- email:
- phoneNumber:
- password:
- createdAt:
- isEmailVerified:
- isDeleted:

## userPersonalInfo
The second table has 5 columns:

- id: a foreighn key that matches to the users unique id.
- gender:
- dob: the date of birth, to ensure user is of legal age.
- profilePic: 
- agreedToTos: ensure user agrees to the terms terms of service of application. Must be true 

