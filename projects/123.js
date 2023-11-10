// reading data from XLS table
const ExcelToJSON = function () {
  this.parseExcel = function (file, callBack) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      // workbook.SheetNames.forEach(function (sheetName) {
      // Here is your object
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets["Sheet1"]
      );
      var json_object = JSON.stringify(XL_row_object);
      const tableJSON = JSON.parse(json_object);
      console.log(tableJSON), json_object;
      jQuery("#xlx_json").val(json_object);
      callBack(tableJSON);
      // })
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

onmessage = function(e) {
  console.log('Worker: Message received from main script', e.data);
  buildSchedule(e.data);
  // handleFileSelect(e);
  console.log('Worker: Posting message back to main script');
  postMessage(true);
}

function handleFileSelect(evt) {
  const files = evt.target.files; // FileList object
  const xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0], buildSchedule);
}
// -------------------------------------

function buildSchedule(tableJSON) {
  console.log("TanleJSON - ", tableJSON);
  const start = performance.now();
  
  const classes = [
    {
      id: 1,
      number: 8,
      letter: "а",
      group: "full",
    },
    {
      id: 2,
      number: 8,
      letter: "а",
      group: 1,
    },
    {
      id: 3,
      number: 8,
      letter: "а",
      group: 2,
    },
    {
      id: 4,
      number: 8,
      letter: "б",
      group: "full",
    },
    {
      id: 5,
      number: 8,
      letter: "б",
      group: 1,
    },
    {
      id: 6,
      number: 8,
      letter: "б",
      group: 2,
    },
    {
      id: 7,
      number: 9,
      letter: "а",
      group: "full",
    },
    {
      id: 8,
      number: 9,
      letter: "а",
      group: 1,
    },
    {
      id: 9,
      number: 9,
      letter: "а",
      group: 2,
    },
    {
      id: 10,
      number: 9,
      letter: "б",
      group: "full",
    },
    {
      id: 11,
      number: 9,
      letter: "б",
      group: 1,
    },
    {
      id: 12,
      number: 9,
      letter: "б",
      group: 2,
    },
    {
      id: 13,
      number: 10,
      letter: "а",
      group: "full",
    },
    {
      id: 14,
      number: 10,
      letter: "а",
      group: 1,
    },
    {
      id: 15,
      number: 10,
      letter: "а",
      group: 2,
    },
    {
      id: 16,
      number: 10,
      letter: "б",
      group: "full",
    },
    {
      id: 17,
      number: 10,
      letter: "б",
      group: 1,
    },
    {
      id: 18,
      number: 10,
      letter: "б",
      group: 2,
    },
    {
      id: 19,
      number: 10,
      letter: "в",
      group: "full",
    },
    {
      id: 20,
      number: 10,
      letter: "в",
      group: 1,
    },
    {
      id: 21,
      number: 10,
      letter: "в",
      group: 2,
    },
    {
      id: 22,
      number: 11,
      letter: "а",
      group: "full",
    },
    {
      id: 23,
      number: 11,
      letter: "а",
      group: 1,
    },
    {
      id: 24,
      number: 11,
      letter: "а",
      group: 2,
    },
    {
      id: 25,
      number: 11,
      letter: "б",
      group: "full",
    },
    {
      id: 26,
      number: 11,
      letter: "б",
      group: 1,
    },
    {
      id: 27,
      number: 11,
      letter: "б",
      group: 2,
    },
    {
      id: 28,
      number: 11,
      letter: "в",
      group: "full",
    },
    {
      id: 29,
      number: 11,
      letter: "в",
      group: 1,
    },
    {
      id: 30,
      number: 11,
      letter: "в",
      group: 2,
    },
  ];

  // for checking if gym and lang lessons are in the same day for current class already
  const classesGymLangPairs = classes.map(({ id }) => ({
    id,
    pairPresent: false,
  }));

  let teacherId = 1;
  const teachers = tableJSON.reduce((acc, row) => {
    if (!acc.some(({ name }) => name === row.teacher)) {
      const newTeacher = {
        id: `teacher${teacherId++}`,
        name: row.teacher,
      };
      acc.push(newTeacher);
    }
    return acc;
  }, []);

  const lessons = [1, 2, 3, 4, 5, 6, 7, 8];
  const days = ["mon", "tue", "wed", "thu", "fri"];

  const subjectComplexityLevels = [1, 2, 3, 4];

  const pupilProductivity = {
    1: {
      productiveLessons: [1, 2, 4],
      notProductiveLessons: [3],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    2: {
      productiveLessons: [1, 2, 4],
      notProductiveLessons: [3],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    3: {
      productiveLessons: [1, 2, 3],
      notProductiveLessons: [4],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    4: {
      productiveLessons: [1, 2, 3],
      notProductiveLessons: [4],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    5: {
      productiveLessons: [1, 2, 3],
      notProductiveLessons: [4],
      productiveDays: [days[0], days[1]],
      notProductiveDays: [days[2], days[3], days[4]],
    },
    6: {
      productiveLessons: [1, 2, 5],
      notProductiveLessons: [4, 6],
      productiveDays: [days[1], days[3], days[4]],
      notProductiveDays: [days[0], days[2]],
    },
    7: {
      productiveLessons: [1, 2, 5],
      notProductiveLessons: [4, 6],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    8: {
      productiveLessons: [1, 2, 3, 5],
      notProductiveLessons: [4, 6],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    9: {
      productiveLessons: [1, 2, 3, 5],
      notProductiveLessons: [4, 6],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
    10: {
      productiveLessons: [1, 2, 3, 5, 6],
      notProductiveLessons: [4],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
    11: {
      productiveLessons: [1, 2, 3, 4, 5, 6],
      notProductiveLessons: [],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
    12: {
      productiveLessons: [1, 2, 3, 4, 5, 6],
      notProductiveLessons: [],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
  };

  const pupilProductivityForPairedLessons = {
    1: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    2: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    3: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    4: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    5: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [],
      productiveDays: [days[0], days[1]],
      notProductiveDays: [days[2], days[3], days[4]],
    },
    6: {
      productiveLessons: [1, 2, 5, 6],
      notProductiveLessons: [3, 4],
      productiveDays: [days[1], days[3], days[4]],
      notProductiveDays: [days[0], days[2]],
    },
    7: {
      productiveLessons: [1, 2, 5, 6],
      notProductiveLessons: [3, 4],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    8: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [5, 6],
      productiveDays: [days[1], days[2], days[3]],
      notProductiveDays: [days[0], days[4]],
    },
    9: {
      productiveLessons: [1, 2, 3, 4],
      notProductiveLessons: [5, 6],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
    10: {
      productiveLessons: [1, 2, 5, 6],
      notProductiveLessons: [3, 4],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
    11: {
      productiveLessons: [1, 2, 3, 4, 5, 6],
      notProductiveLessons: [],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
    12: {
      productiveLessons: [1, 2, 3, 4, 5, 6],
      notProductiveLessons: [],
      productiveDays: [days[2], days[3], days[4]],
      notProductiveDays: [days[0], days[1]],
    },
  };

  // const input = document.getElementById("recommendedLessonsAtOnce");
  let schoolRecommendedHoursAtOnce = 1;
  // let schoolRecommendedHoursAtOnce = input.value || 1;
  // if (schoolRecommendedHoursAtOnce > 2) {
  //   schoolRecommendedHoursAtOnce = 2;
  // }
  // if (schoolRecommendedHoursAtOnce < 1) {
  //   schoolRecommendedHoursAtOnce = 1;
  // }
  // input.value = schoolRecommendedHoursAtOnce;

  const subjects = [
    {
      id: 1,
      name: "Математика",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 6, //
    },
    {
      id: 2,
      name: "Алгебра",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.5, //
    },
    {
      id: 3,
      name: "Геометрія",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 6, //
    },
    {
      id: 4,
      name: "Українська мова",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 3.5, //
    },
    {
      id: 5,
      name: "Українська література",
      complexityLevel: subjectComplexityLevels[2],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 1.7, //
    },
    {
      id: 6,
      name: "Зарубіжна література",
      complexityLevel: subjectComplexityLevels[2],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 1.7, //
    },
    {
      id: 7,
      name: "Англійська мова",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.4, //
    },
    {
      id: 8,
      name: "Німецька мова",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.4, //
    },
    {
      id: 9,
      name: "Французька мова",
      complexityLevel: subjectComplexityLevels[0],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.4, //
    },
    {
      id: 10,
      name: "Мистецтво",
      complexityLevel: subjectComplexityLevels[3],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 1, //
    },
    {
      id: 11,
      name: "Медицина",
      complexityLevel: subjectComplexityLevels[4],
      recommendedHoursAtOnce: 1,
      complexityScore: 1, //
    },
    {
      id: 12,
      name: "Історія України",
      complexityLevel: subjectComplexityLevels[2],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 1.7, //
    },
    {
      id: 13,
      name: "Всесвітня історія",
      complexityLevel: subjectComplexityLevels[2],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 1.7, //
    },
    {
      id: 14,
      name: "Правознавство",
      complexityLevel: subjectComplexityLevels[2],
      recommendedHoursAtOnce: 1,
      complexityScore: 1.7, //
    },
    {
      id: 15,
      name: "Інформатика",
      complexityLevel: subjectComplexityLevels[1],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5, //
    },
    {
      id: 16,
      name: "Біологія",
      complexityLevel: subjectComplexityLevels[1],
      recommendedHoursAtOnce: 1,
      complexityScore: 3.6, //
    },
    {
      id: 17,
      name: "Хімія",
      complexityLevel: subjectComplexityLevels[2],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.3, //
    },
    {
      id: 18,
      name: "Фізика",
      complexityLevel: subjectComplexityLevels[1],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.2, //
    },
    {
      id: 19,
      name: "Астрономія",
      complexityLevel: subjectComplexityLevels[1],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 5.2, //
    },
    {
      id: 20,
      name: "Фізична культура",
      complexityLevel: subjectComplexityLevels[3],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 2, //
    },
    {
      id: 21,
      name: "ДПЮ",
      complexityLevel: subjectComplexityLevels[3],
      recommendedHoursAtOnce: 1,
      complexityScore: 2, //
    },
    {
      id: 22,
      name: "Трудове навчання",
      complexityLevel: subjectComplexityLevels[3],
      recommendedHoursAtOnce: schoolRecommendedHoursAtOnce,
      complexityScore: 2, //
    },
    {
      id: 23,
      name: "Географія",
      complexityLevel: subjectComplexityLevels[1],
      recommendedHoursAtOnce: 1,
      complexityScore: 2, //
    },
  ];

  const rooms = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ]; // ids !

  let journalId = 1;
  const journals = tableJSON
    .map((row) => {
      let res = [];
      const classesArray = row.classes.split(",");
      for (let currentClass of classesArray) {
        const { currentClassNumber, currentClassLetter, currentClassGroup } =
          parseClass(currentClass);
        res.push({
          id: journalId++,
          classId: classes.find(
            (classListItem) =>
              currentClassNumber === classListItem.number &&
              currentClassLetter === classListItem.letter &&
              currentClassGroup === classListItem.group
          ).id,
          teacherId: teachers.find(({ name }) => name === row.teacher).id,
          subjectId: subjects.filter(
            (subject) => subject.name === row.subject
          )[0].id,
          recommendedHoursAtOnce: subjects.filter(
            (subject) => subject.name === row.subject
          )[0].recommendedHoursAtOnce,
          maxHoursPerDay: 2,
        });
      }
      return [...res];
    })
    .flat();

  console.log("%c journals - ", "color: green", journals);

  let teacherInfoId = 1;
  const teachersInformationForWeek = tableJSON.map((row) => {
    const separatedClasses = row.classes.split(",");
    const classesTableIds = separatedClasses.map((currentClass) => {
      const { currentClassNumber, currentClassLetter, currentClassGroup } =
        parseClass(currentClass);
      return classes.find(
        (classFromList) =>
          currentClassNumber === classFromList.number &&
          currentClassLetter === classFromList.letter &&
          currentClassGroup === classFromList.group
      ).id;
    });

    const hoursPerWeekForClasses = separatedClasses.reduce(
      (acc, currentClass, index) => {
        const { currentClassNumber, currentClassLetter, currentClassGroup } =
          parseClass(currentClass);
        const currentClassId = classes.find(
          ({ number, letter, group }) =>
            number === currentClassNumber &&
            letter === currentClassLetter &&
            group === currentClassGroup
        ).id;
        if (!acc[currentClassId]) {
          acc[currentClassId] = +row.journalHours.split(",")[index];
        }
        return acc;
      },
      {}
    );

    const notDays = row.additional
      ? row.additional.split(",").reduce((acc, day) => {
          const currentDay = { day: days[day - 1] };
          acc.push(currentDay);
          return acc;
        }, [])
      : [];

    const teacher = teachers.find(({ name }) => name === row.teacher);
    const subject = subjects.filter(
      (subject) => subject.name === row.subject
    )[0];

    return {
      id: teacherInfoId++,
      teacherId: teacher.id,
      subjectId: subject.id,
      hoursPerWeek: row.weekHours,
      recommendedHoursAtOnce: subject.recommendedHoursAtOnce,
      classesIds: classesTableIds,
      room: row.room,
      additionalInformation: { notDays }, // also need 'yes'...
      administration: !!row.administration,
      hoursPerWeekForClasses,
    };
  });

  const level4TeachersIds = teachers
    .filter(
      (teacherId) =>
        subjects.find(
          ({ id }) =>
            id ===
            teachersInformationForWeek.find(
              (currTeacher) => currTeacher.teacherId === teacherId
            )?.subjectId
        )?.complexityLevel === subjectComplexityLevels[3]
    )
    .map(({ id }) => id);

  const level4SubjectsQuantityForClasses = classes.map((currentClass) => {
    let currentClassLevel4Quantity = 0;
    for (let level4TeacherId of level4TeachersIds) {
      const teacherClassesIds = teachersInformationForWeek.find(
        ({ teacherId }) => teacherId === level4TeacherId
      ).classesIds;

      if (teacherClassesIds.some(({ id }) => id === currentClass.id)) {
        currentClassLevel4Quantity++;
      }
    }
    return {
      ...currentClass,
      level4Quantity: currentClassLevel4Quantity,
    };
  });

  const priorities = [
    "administration",
    "additional",
    "arts",
    "languages",
    "paired",
    "noRoom",
  ];

  const sortedTeachersInformationForWeek = [...teachersInformationForWeek];
  console.log(
    "%c teachersInformationForWeek - ",
    "color: green",
    teachersInformationForWeek
  );

  sortedTeachersInformationForWeek.sort((a, b) =>
    sortingFunc(b, a, priorities)
  );

  const maxTries = 1000;

  const schedule = {};
  let scheduleForClasses = {};
  let scheduleFreeLessonsForClasses = {};
  let hoursForJournalsLeft = {};

  const hoursPerWeekForTeacherForJournal = {};

  // CHECKS !!!
  (function checkPlannedHoursForTeachers() {
    for (let teacherInformationForWeek of teachersInformationForWeek) {
      const hoursSummaryForTeacher = Object.values(
        teacherInformationForWeek.hoursPerWeekForClasses
      ).reduce((acc, hours) => (acc += hours), 0);

      if (hoursSummaryForTeacher !== +teacherInformationForWeek.hoursPerWeek) {
        console.warn(
          "Bad teacher hours!",
          teacherInformationForWeek.hoursPerWeek,
          hoursSummaryForTeacher
        );
      }
    }
  })();

  (function checkPlannedHoursForClasses() {
    const classesHours = {};
    for (let teacherInformationForWeek of teachersInformationForWeek) {
      for (let classId of Object.keys(
        teacherInformationForWeek.hoursPerWeekForClasses
      )) {
        const currentClass = classes.find(({ id }) => id === +classId);
        const currentClassName = `${currentClass.number}${currentClass.letter}`;
        const currentClassGroup = `${currentClass.group}`;
        if (!classesHours[currentClassName]) {
          classesHours[currentClassName] = {};
        }
        if (!classesHours[currentClassName][currentClassGroup]) {
          classesHours[currentClassName][currentClassGroup] = 0;
        }
        classesHours[currentClassName][currentClassGroup] +=
          teacherInformationForWeek.hoursPerWeekForClasses[classId];
      }
    }
    for (let currentClass of Object.keys(classesHours)) {
      if (
        classesHours[currentClass].full + classesHours[currentClass][1] > 40 ||
        classesHours[currentClass].full + classesHours[currentClass][2] > 40
      ) {
        console.warn(
          "Bad class hours!",
          classesHours[currentClass],
          classesHours[currentClass].full + classesHours[currentClass][1],
          classesHours[currentClass].full + classesHours[currentClass][2]
        );
      }
    }
  })();

  // create primary schedule
  for (let teacherInformationForWeek of sortedTeachersInformationForWeek) {
    for (let journal of journals) {
      if (
        teacherInformationForWeek.teacherId === journal.teacherId &&
        teacherInformationForWeek.classesIds.includes(journal.classId) &&
        teacherInformationForWeek.subjectId === journal.subjectId
      ) {
        if (!schedule[journal.teacherId]) {
          schedule[journal.teacherId] = days.reduce((acc, day) => {
            acc[day] = {};
            return acc;
          }, {});
        }
        scheduleLesson(journal, teacherInformationForWeek);
      }
    }
  }

  console.log("%c Schedule - ", "color: green", schedule);

  console.log(
    "%c hoursForJournalsLeft - ",
    "color: green",
    hoursForJournalsLeft
  );

  // Add rooms if not pointed
  for (let teacherId of Object.keys(schedule)) {
    for (let day of days) {
      let dayRoom;
      for (let lesson of lessons) {
        if (
          schedule[teacherId][day][lesson] &&
          !schedule[teacherId][day][lesson].room
        ) {
          // Get free rooms
          let freeRooms = rooms;
          for (let notCurrentTeacherId of Object.keys(schedule)) {
            if (notCurrentTeacherId === teacherId) {
              continue;
            }
            if (
              schedule[notCurrentTeacherId][day][lesson] &&
              schedule[notCurrentTeacherId][day][lesson].room &&
              freeRooms.includes(
                schedule[notCurrentTeacherId][day][lesson].room
              )
            ) {
              freeRooms = freeRooms.filter(
                (freeRoom) =>
                  freeRoom !== schedule[notCurrentTeacherId][day][lesson].room
              );
            }
          }
          const i = Math.floor(Math.random() * freeRooms.length); //for random room of list
          if (!freeRooms.includes(dayRoom)) {
            dayRoom = freeRooms[i]; //to let teacher stay in one room during the day
          }
          schedule[teacherId][day][lesson].room = dayRoom;
        }
      }
    }
  }

  // create schedule for classes
  buildScheduleForClasses();
  console.log("%c Schedule for classes - ", "color: green", scheduleForClasses);

  // find free lessons for classes
  buildScheduleFreeLessonsForClasses();
  console.log(
    "%c Schedule free lessons for classes - ",
    "color: green",
    scheduleFreeLessonsForClasses
  );

  let recommendedCounter = 0;
  const maxRecommendedCounter = 40;
  let lessCounter = 0;
  const maxLessCounter = 40;

  let recommendedCounterFullClass = 0;
  const maxRecommendedCounterFullClass = 40;
  let lessCounterFullClass = 0;
  const maxLessCounterFullClass = 40;

  if (Object.keys(hoursForJournalsLeft).length) {
    getRidOfWindowsForClassesGroups();

    // use different function to make it step by step
    getRidOfWindowsForClassesFull();

    // paste hours that have left
    const hoursForJournalsLeftFirstTry = hoursForJournalsLeft;
    hoursForJournalsLeft = {};
    for (let teacherInformationForWeek of sortedTeachersInformationForWeek) {
      for (let journal of journals) {
        if (
          teacherInformationForWeek.teacherId === journal.teacherId &&
          teacherInformationForWeek.classesIds.includes(journal.classId) &&
          teacherInformationForWeek.subjectId === journal.subjectId &&
          Object.keys(hoursForJournalsLeftFirstTry).includes(String(journal.id))
        ) {
          if (!schedule[journal.teacherId]) {
            schedule[journal.teacherId] = days.reduce((acc, day) => {
              acc[day] = {};
              return acc;
            }, {});
          }

          const { journalCounterPerWeek, level4CounterPerWeek } =
            hoursForJournalsLeftFirstTry[journal.id];

          scheduleLesson(
            journal,
            teacherInformationForWeek,
            journalCounterPerWeek,
            level4CounterPerWeek
          );
        }
      }
    }
  }

  // max hours for teachers
  const maxHoursForTeachers = Object.keys(hoursForJournalsLeft).reduce(
    (acc, journalId) => {
      const { teacherId } = journals.find(({ id }) => +journalId === id);
      const currentTeacherInfo = teachersInformationForWeek.filter(
        (teacherInfo) => teacherInfo.teacherId === teacherId
      );
      const currentTeacherAllHours = currentTeacherInfo.reduce(
        (hoursAcc, subjectHours) => {
          hoursAcc += +subjectHours.hoursPerWeek;
          return hoursAcc;
        },
        0
      );
      acc[teacherId] = currentTeacherAllHours;
      return acc;
    },
    {}
  );

  console.log("%c maxHoursForTeachers - ", "color: green", maxHoursForTeachers);
  console.log("%c Schedule FINAL - ", "color: green", schedule);
  console.log(
    "%c hoursForJournalsLeft FINAL - ",
    "color: green",
    hoursForJournalsLeft
  );
  console.log(
    "%c Schedule for classes FINAL - ",
    "color: green",
    scheduleForClasses
  );
  console.log(
    "%c Schedule free lessons for classes FINAL - ",
    "color: green",
    scheduleFreeLessonsForClasses
  );

  // prepare TABLES for view
  const borderStyle =
    'style="border: 1px solid black; border-collapse: collapse; min-width: 20px; padding: 2px;"';
  const headerStyle = 'style="font-weight: 700; background-color: wheat"';
  const colSpan = 'colspan="8"';

  const daysHeader = days.reduce((acc, day) => {
    return (acc += `<td ${borderStyle} ${colSpan}>${day.toUpperCase()}</td>`);
  }, "");

  const lessonsHeader = buildLessonsHeader();

  const resTeacherTable = buildResTeacherTable();

  const teacherTable = `<table ${borderStyle}><tbody><thead ${headerStyle}>
        <tr>
        <td ${borderStyle} rowspan="2">Teacher</td>
        ${daysHeader}
        <td ${borderStyle}>Hours</td>
        </tr>
        <tr>
        ${lessonsHeader}
        <td ${borderStyle}></td>
        </tr>
        </thead>
        ${resTeacherTable}
        </tbody>
    </table>`;

  const resClassTable = buildResClassTable();

  const classTable = `<table ${borderStyle}><tbody><thead ${headerStyle}>
        <tr>
        <td ${borderStyle} rowspan="2">Class</td>
        ${daysHeader}
        </tr>
        <tr>
        ${lessonsHeader}
        </tr>
        </thead>
        ${resClassTable}
        </tbody>
    </table>`;

  const div = document.getElementsByClassName("main")[0];
  postMessage("<p>TEACHER TABLE</p>" +
    teacherTable +
    "<br><p>CLASS TABLE</p>" +
    classTable);
  // div.innerHTML +=
  //   "<p>TEACHER TABLE</p>" +
  //   teacherTable +
  //   "<br><p>CLASS TABLE</p>" +
  //   classTable;
  
  const end = performance.now();
  console.log("TIME - ", end-start);

  function buildScheduleForClasses() {
    scheduleForClasses = {};
    const scheduleTeachers = teachers.filter(({ id }) =>
      Object.keys(schedule).includes(id)
    );
    for (let teacher of scheduleTeachers) {
      // teachers
      for (let currentClass of classes) {
        if (
          !scheduleForClasses[`${currentClass.number}${currentClass.letter}`]
        ) {
          scheduleForClasses[`${currentClass.number}${currentClass.letter}`] = {
            1: {},
            2: {},
            full: {},
          };
        }

        for (let group of Object.keys(
          scheduleForClasses[`${currentClass.number}${currentClass.letter}`]
        )) {
          for (let day of days) {
            if (
              !scheduleForClasses[
                `${currentClass.number}${currentClass.letter}`
              ][group][day]
            ) {
              scheduleForClasses[
                `${currentClass.number}${currentClass.letter}`
              ][group][day] = {};
            }
            for (let lesson of lessons) {
              if (
                scheduleForClasses[
                  `${currentClass.number}${currentClass.letter}`
                ][group][day][lesson]
              ) {
                continue;
              }
              if (schedule[teacher.id][day][lesson]) {
                const scheduleJournal = getJournalOfLesson(
                  schedule[teacher.id][day][lesson]
                );
                const scheduleClassId = getClassOfJournal(scheduleJournal).id;
                const subject = getSubjectOfJournal(scheduleJournal);

                if (
                  scheduleClassId === currentClass.id &&
                  group == currentClass.group
                ) {
                  if (
                    !scheduleForClasses[
                      `${currentClass.number}${currentClass.letter}`
                    ][group].currentClassId
                  ) {
                    scheduleForClasses[
                      `${currentClass.number}${currentClass.letter}`
                    ][group].currentClassId = scheduleClassId;
                  }

                  scheduleForClasses[
                    `${currentClass.number}${currentClass.letter}`
                  ][group][day][lesson] = {
                    teacher: teachers.find(({ id }) => id === teacher.id).name,
                    teacherId: teacher.id,
                    subject,
                    room: schedule[teacher.id][day][lesson].room,
                  };
                }
              }
            }
          }
        }
      }
    }
  }

  function buildScheduleFreeLessonsForClasses() {
    scheduleFreeLessonsForClasses = {};
    for (let currentClass of Object.keys(scheduleForClasses)) {
      if (!scheduleFreeLessonsForClasses[currentClass]) {
        scheduleFreeLessonsForClasses[currentClass] = {};
      }
      for (let group of Object.keys(scheduleForClasses[currentClass])) {
        if (!scheduleFreeLessonsForClasses[currentClass][group]) {
          scheduleFreeLessonsForClasses[currentClass][group] = {
            currentClassId:
              scheduleForClasses[currentClass][group].currentClassId,
          };
        }
        for (let day of days) {
          if (!scheduleFreeLessonsForClasses[currentClass][group][day]) {
            scheduleFreeLessonsForClasses[currentClass][group][day] = {};
          }
          for (let lesson of lessons) {
            if (!scheduleForClasses[currentClass]["full"][day][lesson]) {
              if (
                group === "full" &&
                !scheduleForClasses[currentClass][1][day][lesson] &&
                !scheduleForClasses[currentClass][2][day][lesson]
              ) {
                scheduleFreeLessonsForClasses[currentClass][group][day][
                  lesson
                ] = true;
              }
              if (
                group === "1" &&
                !scheduleForClasses[currentClass][1][day][lesson]
              ) {
                scheduleFreeLessonsForClasses[currentClass][group][day][
                  lesson
                ] = true;
              }
              if (
                group === "2" &&
                !scheduleForClasses[currentClass][2][day][lesson]
              ) {
                scheduleFreeLessonsForClasses[currentClass][group][day][
                  lesson
                ] = true;
              }
            }
          }
        }
      }
    }
  }

  function getRidOfWindowsForClassesGroups() {
    for (let currentClass of Object.keys(scheduleFreeLessonsForClasses)) {
      for (let group of Object.keys(
        scheduleFreeLessonsForClasses[currentClass]
      )) {
        for (let day of days) {
          for (let lesson of Object.keys(
            scheduleFreeLessonsForClasses[currentClass][group][day]
          )) {
            let freeLessonsAtOnceCurrentGroup = 0;
            let nextFreeLesson = 0;

            // use "if" because we have also group "full"
            

            const moveLessons = (currentGroup) => {
              // windows for current group
              const otherGroup = currentGroup === 1 ? 2 : 1;
              while (
                +lesson + nextFreeLesson < lessons.length &&
                scheduleFreeLessonsForClasses[currentClass][group][day][
                  String(+lesson + nextFreeLesson)
                ] &&
                scheduleFreeLessonsForClasses[currentClass]["full"][day][
                  String(+lesson + nextFreeLesson)
                ] &&
                scheduleForClasses[currentClass][otherGroup][day][
                  String(+lesson + nextFreeLesson)
                ]
              ) {
                freeLessonsAtOnceCurrentGroup++;
                nextFreeLesson++;
              }

              if (
                freeLessonsAtOnceCurrentGroup >= schoolRecommendedHoursAtOnce
              ) {
                // find lessons only for current group
                for (let findLessonDay of days) {
                  findLessonLoopCurrentGroup: for (let findLessonLesson of lessons) {
                    let lessonsAtOnceCurrentGroup = 0;
                    let nextLesson = 0;
                    let findLessonTeacherId;

                    if (
                      scheduleForClasses[currentClass][currentGroup][
                        findLessonDay
                      ][findLessonLesson]
                    ) {
                      findLessonTeacherId =
                        scheduleForClasses[currentClass][currentGroup][
                          findLessonDay
                        ][findLessonLesson].teacherId;
                    } else {
                      continue;
                    }

                    while (
                      +findLessonLesson + nextLesson < lessons.length &&
                      scheduleForClasses[currentClass][currentGroup][
                        findLessonDay
                      ][String(+findLessonLesson + nextLesson)] &&
                      !scheduleForClasses[currentClass][otherGroup][
                        findLessonDay
                      ][String(+findLessonLesson + nextLesson)]
                    ) {
                      if (
                        nextLesson &&
                        schedule[findLessonTeacherId][findLessonDay] &&
                        schedule[findLessonTeacherId][findLessonDay][
                          findLessonLesson
                        ] &&
                        schedule[findLessonTeacherId][findLessonDay][
                          String(+findLessonLesson + nextLesson)
                        ] &&
                        schedule[findLessonTeacherId][findLessonDay][
                          findLessonLesson
                        ].journalId !==
                          schedule[findLessonTeacherId][findLessonDay][
                            String(+findLessonLesson + nextLesson)
                          ].journalId
                      ) {
                        break;
                      }
                      lessonsAtOnceCurrentGroup++;
                      nextLesson++;
                    }

                    if (
                      lessonsAtOnceCurrentGroup >= schoolRecommendedHoursAtOnce
                    ) {
                      if (recommendedCounter > maxRecommendedCounter) {
                        break findLessonLoopCurrentGroup;
                      }

                      for (let i = 0; i < lessonsAtOnceCurrentGroup; i++) {
                        if (
                          !canTeacherHaveLesson(
                            findLessonTeacherId,
                            day,
                            String(+lesson + i)
                          )
                        ) {
                          continue findLessonLoopCurrentGroup;
                        }
                      }

                      for (let i = 0; i < lessonsAtOnceCurrentGroup; i++) {
                        schedule[findLessonTeacherId][day][
                          String(+lesson + i)
                        ] =
                          schedule[findLessonTeacherId][findLessonDay][
                            String(+findLessonLesson + i)
                          ];
                        delete schedule[findLessonTeacherId][findLessonDay][
                          String(+findLessonLesson + i)
                        ]; // = null;
                      }

                      recommendedCounter++;

                      buildScheduleForClasses();
                      buildScheduleFreeLessonsForClasses();
                      getRidOfWindowsForClassesGroups();
                    }
                  }
                }
              } else if (freeLessonsAtOnceCurrentGroup) {
                // if we have free lessons at once less than recommended for school

                // find lessons only for current group
                findFreeLessonsLoop: for (let findLessonDay of days) {
                  findLessonLoopCurrentGroupLessLessons: for (let findLessonLesson of lessons) {
                    let lessonsAtOnceCurrentGroup = 0;
                    let nextLesson = 0;
                    let findLessonTeacherId;

                    if (
                      scheduleForClasses[currentClass][currentGroup][
                        findLessonDay
                      ][findLessonLesson]
                    ) {
                      findLessonTeacherId =
                        scheduleForClasses[currentClass][currentGroup][
                          findLessonDay
                        ][findLessonLesson].teacherId;
                    } else {
                      continue;
                    }

                    while (
                      +findLessonLesson + nextLesson < lessons.length &&
                      scheduleForClasses[currentClass][currentGroup][
                        findLessonDay
                      ][String(+findLessonLesson + nextLesson)] &&
                      !scheduleForClasses[currentClass][otherGroup][
                        findLessonDay
                      ][String(+findLessonLesson + nextLesson)]
                    ) {
                      if (
                        nextLesson &&
                        schedule[findLessonTeacherId][findLessonDay] &&
                        schedule[findLessonTeacherId][findLessonDay][
                          findLessonLesson
                        ] &&
                        schedule[findLessonTeacherId][findLessonDay][
                          String(+findLessonLesson + nextLesson)
                        ] &&
                        schedule[findLessonTeacherId][findLessonDay][
                          findLessonLesson
                        ].journalId !==
                          schedule[findLessonTeacherId][findLessonDay][
                            String(+findLessonLesson + nextLesson)
                          ].journalId
                      ) {
                        break;
                      }
                      lessonsAtOnceCurrentGroup++;
                      nextLesson++;
                    }

                    if (
                      lessonsAtOnceCurrentGroup <= freeLessonsAtOnceCurrentGroup
                    ) {
                      if (lessCounter > maxLessCounter) {
                        break findFreeLessonsLoop;
                      }

                      for (let i = 0; i < lessonsAtOnceCurrentGroup; i++) {
                        if (
                          !canTeacherHaveLesson(
                            findLessonTeacherId,
                            day,
                            String(+lesson + i)
                          )
                        ) {
                          continue findLessonLoopCurrentGroupLessLessons;
                        }
                      }

                      for (let i = 0; i < lessonsAtOnceCurrentGroup; i++) {
                        schedule[findLessonTeacherId][day][
                          String(+lesson + i)
                        ] =
                          schedule[findLessonTeacherId][findLessonDay][
                            String(+findLessonLesson + i)
                          ];
                        delete schedule[findLessonTeacherId][findLessonDay][
                          String(+findLessonLesson + i)
                        ]; // = null;
                      }

                      lessCounter++;

                      buildScheduleForClasses();
                      buildScheduleFreeLessonsForClasses();
                      getRidOfWindowsForClassesGroups();
                    }
                  }
                }
              }
            };
            if (group === "1") {
              moveLessons(1);
            }

            if (group === "2") {
              moveLessons(2);
            }
          }
        }
      }
    }
  }

  function getRidOfWindowsForClassesFull() {
    for (let currentClass of Object.keys(scheduleFreeLessonsForClasses)) {
      // for (let group of Object.keys(scheduleFreeLessonsForClasses[currentClass])) {
      const group = "full";
      daysLoop: for (let day of days) {
        for (let lesson of Object.keys(
          scheduleFreeLessonsForClasses[currentClass][group][day]
        )) {
          let freeLessonsAtOnceFullClass = 0;
          let nextFreeLesson = 0;
          let lastWindowLesson = 0;
          let isWindowInside = false; // is window really window (or it is free LAST lessons)

          // windows for full class
          while (
            +lesson + nextFreeLesson < lessons.length &&
            !scheduleForClasses[currentClass]["full"][day][
              String(+lesson + nextFreeLesson)
            ] &&
            !scheduleForClasses[currentClass][1][day][
              String(+lesson + nextFreeLesson)
            ] &&
            !scheduleForClasses[currentClass][2][day][
              String(+lesson + nextFreeLesson)
            ]
          ) {
            freeLessonsAtOnceFullClass++;
            nextFreeLesson++;
            lastWindowLesson = +lesson + nextFreeLesson;
          }

          // is it window? (are there any lessons after it)
          for (let i = lastWindowLesson + 1; i < lessons.length; i++) {
            if (
              scheduleForClasses[currentClass][1][day][i] ||
              scheduleForClasses[currentClass][2][day][i] ||
              scheduleForClasses[currentClass]["full"][day][i]
            ) {
              isWindowInside = true;
            }
          }

          if (!isWindowInside) {
            continue daysLoop;
          }

          if (freeLessonsAtOnceFullClass >= schoolRecommendedHoursAtOnce) {
            // find lessons only for current group
            for (let findLessonDay of days) {
              findLessonLoopFullClass: for (let findLessonLesson of lessons) {
                let lessonsAtOnceFullClass = 0;
                let nextLesson = 0;
                let findLessonTeacherId;
                let lastLessonInDay = 0;
                let isLessonLast = true;

                if (
                  scheduleForClasses[currentClass][group][findLessonDay][
                    findLessonLesson
                  ]
                ) {
                  findLessonTeacherId =
                    scheduleForClasses[currentClass][group][findLessonDay][
                      findLessonLesson
                    ].teacherId;
                } else {
                  continue findLessonLoopFullClass;
                }

                while (
                  +findLessonLesson + nextLesson < lessons.length &&
                  scheduleForClasses[currentClass][group][findLessonDay][
                    String(+findLessonLesson + nextLesson)
                  ]
                ) {
                  if (
                    nextLesson &&
                    schedule[findLessonTeacherId][findLessonDay] &&
                    schedule[findLessonTeacherId][findLessonDay][
                      findLessonLesson
                    ] &&
                    schedule[findLessonTeacherId][findLessonDay][
                      String(+findLessonLesson + nextLesson)
                    ] &&
                    schedule[findLessonTeacherId][findLessonDay][
                      findLessonLesson
                    ].journalId !==
                      schedule[findLessonTeacherId][findLessonDay][
                        String(+findLessonLesson + nextLesson)
                      ].journalId
                  ) {
                    break;
                  }
                  lessonsAtOnceFullClass++;
                  nextLesson++;
                  lastLessonInDay = +findLessonLesson + nextLesson;
                }

                // is lesson last in day
                for (let i = lessons.length; i >= lastLessonInDay; i--) {
                  if (
                    scheduleForClasses[currentClass][1][day][i] ||
                    scheduleForClasses[currentClass][2][day][i] ||
                    scheduleForClasses[currentClass]["full"][day][i]
                  ) {
                    isLessonLast = false;
                  }
                }

                if (isLessonLast) {
                  continue findLessonLoopFullClass;
                }

                if (lessonsAtOnceFullClass >= schoolRecommendedHoursAtOnce) {
                  if (
                    recommendedCounterFullClass > maxRecommendedCounterFullClass
                  ) {
                    break findLessonLoopFullClass;
                  }

                  for (let i = 0; i < lessonsAtOnceFullClass; i++) {
                    if (
                      !canTeacherHaveLesson(
                        findLessonTeacherId,
                        day,
                        String(+lesson + i)
                      )
                    ) {
                      continue findLessonLoopFullClass;
                    }
                  }

                  for (let i = 0; i < lessonsAtOnceFullClass; i++) {
                    schedule[findLessonTeacherId][day][String(+lesson + i)] =
                      schedule[findLessonTeacherId][findLessonDay][
                        String(+findLessonLesson + i)
                      ];
                    delete schedule[findLessonTeacherId][findLessonDay][
                      String(+findLessonLesson + i)
                    ]; // = null;
                  }

                  recommendedCounterFullClass++;

                  buildScheduleForClasses();
                  buildScheduleFreeLessonsForClasses();
                  getRidOfWindowsForClassesFull();
                }
              }
            }
          } else if (freeLessonsAtOnceFullClass) {
            // if we have free lessons at once less than recommended for school

            // find lessons only for current group
            findFreeLessonsLoop: for (let findLessonDay of days) {
              findLessonLoopFullClassLessLessons: for (let findLessonLesson of lessons) {
                let lessonsAtOnceFullClass = 0;
                let nextLesson = 0;
                let findLessonTeacherId;
                let lastLessonInDay = 0;
                let isLessonLast = true;

                if (
                  scheduleForClasses[currentClass][group][findLessonDay][
                    findLessonLesson
                  ]
                ) {
                  findLessonTeacherId =
                    scheduleForClasses[currentClass][group][findLessonDay][
                      findLessonLesson
                    ].teacherId;
                } else {
                  continue findLessonLoopFullClassLessLessons;
                }

                while (
                  +findLessonLesson + nextLesson < lessons.length &&
                  scheduleForClasses[currentClass][group][findLessonDay][
                    String(+findLessonLesson + nextLesson)
                  ]
                ) {
                  if (
                    nextLesson &&
                    schedule[findLessonTeacherId][findLessonDay] &&
                    schedule[findLessonTeacherId][findLessonDay][
                      findLessonLesson
                    ] &&
                    schedule[findLessonTeacherId][findLessonDay][
                      String(+findLessonLesson + nextLesson)
                    ] &&
                    schedule[findLessonTeacherId][findLessonDay][
                      findLessonLesson
                    ].journalId !==
                      schedule[findLessonTeacherId][findLessonDay][
                        String(+findLessonLesson + nextLesson)
                      ].journalId
                  ) {
                    break;
                  }
                  lessonsAtOnceFullClass++;
                  nextLesson++;
                  lastLessonInDay = +findLessonLesson + nextLesson;
                }

                // is lesson last in day
                for (let i = lessons.length; i >= lastLessonInDay; i--) {
                  if (
                    scheduleForClasses[currentClass][1][day][i] ||
                    scheduleForClasses[currentClass][2][day][i] ||
                    scheduleForClasses[currentClass]["full"][day][i]
                  ) {
                    isLessonLast = false;
                  }
                }

                if (!isLessonLast) {
                  continue findLessonLoopFullClassLessLessons;
                }

                if (lessonsAtOnceFullClass <= freeLessonsAtOnceFullClass) {
                  if (lessCounterFullClass > maxLessCounterFullClass) {
                    break findFreeLessonsLoop;
                  }

                  for (let i = 0; i < lessonsAtOnceFullClass; i++) {
                    if (
                      !canTeacherHaveLesson(
                        findLessonTeacherId,
                        day,
                        String(+lesson + i)
                      )
                    ) {
                      break findLessonLoopFullClassLessLessons;
                    }
                  }

                  for (let i = 0; i < lessonsAtOnceFullClass; i++) {
                    schedule[findLessonTeacherId][day][String(+lesson + i)] =
                      schedule[findLessonTeacherId][findLessonDay][
                        String(+findLessonLesson + i)
                      ];
                    delete schedule[findLessonTeacherId][findLessonDay][
                      String(+findLessonLesson + i)
                    ]; // = null;
                  }

                  lessCounterFullClass++;

                  buildScheduleForClasses();
                  buildScheduleFreeLessonsForClasses();
                  getRidOfWindowsForClassesFull();
                }
              }
            }
          }
        }
        // }
      }
    }
  }

  function buildLessonsHeader() {
    return days.reduce((acc) => {
      const lessonsCells = lessons.reduce((lessonAcc, lesson) => {
        lessonAcc += `<td ${borderStyle}>${lesson}</td>`;
        return lessonAcc;
      }, "");
      return (acc += lessonsCells);
    }, "");
  }

  function buildResTeacherTable() {
    return Object.keys(schedule).reduce((resAcc, teacherId) => {
      const teacherHours = {
        weekHours: 0,
        parallelsHours: {},
      };

      const teacherRes = Object.keys(schedule[teacherId]).reduce(
        (teacherAcc, day) => {
          const dayIndex = days.findIndex((currDay) => currDay === day);
          const dayCellStyle =
            Math.floor(dayIndex / 2) === dayIndex / 2
              ? borderStyle.slice(0, -1) + ' background-color: oldLace"'
              : borderStyle;

          const dayRes = lessons.reduce((dayAcc, lesson) => {
            // get hours
            // form lesson data
            let lessonRes = `<td ${dayCellStyle}></td>`;
            if (schedule[teacherId][day][lesson]) {
              const currentJournal = getJournalOfLesson(
                schedule[teacherId][day][lesson]
              );
              const currentSubject = getSubjectOfJournal(currentJournal);
              const classNumber = getClassOfJournal(currentJournal).number;
              const classLetter = getClassOfJournal(currentJournal).letter;
              const classGroup = getClassOfJournal(currentJournal).group;

              teacherHours.weekHours++;

              if (!teacherHours.parallelsHours[classNumber]) {
                teacherHours.parallelsHours[classNumber] = {};
              }
              if (!teacherHours.parallelsHours[classNumber][classLetter]) {
                teacherHours.parallelsHours[classNumber][classLetter] = 1;
              } else {
                teacherHours.parallelsHours[classNumber][classLetter]++;
              }

              lessonRes = `<td ${dayCellStyle}>
                        <span style="color: brown">${
                          currentSubject.name
                        }</span><br>
                        ${classNumber}-${classLetter.toUpperCase()}
                        ${!isNaN(classGroup) ? "-" + classGroup : ""}<br>
                        <span style="color: darkGray">${
                          schedule[teacherId][day][lesson].room || "#"
                        } каб.
                        </td>`;
            }
            return (dayAcc += lessonRes);
          }, "");
          return (teacherAcc += dayRes);
        },
        ""
      );

      const parallelHours = Object.keys(teacherHours.parallelsHours).reduce(
        (hoursAcc, parallel) => {
          const classLetterHours = Object.keys(
            teacherHours.parallelsHours[parallel]
          ).reduce(
            (letterAcc, letter) =>
              (letterAcc += `<strong>${letter.toUpperCase()}-</strong>${
                teacherHours.parallelsHours[parallel][letter]
              },`),
            ""
          );
          return (hoursAcc += `<strong>${parallel}:</strong>${classLetterHours}<br>`);
        },
        ""
      );

      const ofTotalHours = maxHoursForTeachers[teacherId]
        ? `<span style="color: red"> / ${maxHoursForTeachers[teacherId]}</span>`
        : "";

      const hours = `<strong>total:</strong> ${teacherHours.weekHours}${ofTotalHours}<br>${parallelHours}`;
      const teacherName = teachers.find(({ id }) => id === teacherId).name;

      return (resAcc += `<tr><td ${borderStyle}><strong>${teacherName}</strong></td>${teacherRes}<td ${borderStyle}>${hours}</td></tr>`);
    }, "");
  }

  function buildResClassTable() {
    return Object.keys(scheduleForClasses).reduce((resAcc, currentClass) => {
      const classResNotGroup2 = Object.keys(
        scheduleForClasses[currentClass].full
      ).reduce((classAcc, day) => {
        if (day !== "currentClassId") {
          const dayIndex = days.findIndex((currDay) => currDay === day);
          const dayCellStyle =
            Math.floor(dayIndex / 2) === dayIndex / 2
              ? borderStyle.slice(0, -1) + ' background-color: oldLace"'
              : borderStyle;

          const dayRes = lessons.reduce((dayAcc, lesson) => {
            let lessonRes = `<td ${dayCellStyle} rowspan="2"></td>`;

            if (scheduleForClasses[currentClass].full[day][lesson]) {
              lessonRes = `<td ${dayCellStyle} rowspan="2">
                        <span style="color: brown">${
                          scheduleForClasses[currentClass].full[day][lesson]
                            .subject.name
                        }</span><br>
                        ${
                          scheduleForClasses[currentClass].full[day][lesson]
                            .teacher
                        }<br>
                        <span style="color: darkGray">${
                          scheduleForClasses[currentClass].full[day][lesson]
                            .room || "#"
                        } каб.
                        </td>`;
            } else if (scheduleForClasses[currentClass][1][day][lesson]) {
              lessonRes = `<td ${dayCellStyle}>
                    <span style="color: brown">${
                      scheduleForClasses[currentClass][1][day][lesson].subject
                        .name
                    }</span><br>
                    ${
                      scheduleForClasses[currentClass][1][day][lesson].teacher
                    }<br>
                    <span style="color: darkGray">${
                      scheduleForClasses[currentClass][1][day][lesson].room ||
                      "#"
                    } каб.
                    </td>`;
            } else if (scheduleForClasses[currentClass][2][day][lesson]) {
              lessonRes = `<td ${dayCellStyle}></td>`;
            }
            return (dayAcc += lessonRes);
          }, "");
          return (classAcc += dayRes);
        } else return classAcc;
      }, "");

      const classResGroup2 = Object.keys(
        scheduleForClasses[currentClass][2]
      ).reduce((classAcc, day) => {
        if (day !== "currentClassId") {
          const dayIndex = days.findIndex((currDay) => currDay === day);

          const dayCellStyle =
            Math.floor(dayIndex / 2) === dayIndex / 2
              ? borderStyle.slice(0, -1) + ' background-color: oldLace"'
              : borderStyle;

          const dayRes = lessons.reduce((dayAcc, lesson) => {
            const group2AbsentCell = scheduleForClasses[currentClass][1][day][
              lesson
            ]
              ? `<td ${dayCellStyle}></td>`
              : "";

            const lessonRes = scheduleForClasses[currentClass][2][day][lesson]
              ? `<td ${dayCellStyle}>
                        <span style="color: brown">${
                          scheduleForClasses[currentClass][2][day][lesson]
                            .subject.name
                        }</span><br>
                        ${
                          scheduleForClasses[currentClass][2][day][lesson]
                            .teacher
                        }<br>
                        <span style="color: darkGray">${
                          scheduleForClasses[currentClass][2][day][lesson]
                            .room || "#"
                        } каб.
                        </td>`
              : group2AbsentCell;

            return (dayAcc += lessonRes);
          }, "");

          return (classAcc += dayRes);
        } else return classAcc;
      }, "");

      resAcc += `<tr><td ${borderStyle} rowspan="2"><strong>${currentClass}</strong></td>${classResNotGroup2}</tr>
                    <tr>${classResGroup2}</tr>`;

      return resAcc;
    }, "");
  }

  function getClassOfJournal({ classId }) {
    return classes.find(({ id }) => id === classId);
  }

  function getSubjectOfJournal({ subjectId }) {
    return subjects.find(({ id }) => id === subjectId);
  }

  function getTeacherOfJournal({ teacherId }) {
    return teachers.find(({ id }) => id === teacherId);
  }

  function getJournalOfLesson({ journalId }) {
    return journals.find(({ id }) => id === journalId);
  }

  function sortingFunc(a, b, sortingBy, i = 0) {
    if (comparing(a, b, sortingBy[i], "more")) {
      return 1;
    } else if (comparing(a, b, sortingBy[i], "less")) {
      return -1;
    } else if (
      comparing(a, b, sortingBy[i], "eq") &&
      i < sortingBy.length - 1
    ) {
      return sortingFunc(a, b, sortingBy, ++i);
    } else return 0;
  }

  function comparing(a, b, sortingValue, compareIndex) {
    const { newObj1, newObj2 } = sortingCriteria(a, b, sortingValue);

    switch (compareIndex) {
      case "more":
        return newObj1 > newObj2;
      case "eq":
        return newObj1 === newObj2;
      case "less":
        return newObj1 < newObj2;
      default:
        return newObj1 > newObj2;
    }
  }

  function sortingCriteria(a, b, sortingValue) {
    switch (sortingValue) {
      case "administration":
        return {
          newObj1: !!a.administration,
          newObj2: !!b.administration,
        };
      case "additional":
        let newObj1 = false;
        let newObj2 = false;

        for (let info of Object.keys(a.additionalInformation)) {
          if (a.additionalInformation[info].length) {
            newObj1 = true;
            break;
          }
        }

        for (let info of Object.keys(b.additionalInformation)) {
          if (b.additionalInformation[info].length) {
            newObj2 = true;
            break;
          }
        }

        return {
          newObj1,
          newObj2,
        };
      case "arts":
        return {
          newObj1:
            getSubjectOfJournal(a).complexityLevel ===
            subjectComplexityLevels[3],
          newObj2:
            getSubjectOfJournal(b).complexityLevel ===
            subjectComplexityLevels[3],
        };
      case "languages":
        return {
          newObj1:
            getSubjectOfJournal(a).complexityLevel ===
            subjectComplexityLevels[0],
          newObj2:
            getSubjectOfJournal(b).complexityLevel ===
            subjectComplexityLevels[0],
        };
      case "paired":
        return {
          newObj1: b.recommendedHoursAtOnce % 2,
          newObj2: a.recommendedHoursAtOnce % 2,
        };
      case "noRooms":
        return {
          newObj1: !!a.room,
          newObj2: !!b.room,
        };
      default:
        return {
          newObj1:
            a.additionalInformation &&
            Object.keys(a.additionalInformation).length,
          newObj2:
            b.additionalInformation &&
            Object.keys(b.additionalInformation).length,
        };
    }
  }

  function canTeacherHaveLesson(id, day, lesson) {
    const teacherInfo = teachersInformationForWeek.find(
      ({ teacherId }) => teacherId === id
    ).additionalInformation;
    if (
      schedule[id][day][lesson] ||
      // also needs 'not lessons', 'yes days' and 'yes lessons'
      (teacherInfo && teacherInfo.notDays && teacherInfo.notDays.includes(day))
    ) {
      return false;
    }
    return true;
  }

  // puts journal in schedule for whole week
  function scheduleLesson(
    journal,
    teacherInformationForWeek,
    journalCounterPerWeek = 0,
    level4CounterPerWeek = 0,
    randomizeDays = false
  ) {
    const areWeekDaysForClassFilled = days.reduce((acc, day) => {
      acc[day] = false;
      return acc;
    }, {});

    // let outOfRoomPair = false; // ???

    const journalClass = getClassOfJournal(journal);
    const journalSubject = getSubjectOfJournal(journal);

    const hoursPerWeekForParallel =
      teacherInformationForWeek.hoursPerWeekForClasses[journalClass.id];

    let workingDaysOfWeekForJournal = days; // create separate function!!!
    // for excluded days
    if (
      teacherInformationForWeek.additionalInformation &&
      teacherInformationForWeek.additionalInformation.notDays &&
      teacherInformationForWeek.additionalInformation.notDays.length
    ) {
      for (let notDay of teacherInformationForWeek.additionalInformation
        .notDays) {
        if (!notDay.lessons || (notDay.lessons && !notDay.lessons.length)) {
          workingDaysOfWeekForJournal = workingDaysOfWeekForJournal.filter(
            (day) => notDay.day !== day
          );
        }
      }
    }

    // for included days
    if (
      teacherInformationForWeek.additionalInformation &&
      teacherInformationForWeek.additionalInformation.yesDays &&
      teacherInformationForWeek.additionalInformation.yesDays.length
    ) {
      workingDaysOfWeekForJournal = [];
      for (let yesDay of teacherInformationForWeek.additionalInformation
        .yesDays) {
        workingDaysOfWeekForJournal.push(yesDay.day);
      }
    }

    // productivity days order !!!
    const currentPupilProductivity =
      journalSubject.recommendedHoursAtOnce === 1
        ? pupilProductivity[journalClass.number]
        : pupilProductivityForPairedLessons[journalClass.number];
    // for easy subjects
    if (journalSubject.complexityLevel === subjectComplexityLevels[3]) {
      const neutralDays = workingDaysOfWeekForJournal
        .filter(
          (el) =>
            !currentPupilProductivity.notProductiveDays.some(
              (day) => day === el
            )
        )
        .filter(
          (el) =>
            !currentPupilProductivity.productiveDays.some((day) => day === el)
        );
      workingDaysOfWeekForJournal = [
        ...currentPupilProductivity.notProductiveDays,
        ...currentPupilProductivity.productiveDays,
        ...neutralDays,
      ];
    }
    // for complex subjects
    if (journalSubject.complexityLevel === subjectComplexityLevels[0]) {
      const neutralDays = workingDaysOfWeekForJournal
        .filter(
          (el) =>
            !currentPupilProductivity.notProductiveDays.some(
              (day) => day === el
            )
        )
        .filter(
          (el) =>
            !currentPupilProductivity.productiveDays.some((day) => day === el)
        );
      workingDaysOfWeekForJournal = [
        ...currentPupilProductivity.productiveDays,
        ...neutralDays,
        ...currentPupilProductivity.notProductiveDays,
      ];
    }

    // for every day in week
    daysInWeekLoop: for (let day of workingDaysOfWeekForJournal) {
      // check if class has free lessons in day
      buildScheduleForClasses();

      let classFilledLessonsCounter = 0;

      for (let lesson of lessons) {
        if (
          scheduleForClasses[`${journalClass.number}${journalClass.letter}`][
            journalClass.group
          ][day][lesson] ||
          (journalClass.group !== "full" &&
            scheduleForClasses[`${journalClass.number}${journalClass.letter}`][
              "full"
            ][day][lesson])
        ) {
          classFilledLessonsCounter++;
        }
      }

      if (
        (lessons.length - classFilledLessonsCounter) /
          journal.recommendedHoursAtOnce <
        1
      ) {
        areWeekDaysForClassFilled[day] = true;
        // console.warn(day.toUpperCase(), ' in ', journalClass, 'class is FULL!');
        continue;
      }

      const allWeekDaysForClassFilled = !Object.values(
        areWeekDaysForClassFilled
      ).some((dayFilled) => dayFilled === false);
      if (allWeekDaysForClassFilled) {
        console.warn("All days for ", journalClass, " class are full!");
        console.warn("Maybe something is wrong with income data!");

        break daysInWeekLoop;
      }

      // Random day choose for lesson if have place left for it till week ends
      if (randomizeDays) {
        const possibleDaysForJournalLeft = Math.ceil(
          (hoursPerWeekForParallel - journalCounterPerWeek) /
            journal.maxHoursPerDay
        );
        const workingDaysOfWeekLeft =
          workingDaysOfWeekForJournal.length -
          workingDaysOfWeekForJournal.findIndex(
            (currentDay) => currentDay === day
          );
        if (!journal.tryCounter) {
          journal.tryCounter = 1;
        }
        if (
          journal.tryCounter < maxTries / 2 &&
          workingDaysOfWeekLeft > possibleDaysForJournalLeft &&
          Math.random() > (0.5 * possibleDaysForJournalLeft) / 5
        )
          continue;
      }

      let journalCounterAtOnce = 0;
      let journalCounterPerDay = 0;

      let workingLessonsForJournalForDay = lessons;
      // for excluded lessons
      if (
        teacherInformationForWeek.additionalInformation &&
        teacherInformationForWeek.additionalInformation.notDays &&
        teacherInformationForWeek.additionalInformation.notDays.length
      ) {
        for (let notDay of teacherInformationForWeek.additionalInformation
          .notDays) {
          if (notDay.day === day && notDay.lessons && notDay.lessons.length) {
            workingLessonsForJournalForDay =
              workingLessonsForJournalForDay.filter(
                (lesson) =>
                  !notDay.lessons.some((notLesson) => notLesson === lesson)
              );
          }
        }
      }
      // for included lessons
      if (
        teacherInformationForWeek.additionalInformation &&
        teacherInformationForWeek.additionalInformation.yesDays &&
        teacherInformationForWeek.additionalInformation.yesDays.length
      ) {
        for (let yesDay of teacherInformationForWeek.additionalInformation
          .yesDays) {
          if (yesDay.day === day && yesDay.lessons && yesDay.lessons.length) {
            workingLessonsForJournalForDay =
              workingLessonsForJournalForDay.filter((lesson) =>
                yesDay.lessons.some((yesLesson) => yesLesson === lesson)
              );
          }
        }
      }

      // check if complexity level 4 is present in current day
      if (journalSubject.complexityLevel === subjectComplexityLevels[3]) {
        const possibleDaysForLevel4SubjectsLeft =
          days.length -
          level4SubjectsQuantityForClasses.find(
            (currentClass) => currentClass.id === journal.classId
          ).level4Quantity -
          level4CounterPerWeek /
            teacherInformationForWeek.recommendedHoursAtOnce;
        for (let teacherId of level4TeachersIds) {
          if (
            teacherId !== journal.teacherId &&
            schedule[teacherId] &&
            schedule[teacherId][day]
          ) {
            for (let lesson of Object.keys(schedule[teacherId][day])) {
              const scheduleClass = getClassOfJournal(
                getJournalOfLesson(schedule[teacherId][day][lesson])
              );

              if (
                journalClass.number === scheduleClass.number &&
                journalClass.letter === scheduleClass.letter &&
                (journalClass.group === "full" ||
                  (journalClass.group === 1 && scheduleClass.group !== 2) ||
                  (journalClass.group === 2 && scheduleClass.group !== 1)) &&
                // if (schedule[teacherId][day][lesson].classId === journal.classId &&
                possibleDaysForLevel4SubjectsLeft >= 0
              ) {
                continue daysInWeekLoop;
              }
            }
          }
        }
      }

      // languages !!!
      let isSubjectOutOfRoomsInDay = false;

      if (journalSubject.name.includes(" мова")) {
        // or subjects ids
        // check if 'gym' || 'work training' is present in class schedule AT ALL
        const isSubjectOutOfRoomsInSchedule = Object.values(
          teachersInformationForWeek
        ).some((teacherInfo) => {
          let isClassPresentInTeachersSchedule = false;
          if (
            (teacherInfo.subjectId === 10 || teacherInfo.subjectId === 11) &&
            schedule[teacherInfo.teacherId]
          ) {
            isClassPresentInTeachersSchedule = Object.values(
              schedule[teacherInfo.teacherId]
            ).some((day) =>
              Object.values(day).some(
                ({ classId }) => classId === journal.classId
              )
            );
          }
          return isClassPresentInTeachersSchedule;
        });

        if (
          isSubjectOutOfRoomsInSchedule &&
          !classesGymLangPairs.find(({ id }) => id === journal.classId)
            .pairPresent
        ) {
          for (let teacherInformationForWeekLocal of teachersInformationForWeek) {
            if (
              (teacherInformationForWeekLocal.subject.id === 10 || // 'gym' || 'work training'
                teacherInformationForWeekLocal.subject.id === 11) && // variables for ids
              schedule[teacherInformationForWeekLocal.teacherId] &&
              schedule[teacherInformationForWeekLocal.teacherId][day]
            ) {
              for (let lesson of Object.keys(
                schedule[teacherInformationForWeekLocal.teacherId][day]
              )) {
                const scheduleClass = getClassOfJournal(
                  getJournalOfLesson(
                    schedule[teacherInformationForWeekLocal.teacherId][day][
                      lesson
                    ]
                  )
                );

                if (
                  journalClass.number === scheduleClass.number &&
                  journalClass.letter === scheduleClass.letter &&
                  (journalClass.group === "full" ||
                    (journalClass.group === 1 && scheduleClass.group !== 2) ||
                    (journalClass.group === 2 && scheduleClass.group !== 1))
                ) {
                  // if (schedule[teacherInformationForWeekLocal.teacherId][day][lesson].classId === journal.classId) {
                  isSubjectOutOfRoomsInDay = true;
                  break;
                }
              }
            }
          }

          if (!isSubjectOutOfRoomsInDay) {
            continue daysInWeekLoop;
          }
        }
      }

      // productivity lessons order !!!
      // for easy subjects
      if (journalSubject.complexityLevel === subjectComplexityLevels[3]) {
        const neutralLessons = workingLessonsForJournalForDay
          .filter(
            (el) =>
              !currentPupilProductivity.notProductiveLessons.some(
                (lesson) => lesson === el
              )
          )
          .filter(
            (el) =>
              !currentPupilProductivity.productiveLessons.some(
                (lesson) => lesson === el
              )
          );
        workingLessonsForJournalForDay = [
          ...currentPupilProductivity.notProductiveLessons,
          ...currentPupilProductivity.productiveLessons,
          ...neutralLessons,
        ];
      }
      // for complex subjects
      if (journalSubject.complexityLevel === subjectComplexityLevels[0]) {
        const neutralLessons = workingLessonsForJournalForDay
          .filter(
            (el) =>
              !currentPupilProductivity.notProductiveLessons.some(
                (lesson) => lesson === el
              )
          )
          .filter(
            (el) =>
              !currentPupilProductivity.productiveLessons.some(
                (lesson) => lesson === el
              )
          );
        workingLessonsForJournalForDay = [
          ...currentPupilProductivity.productiveLessons,
          ...neutralLessons,
          ...currentPupilProductivity.notProductiveLessons,
        ];
      }

      // for every lesson in day
      lessonsInDayLoop: for (let lesson of workingLessonsForJournalForDay) {
        // console.log(journal.teacherId, schedule)
        if (
          schoolRecommendedHoursAtOnce === 1 ||
          lesson % schoolRecommendedHoursAtOnce !== 0 ||
          journalSubject.recommendedHoursAtOnce <
            schoolRecommendedHoursAtOnce ||
          hoursPerWeekForParallel - journalCounterPerWeek <
            schoolRecommendedHoursAtOnce
        ) {
          if (schedule[journal.teacherId][day]) {
            if (schedule[journal.teacherId][day][lesson]) {
              const scheduleClass = getClassOfJournal(
                getJournalOfLesson(schedule[journal.teacherId][day][lesson])
              );
              for (
                let i = 0;
                i < teacherInformationForWeek.recommendedHoursAtOnce;
                i++
              ) {
                if (
                  journalClass.number === scheduleClass.number &&
                  journalClass.letter === scheduleClass.letter &&
                  (journalClass.group === "full" ||
                    (journalClass.group === 1 && scheduleClass.group !== 2) ||
                    (journalClass.group === 2 && scheduleClass.group !== 1))
                ) {
                  journalCounterPerDay++;

                  // check if max hours per day achieved
                  if (journalCounterPerDay >= journal.maxHoursPerDay) {
                    break lessonsInDayLoop;
                  }
                }
              }

              if (
                schedule[journal.teacherId][day][lesson].journalId ===
                journal.id
              ) {
                journalCounterAtOnce++;
              } else {
                // make "window" between the same journals (teacher-subject-class) in schedule
                journalCounterAtOnce = 0;
              }
            } else {
              //check if lessons for recommendedHoursAtOnce are free for current class
              for (
                let i = 0;
                i < teacherInformationForWeek.recommendedHoursAtOnce;
                i++
              ) {
                for (let teacher of teachers) {
                  if (teacher.id !== journal.teacherId) {
                    if (
                      schedule[teacher.id] &&
                      schedule[teacher.id][day][lesson + i]
                    ) {
                      const scheduleClass = getClassOfJournal(
                        getJournalOfLesson(
                          schedule[teacher.id][day][lesson + i]
                        )
                      );

                      if (
                        journalClass.number === scheduleClass.number &&
                        journalClass.letter === scheduleClass.letter &&
                        (journalClass.group === "full" ||
                          (journalClass.group === 1 &&
                            scheduleClass.group !== 2) ||
                          (journalClass.group === 2 &&
                            scheduleClass.group !== 1))
                      ) {
                        continue lessonsInDayLoop;
                      }
                    }
                  }
                }
              }

              // until recommendedHoursAtOnce achieved
              for (
                let i = 0;
                i < teacherInformationForWeek.recommendedHoursAtOnce;
                i++
              ) {
                schedule[journal.teacherId][day][lesson + i] = {
                  journalId: journal.id,
                  room: teacherInformationForWeek.room,
                };

                // increase counters
                journalCounterPerWeek++;
                journalCounterPerDay++;
                journalCounterAtOnce++;
                if (journalSubject.complexityLevel === 4) {
                  level4CounterPerWeek++;
                }

                // set gym - language pair to 'present' in schedule for class
                if (
                  journalSubject.name.includes(" мова") &&
                  isSubjectOutOfRoomsInDay
                ) {
                  classesGymLangPairs.find(
                    ({ id }) => id === journal.classId
                  ).pairPresent = true;
                }

                // if recommendedAtOnce hours achieved
                if (
                  journalCounterAtOnce >=
                  teacherInformationForWeek.recommendedHoursAtOnce
                ) {
                  break lessonsInDayLoop;
                }

                // check if max hours per day achieved
                if (journalCounterPerDay >= journal.maxHoursPerDay) {
                  break lessonsInDayLoop;
                }

                // check if hours per week achieved
                if (journalCounterPerWeek >= hoursPerWeekForParallel) {
                  break daysInWeekLoop;
                }
              }
            }
          }
        }
      }

      // check if hours per week achieved
      if (journalCounterPerWeek >= hoursPerWeekForParallel) {
        break;
      }
    }

    // if hours per week NOT achieved go through the week again
    if (journalCounterPerWeek < hoursPerWeekForParallel) {
      // console.warn('not all hours per week for ', journal);

      journal.tryCounter++;

      if (journal.tryCounter > workingDaysOfWeekForJournal.length) {
        randomizeDays = true;
      }
      if (journal.tryCounter && journal.tryCounter < maxTries) {
        scheduleLesson(
          journal,
          teacherInformationForWeek,
          journalCounterPerWeek,
          level4CounterPerWeek,
          randomizeDays
        );
      } else {
        const hoursLeft = hoursPerWeekForParallel - journalCounterPerWeek;
        hoursForJournalsLeft[journal.id] = {
          hoursLeft,
          journalCounterPerWeek,
          level4CounterPerWeek,
          classId: journal.classId,
        };

        const currentClass = getClassOfJournal(journal);
        const teacher = getTeacherOfJournal(journal);

        console.warn(
          "NOT ALL hours (",
          hoursLeft,
          ") per week for ",
          teacher.name,
          currentClass.number,
          "-",
          currentClass.letter.toUpperCase(),
          " after ",
          maxTries,
          " tries!"
        );
      }
    }
  }
}

function parseClass(currentClass) {
  return {
    currentClassNumber: parseInt(currentClass),
    currentClassLetter: isNaN(currentClass[currentClass.length - 1])
      ? currentClass[currentClass.length - 1]
      : currentClass[currentClass.length - 3],
    currentClassGroup: isNaN(currentClass[currentClass.length - 1])
      ? "full"
      : +currentClass[currentClass.length - 1],
  };
}

// -----------------------

// find free lessons for teachers  ????????????
// const scheduleFreeLessonsForTeachers = {};
// for (let teacherId of Object.keys(schedule)) {
//     if (!scheduleFreeLessonsForTeachers[teacherId]) {
//         scheduleFreeLessonsForTeachers[teacherId] = {}
//     }

//     const teacherInformationForWeek = teachersInformationForWeek.find(teacherInfo => teacherInfo.teacherId === teacherId);
//     let workingDaysOfWeekForJournal = days; // create separate function!!!
//     // for excluded days
//     if (teacherInformationForWeek.additionalInformation &&
//         teacherInformationForWeek.additionalInformation.notDays &&
//         teacherInformationForWeek.additionalInformation.notDays.length) {
//         for (let notDay of teacherInformationForWeek.additionalInformation.notDays) {
//             if (!notDay.lessons ||
//                 (notDay.lessons && !notDay.lessons.length)) {
//                 workingDaysOfWeekForJournal = workingDaysOfWeekForJournal.filter(day => notDay.day !== day)
//             }
//         }
//     };

//     // for included days
//     if (teacherInformationForWeek.additionalInformation &&
//         teacherInformationForWeek.additionalInformation.yesDays &&
//         teacherInformationForWeek.additionalInformation.yesDays.length) {
//         workingDaysOfWeekForJournal = [];
//         for (let yesDay of teacherInformationForWeek.additionalInformation.yesDays) {
//             workingDaysOfWeekForJournal.push(yesDay.day)
//         }
//     };
//     for (let day of workingDaysOfWeekForJournal) {
//         if (!scheduleFreeLessonsForTeachers[teacherId][day]) {
//             scheduleFreeLessonsForTeachers[teacherId][day] = {}
//         }
//         let workingLessonsForJournalForDay = lessons;
//         // for excluded lessons
//         if (teacherInformationForWeek.additionalInformation &&
//             teacherInformationForWeek.additionalInformation.notDays &&
//             teacherInformationForWeek.additionalInformation.notDays.length) {
//             for (let notDay of teacherInformationForWeek.additionalInformation.notDays) {
//                 if (notDay.day === day && notDay.lessons && notDay.lessons.length) {
//                     workingLessonsForJournalForDay =
//                         workingLessonsForJournalForDay.filter(lesson => !notDay.lessons.some(notLesson => notLesson === lesson))
//                 }
//             };
//         };
//         // for included lessons
//         if (teacherInformationForWeek.additionalInformation &&
//             teacherInformationForWeek.additionalInformation.yesDays &&
//             teacherInformationForWeek.additionalInformation.yesDays.length) {
//             for (let yesDay of teacherInformationForWeek.additionalInformation.yesDays) {
//                 if (yesDay.day === day && yesDay.lessons && yesDay.lessons.length) {
//                     workingLessonsForJournalForDay =
//                         workingLessonsForJournalForDay.filter(lesson => yesDay.lessons.some(yesLesson => yesLesson === lesson))
//                 }
//             }
//         };
//         for (let lesson of workingLessonsForJournalForDay) {
//             if (!schedule[teacherId][day][lesson]) {
//                 scheduleFreeLessonsForTeachers[teacherId][day][lesson] = true;
//             }
//         }
//     }
// };
// console.log('%c Schedule free lessons for teachers - ', 'color: green', scheduleFreeLessonsForTeachers);
