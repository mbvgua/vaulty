# Vaulty Database Schema

Vaulty is not a large application and will thus similarly comprise of a rather small database schema. I used a relational database, namely MySQL.

## Basic Schema

1.[Tables](#tables)
2.[Stored Procedures](#stored-procedures)
3.[Views](#views)
4.[Triggers](#triggers)
5.[Functions](#functions)

### Tables

Currently there are 5 tables in the database:

| Table          | Description     |
|--------------- | --------------- |
| users          | Stores essential data related to a specific user|
| birds          | Each bird with data uniquely specific to it|
| coops          | Each coop represents a house with a given number of birds. Must be linked to a specific user|
| feeds          | Tracks feeds bought, linking them to a given coop. <!--TODO: incorporate ML to fill in the estimated_finish column-->|
| expenses       | Track expenditure in farm based on different categories.  |

<!--TODO: add the auditLogs tables for security within app. tracks all actions induced by each user-->

### Stored Procedures 

Each table above will have a list of stored procedures associated with it:

| Table Name   | Sored Procedures    |
|--------------- | --------------- |
| users   | <table> <thead> <th> Name</th> <th>Description</th> </thead> <tbody> <tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserById</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByEmail</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByUserName</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getAllUsers</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>updateUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deactivateUserAccount</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deleteUserAccount</td> <td> wefdwedwdwdwdw</td> </tr> </tbody> </table>|
| birds   | <table> <thead> <th> Name</th> <th>Description</th> </thead> <tbody> <tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserById</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByEmail</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByUserName</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getAllUsers</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>updateUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deactivateUserAccount</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deleteUserAccount</td> <td> wefdwedwdwdwdw</td> </tr> </tbody> </table>|
| coops   | <table> <thead> <th> Name</th> <th>Description</th> </thead> <tbody> <tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserById</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByEmail</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByUserName</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getAllUsers</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>updateUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deactivateUserAccount</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deleteUserAccount</td> <td> wefdwedwdwdwdw</td> </tr> </tbody> </table>|
| feeds   | <table> <thead> <th> Name</th> <th>Description</th> </thead> <tbody> <tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserById</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByEmail</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByUserName</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getAllUsers</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>updateUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deactivateUserAccount</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deleteUserAccount</td> <td> wefdwedwdwdwdw</td> </tr></tbody> </table>|
| expenses| <table> <thead> <th> Name</th> <th>Description</th> </thead> <tbody> <tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserById</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByEmail</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getUserByUserName</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>getAllUsers</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>addUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>updateUser</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deactivateUserAccount</td> <td> wefdwedwdwdwdw</td> </tr><tr> <td>deleteUserAccount</td> <td> wefdwedwdwdwdw</td> </tr> </tbody> </table>|
### Views

Views act like tables and they help us run complex repititive queries easily, they include:

| name   | description    |
|--------------- | --------------- |
| getUserBirdsView | displays all birds that belong to users in the system  |
| getUserCoopsView | displays all coops owners by users in the system   |
| getUserExpensesView | display all expenses incurred by users in the system    |
| getUserFeedsView | display all feeds bought by a user in the application   |
| getCoopBirdsView | displays all birds and to which coop they belong   |
| getCoopExpensesView |  display all inhouse expenses incurred bya  certain coop  |
| getCoopFeedsView |  display all feeding expenses gathered by a certain coops  |

> [!NOTE]
> **Triggers** and **Functions** will be added later on. There is currently no usecase for them, but they become essessential in the auditLogs table.


## Basic Setup

To create the entire database using a script, navigate to this directory and run:

```sh
    $ chmod +x setup.py
    $ ./setup
```

This runs a shell script that either setups or tears down the entire database schema.

> [!IMPORTANT]
> The shebang on the script is designed for linux systems, on windows and MacOs systems, you will need to alter it to match the location of your python executable. The command `whereis python` might be a good place to start as illustrated below:

```bash
    $ whereis python
    #or go into the python REPL and get the exact path
    $ python
    >>> import os
    >>> print(os.executable())
```
