# Why
Sometimes there is a need to update a database, based on data in an excel file. It can be
data altered outside of a system or data that should be added to an existing data structure.

Current sql output format is mysql-compatible-ish.


# Example usages

```
Usage: excel-2-sql [options] <file> <table>

Options:
  -V, --version         output the version number
  -e|--example          Show example data
  -m|--method <method>  Method for sql, valid options: insert, update, replace
  -c|--column <column>  Column to insert/update
  -w|--where <column>   Column for where
  -f|--filter <column>  Column to apply a filter for
  -h, --help            output usage information
```


## Insert data into existing table
$ `./excel-2-sql example.xlsx example`
```
-- Working with  example.xlsx
INSERT example SET id='1',firstname='jane',lastname='doe',department='it',age='32';
INSERT example SET id='2',firstname='john',lastname='doe',department='marketing',age='30';
INSERT example SET id='3',firstname='foo',lastname='bar',department='marketing',age='31';
INSERT example SET id='4',firstname='john',lastname='smith',department='finance',age='40';
INSERT example SET id='5',firstname='jane',lastname='smith',department='finance',age='40';
```


## Replace data in existing table (based on defined primary keys)
$ `./excel-2-sql -m replace example.xlsx example`

```
-- Working with  example.xlsx
REPLACE INTO  example SET id='1',firstname='jane',lastname='doe',department='it',age='32';
REPLACE INTO  example SET id='2',firstname='john',lastname='doe',department='marketing',age='30';
REPLACE INTO  example SET id='3',firstname='foo',lastname='bar',department='marketing',age='31';
REPLACE INTO  example SET id='4',firstname='john',lastname='smith',department='finance',age='40';
REPLACE INTO  example SET id='5',firstname='jane',lastname='smith',department='finance',age='40';
```

## Update data in existing table (based on defined primary keys)
$ `./excel-2-sql -w id -m update example.xlsx example`

```
-- Working with  example.xlsx
UPDATE example SET id='1',firstname='jane',lastname='doe',department='it',age='32' WHERE id='1';
UPDATE example SET id='2',firstname='john',lastname='doe',department='marketing',age='30' WHERE id='2';
UPDATE example SET id='3',firstname='foo',lastname='bar',department='marketing',age='31' WHERE id='3';
UPDATE example SET id='4',firstname='john',lastname='smith',department='finance',age='40' WHERE id='4';
UPDATE example SET id='5',firstname='jane',lastname='smith',department='finance',age='40' WHERE id='5';
```

## Only update certain columns in existing table (based on defined primary keys)
$ `./excel-2-sql -w id -m update -c firstname,lastname example.xlsx example`

```
-- Working with  example.xlsx
UPDATE example SET firstname='jane',lastname='doe' WHERE id='1';
UPDATE example SET firstname='john',lastname='doe' WHERE id='2';
UPDATE example SET firstname='foo',lastname='bar' WHERE id='3';
UPDATE example SET firstname='john',lastname='smith' WHERE id='4';
UPDATE example SET firstname='jane',lastname='smith' WHERE id='5';
```

## Only update certain columns in existing table (based on defined primary keys) and filter by age
$ `./excel-2-sql -w id -m update -c firstname,lastname -f "age>31" example.xlsx example`

```
-- Working with  example.xlsx
UPDATE example SET firstname='jane',lastname='doe' WHERE id='1';
UPDATE example SET firstname='john',lastname='smith' WHERE id='4';
UPDATE example SET firstname='jane',lastname='smith' WHERE id='5';
```

