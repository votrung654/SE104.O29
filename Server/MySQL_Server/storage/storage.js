const QUERY_SHEET   = 'mysql-queries.json';
let queryJSON     = require(`./${QUERY_SHEET}`);
const bcrypt        = require('bcrypt');

function setupDatabase(dbName)
{
    let query = `${queryJSON.CREATE_DB}${dbName};`// \n${queryJSON.USE_DB}${dbName};`;
    console.log(query);
    return query;
}

function useDatabase(dbName)
{
    let query = `${queryJSON.USE_DB}${dbName};`;
    console.log(query);
    return query;
}

function setupTables(onCompleted, onError)
{
    let fs = require('fs');
    fs.readFile('./storage/mysql-setup/setup-tables.sql', 'utf8', (err, data) => 
    {
        if (err)
        {
            onError(err);
            return;
        }
        onCompleted(data);
    });
}

function insertStudent(id_student, name_student, gender, birth, address, email)
{
    let query = queryJSON.INSERT_STUDENT + 
                `('${id_student}', '${name_student}', '${gender}', '${birth}', '${address}', '${email}');`;
    console.log(query);
    return query;
}

function updateStudent(id_student, name_student, gender, birth, address, email)
{
    let pack = queryJSON.UPDATE_STUDENT;
    let query = pack.MAIN_PART + 
                `${pack.NAME}'${name_student}'` + 
                `${pack.GENDER}'${gender}'` + 
                `${pack.DOB}'${birth}'` + 
                `${pack.ADDRESS}'${address}'` + 
                `${pack.EMAIL}'${email}'` + 
                `${pack.STUDENT_ID}'${id_student}';`;
    console.log(query);
    return query;
}

function getStudent(id_student)
{
    let query = queryJSON.STUDENT_DETAIL + `'${id_student}'`;
    console.log(query);
    return query;
}

function removeStudent(id_student)
{
    let query = queryJSON.REMOVE_STUDENT + `'${id_student}';`;
    console.log(query);
    return query;
}

function listStudentsInClass()
{
    let query = queryJSON.LIST_STUDENT_IN_CLASS; 
    // console.log(query);
    return query;
}

function getNumberOfStudentsInClass()
{
    let query = queryJSON.NUMBER_OF_STUDENTS_IN_CLASS;
    // console.log(query);
    return query;
}

function insertTeacher(id_user, password, username, fullname, gender, birth, address, email, phone)
{
    // let saltRounds = 10;
    // let encryptedPassword = bcrypt.hashSync(password, saltRounds);
    let encryptedPassword = password;
    let query = queryJSON.INSERT_TEACHER + 
                `('${id_user}', '${encryptedPassword}', '${username}', '${fullname}', '${gender}', '${birth}', '${address}', '${email}', '${phone}');`;
    console.log(query);
    return query;
}

function updateTeacher(id_user, username, fullname, gender, birth, address, email)
{

}

function getTeacher(id_user)
{
    let query = queryJSON.TEACHER_DETAIL + 
                `'${id_user}'`;
    console.log(query);
    return query;
}

function insertClass(id, name, grade, _year)
{
    let query = queryJSON.INSERT_CLASS + 
        `('${id}', '${name}', ${grade}, ${_year});`
    console.log(query);
    return query;
}

function updateClass(id, name, grade, _year)
{
    let query = queryJSON.UPDATE_CLASS +
        `${queryJSON.CLASS_NAME}'${name}', ` +
        `${queryJSON.CLASS_GRADE}${grade}, ` +
        `${queryJSON.CLASS_YEAR}${_year} ` +
        `${queryJSON.CLASS_ID}'${id}';`;
    console.log(query);
    return query;
}

function getPasswordFrom(username)
{
    let query = queryJSON.LOGIN_VERIFICATION + 
        `'${username}';`
    console.log(query);
    return query;
}

function CreateUser(username, password)
{
    let query = queryJSON.CREATE_USER +
        `('${username}', '${password}');`
    console.log(query);
    return query;
}

function getSubjectTranscript()
{
    return queryJSON.SUBJECT_TRANSCRIPT;
}

function getAvgScore()
{
    return queryJSON.AVG_SCORE;
}

function assignStudentClass()
{
    return queryJSON.ASSIGN_STUDENT_CLASS;
}

function updateSetting(value, settingCode, settingName) {
    let pack = queryJSON.UPDATE_SETTING;
    let query = pack.MAIN_PART +
        `${pack.VALUE}${value}` +
        `${pack.SETTING_CODE}'${settingCode}'` +
        `${pack.SETTING_NAME}'${settingName}';`;
    console.log(query);
    return query;
}

module.exports = 
{
    Query_SetupDatabase             : setupDatabase,
    Query_UseDatabase               : useDatabase,
    Query_SetupTables               : setupTables,
    Query_ListAllClasses            : () => queryJSON.LIST_ALL_CLASSES,
    Query_ListSubjects              : () => queryJSON.LIST_SUBJECTS,
    Query_InsertStudent             : insertStudent,
    Query_ListStudentsInClass       : listStudentsInClass,
    Query_GetNumberOfStudentsInClass: getNumberOfStudentsInClass,
    Query_InsertTeacher             : insertTeacher,
    Query_GetTeacherInfo            : getTeacher,
    Query_UpdateStudent             : updateStudent,
    Query_GetStudent                : getStudent,
    Query_RemoveStudent             : removeStudent,
    Query_InsertClass               : insertClass,
    Query_UpdateClass               : updateClass,
    Query_GetPasswordFrom           : getPasswordFrom,
    Query_CreateUser                : CreateUser,
    Query_GetSubjectTranscript      : getSubjectTranscript,
    Query_GetAvgScore               : getAvgScore,
    Query_AssignStudentClass        : assignStudentClass,
    Query_GetYears                  : () => queryJSON.YEARS_LIST,
    Query_InsertYear                : () => queryJSON.INSERT_YEAR,
    Query_UpdateTranscript          : () => queryJSON.UPDATE_TRANSCRIPT,
    Query_SubjectReport             : () => queryJSON.SUBJECT_PASS_REPORT,
    Query_NoStudents                : () => queryJSON.NO_STUDENT,
    Query_SemesterReport            : () => queryJSON.SEMESTER_REPORT,
    Query_GetAllStudent             : () => queryJSON.GET_ALL_STUDENT,
    Query_GetAvgRespectiveClass     : () => queryJSON.AVG_RESPECTIVE_CLASS,
    Query_GetAllSetting             : () => queryJSON.GET_ALL_SETTING,
    Query_UpdateSetting             : updateSetting
}