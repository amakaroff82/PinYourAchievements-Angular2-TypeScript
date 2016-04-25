CREATE database plocal:demo admin admin plocal graph

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