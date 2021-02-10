// Interfaces for this Tasks
interface Students<T> {
  [group: string]: T;
}

interface Points<T> {
  [name: string]: T;
}

type Marks = Points<number[]>;
type Mark = Points<number>;

// Given Data
const studentsStr =
  "Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія - ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82";

const maxPoints = [12, 12, 12, 12, 12, 12, 12, 16];

// ###################################################################################
// ################################# TASK 1 ##########################################
// ###################################################################################

function organizeStudents(studentStr: string): Students<string[]> {
  let studentsGroups = {} as Students<string[]>;
  let students = studentStr.split("; ").map((student) => student.split(" - "));

  for (let [name, group] of students) {
    if (group in studentsGroups) studentsGroups[group].push(name);
    else studentsGroups[group] = [name];
  }

  return studentsGroups;
}

// ###################################################################################
// ################################# TASK 2 ##########################################
// ###################################################################################

function randomValue(maxValue: number): number {
  switch (Math.floor(Math.random() * 6)) {
    case 1:
      return Math.ceil(maxValue * 0.7);

    case 2:
      return Math.ceil(maxValue * 0.9);

    case 3:
    case 4:
    case 5:
      return maxValue;

    default:
      return 0;
  }
}

function generateMarks(studentGroups: Students<string[]>): Students<Marks> {
  let studentPoints = {} as Students<Marks>;

  for (let group in studentGroups) {
    studentPoints[group] = {} as Marks;

    for (let student of studentGroups[group]) {
      studentPoints[group][student] = maxPoints.map((item) => randomValue(item));
    }
  }

  return studentPoints;
}

// ###################################################################################
// ################################# TASK 3 ##########################################
// ###################################################################################

function sumStudentMarks(students: Students<Marks>): Students<Mark> {
  let result = {} as Students<Mark>;

  for (let group in students) {
    result[group] = {} as Mark;

    for (let name in students[group]) result[group][name] = students[group][name].reduce((curr, acc) => curr + acc);
  }

  return result;
}

// ###################################################################################
// ################################# TASK 4 ##########################################
// ###################################################################################

function groupAverageMark(students: Students<Mark>): Students<number> {
  let result = {} as Students<number>;

  for (let group in students) {
    let arr = Object.entries(students[group]);
    result[group] = arr.reduce((acc, [name, mark]) => acc + mark, 0) / arr.length;
  }

  return result;
}

// ###################################################################################
// ################################# TASK 5 ##########################################
// ###################################################################################
function filterStudents(students: Students<Mark>): Students<string[]> {
  let result = {} as Students<string[]>;

  for (let group in students) {
    result[group] = [] as string[];

    for (let [name, mark] of Object.entries(students[group])) {
      if (mark > 60) result[group].push(name);
    }

    // Also possible such answer but it's not efficient (〒 ▽ 〒)
    // result[group] = Object.entries(students[group]).filter(([name, mark]) => mark > 60).map(([name, mark]) => mark);
  }

  return result;
}

// This function is Started in components/TestScreen.tsx
export default function main() {
  const studentGroups = organizeStudents(studentsStr);
  console.log("Task 1");
  console.log(studentGroups);

  const studentPoints = generateMarks(studentGroups);
  console.log("Task 2");
  console.log(studentPoints);

  const sumPoints = sumStudentMarks(studentPoints);
  console.log("Task 3");
  console.log(sumPoints);

  const groupAvg = groupAverageMark(sumPoints);
  console.log("Task 4");
  console.log(groupAvg);
  console.log();

  const passedPerGroup = filterStudents(sumPoints);
  console.log("Task 5");
  console.log(passedPerGroup);
}
