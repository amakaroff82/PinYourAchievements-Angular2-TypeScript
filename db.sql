CREATE database plocal:demo admin admin plocal graph

CREATE CLASS Profile
CREATE PROPERTY Profile.name STRING
CREATE PROPERTY Profile.passwordHash STRING
CREATE PROPERTY Profile.email STRING

CREATE CLASS User
CREATE PROPERTY User.genericId STRING
CREATE PROPERTY User.profile LINK Profile

CREATE CLASS AuthSession
CREATE PROPERTY AuthSession.token STRING
CREATE PROPERTY AuthSession.userId STRING
CREATE PROPERTY AuthSession.expirationDate LONG

CREATE CLASS Achievement
CREATE PROPERTY Achievement.title STRING
CREATE PROPERTY Achievement.type STRING
CREATE PROPERTY Achievement._from STRING

INSERT INTO Achievement (title, type, _from) VALUES ("Received Microsoft MVP Award", "major", "Microsoft")
INSERT INTO Achievement (title, type, _from) VALUES ("Approved as SitePoint author", "major", "SitePoint")
INSERT INTO Achievement (title, type, _from) VALUES ("Approved as DotnetCurry author", "major", "DotnetCurry")
INSERT INTO Achievement (title, type, _from) VALUES ("Mention on ASP.NET", "medium", "asp.net")
INSERT INTO Achievement (title, type, _from) VALUES ("First article published on SitePoint", "minor", "SitePoint")
INSERT INTO Achievement (title, type, _from) VALUES ("Got a side project", "minor", "Self")
INSERT INTO Achievement (title, type, _from) VALUES ("Boss patted me for my work", "minor", "Boss")