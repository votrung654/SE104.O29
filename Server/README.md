# API Instruction #
All action syntaxes start with /v1 

## Query Actions ##
Query Actions: get number of students in a class, get list of students, etc.
## Authentication Actions ##
Url: /v1/auth/</br>
Method: POST
### Login ###
Url: /v1/auth/login</br>
JSON:</br>
```
{ 
  "username": "abc",
  "password": "11112000"
}
```

## Modify Actions ##
- Modify Actions: add new user, add student, etc. 
Use post method with url: `/v1/object-name/action`</br>
Ex url: `/v1/student/add`</br>
**Send the information in a JSON with specific structure for each action (add it in BODY-CONTENT) (see below)**

### Student Objects ###
#### Modify: Add new student ####
Url: /v1/student/add</br>
Method: POST
JSON: </br>
```
{ 
  "name":"samplename", 
  "gender":"samplegender", 
  "dob":"samplebirthday", 
  "addr":"sampleaddress", 
  "mail":"sampleemail@gmail.com"
}
```
This generates id automatically using current year as prefix, then returns { status: 0/1, new_id: id }</br>
status: 0 (fail), 1 (success)
#### Modify: Update a student ####
Url: /v1/student/update</br>
Method: POST
JSON: </br>
```
{ 
  "id":"sampleid", 
  "name":"samplename", 
  "gender":"samplegender", 
  "dob":"samplebirthday", 
  "addr":"sampleaddress", 
  "mail":"sampleemail@gmail.com"
}
```
**Note: This action will update information of student who has student_id = "sampleid"</br>**
Return { status: 0/1 }</br>
status: 0 (fail), 1 (success)
#### Query: Get all students in database ####
Url: /v1/student/show</br>
Method: GET
#### Query: Get student's information ####
Url: /v1/student/detail/${student_id}</br>
Method: GET
#### Modify: Remove a student ####
Url: /v1/student/remove/${student_id}</br>
Method: GET
### Teacher Objects ###
#### Modify: Add new teacher (user) ####
Url: /v1/teacher/add </br>
Method: POST
```
JSON: 
{ 
  "id": "sampleid", 
  "passwd": "samplepasswd", 
  "username": "abcd", 
  "fullname": "samplename", 
  "gender": "samplegender", 
  "dob": "2000-11-11", 
  "addr": "sampleaddress", 
  "mail": "sampleemail@gmail.com" 
}
```
### Class Objects ###
#### Modify: Add a new Academic Year ####
Url: /v1/year/add</br>
Method: POST</br>
```
JSON: 
{
  "start_date": "2022/01/01",
  "finish_date": "2024/12/31"
}
```
*Note: pick the insertId field in the returned respond to identify the new academic year's id record*
#### [IMPORTANT] Query: Get Academic Years table (nien khoa)####
Url: /v1/class/get/year</br>
Method: GET
#### Query: List students in a class ####
Url: /v1/class/get/student</br>Ex: v1/class/get/student/</br>
Method: POST</br>
```
JSON: 
{
  "class_name": "10A1",
  "yearid": 1 
}
```
***(yearid get from Academic Years reference table - this table should be got at initialization step)***
#### Query: Get number of students in a class ####
Url: /v1/class/get/summary</br>
Method: POST
```
JSON: 
{
  "class_name": "10A1",
  "yearid": 1
}
```
#### Query: Get all existing classes of an Academic Year ####
Url: /v1/class/get/${yearid}</br>
Method: GET
#### Modify: Assign a list of students to classes ####
Url: /v1/class/update </br>
Method: POST
```
JSON: 
[
  {
    "class": 1,
    "student_id": "18520113"
  },
  {
    "class": 2,
    "student_id": "18520009"
  }
]
```
"class" is class_id (int)
### FORM 3 - Student List ###
#### Query: Get student list and average  ####
Url: /v1/student/get</br>
Method: POST </br>
JSON: </br>
```
{
  "yearid": 1
}
```
*This automatically gets both First and Second Semester average and class name and returns as below:*
```
{
  status: 1,
  data: [
          {
            StudentID: '18520001',
            StudentName: 'Nguyễn Lê Bách',
            ClassID: 1,
            ClassName: '10A1',
            Avg1: 7.726666683620877,
            Avg2: 8.666666666666666
          },
          {
            ...other result...
          }
        ]
}
```
*The status in response is status of query (success 1 or fail 0)*</br>

### FORM 4 - Transcripts ###
#### Query: Get transcript (mark) of a class in a semester ####
Url: /v1/transcript/get</br>
Method: POST
JSON: </br>
```
{ 
  "class_name": "10A2",
  "sem_name": "HỌC KÌ 1",
  "subj_name": "Toán",
  "yearid": 1
}
```
#### Modify: Update transcript (mark) of list of students in a semester ####
Url: /v1/transcript/update</br>
Method: POST
```
JSON:
[
  {
    "student_id": "18520001",
    "sem_name": "HỌC KÌ 1",
    "subj_name": "Lý",
    "exam_1": 7,
    "exam_2": 8
  },
  {
    "student_id": "18520001",
    "sem_name": "HỌC KÌ 1",
    "subj_name": "Hoá",
    "exam_1": 8,
    "exam_2": 7
  }
]
```
This returns back the request JSON on success of query (the first object states result status of query)</br>
```
[
  { status: 1 },
  {
    afftected_on: '18520001',
    subject: 'Lý',
    semester: 'HỌC KÌ 1',
    new_mark: [ 7, 8 ]
  }
]
  ```

### FORM 5 - Report ###
#### Query: Get subject report (5.1) ####
Url: /v1/transcript/show/report/subject</br>
Method: POST </br>
```
JSON:
{ 
  "sem_name": "HỌC KÌ 1",
  "subj_name": "Toán",
  "yearid": 1
}
```
This returns 2 tables as below
```
{
  Pass: [
    RowDataPacket { id: 1, name: '10A1', SoLuongDat: 2 },
    RowDataPacket { id: 2, name: '10A2', SoLuongDat: 1 }
  ],
  NoStudent: [
    RowDataPacket { id: 1, name: '10A1', SiSo: 3 },
    RowDataPacket { id: 2, name: '10A2', SiSo: 4 }
  ]
}
```
Pass percentages can be implicated from Pass and NoStudent: (Pass/NoStudent)*100

#### Query: Get Semester report (5.2) ####
Url: /v1/transcript/show/report/semester</br>
Method: POST </br>
```
JSON:
{ 
  "sem_name": "HỌC KÌ 2",
  "yearid": 1
}
```
This returns 2 tables as below
```
{
  Pass: [
    RowDataPacket { id: 1, name: '10A1', SoLuongDat: 2 },
    RowDataPacket { id: 2, name: '10A2', SoLuongDat: 3 }
  ],
  NoStudent: [
    RowDataPacket { id: 1, name: '10A1', SiSo: 3 },
    RowDataPacket { id: 2, name: '10A2', SiSo: 4 }
  ]
}
```
Pass percentages can be implicated from Pass and NoStudent: (Pass/NoStudent)*100
