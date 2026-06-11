import type { Dict } from "./ko";

export const en: Dict = {
  common: {
    appName: "Softly",
    back: "Back",
    skip: "Skip",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    done: "Done",
    home: "Home",
    close: "Close",
    confirm: "Confirm",
    recordDisclaimer:
      "This is a personal record for self-reflection, not medical advice.",
  },

  landing: {
    subtitle: "Turn the condition that's hard to put into words\ninto records you can show",
    description:
      "A little friend asks you one or two things a day. One tap is enough — and your records become a calm summary you can show a clinician or family when needed.",
    note: "These records are for self-reflection, not medical advice.",
    start: "Get started",
  },

  onboarding: {
    question: "What kind of day should Softly keep you company through?",
    hint: "You can change this anytime in Settings.",
    momentQuestion: "When would you like to check in?",
    momentHint: "Attaching it to an existing habit makes it easy to remember.",
    moments: {
      night: "Before sleep",
      morning: "Starting the day",
      medication: "With my medication",
      anytime: "No set time",
    },
    modes: {
      worker: {
        label: "A working day",
        desc: "We'll look at the rhythm between work and rest.",
      },
      parent: {
        label: "A caregiving day",
        desc: "We'll look at the weight of caring for someone.",
      },
      student: {
        label: "A learning day",
        desc: "We'll look at the rhythm between studying and rest.",
      },
    },
  },

  home: {
    checkinCta: "Check in today",
    checkinDone: "Today's record is saved",
    viewToday: "View today's record",
    redoCheckin: "Edit today's record",
    unusualEventButton: "Something unusual happened",
    medCard: "Have you taken your medication today? A quick check is enough.",
    medCardDismiss: "Later",
    nav: {
      breathe: "Catch your breath",
      moments: "Memory drawer",
      summary: "7-day rhythm",
      records: "Records",
      safety: "Safety card",
      settings: "Settings",
    },
    momentLines: {
      night: "Before sleep, gently look back at today.",
      morning: "As the day starts, take a moment for yourself.",
      medication: "While you're at your medication, a light check-in too.",
      anytime: "",
    },
    selfCare: {
      title: "Today's small care",
      hint: "Nice to do, fine to skip.",
      items: {
        water: "A glass of water",
        walk: "A short walk",
        window: "Look out the window",
      },
    },
    greetings: {
      default: [
        "Hi there. How has your day been?",
        "Good to see you again today.",
        "A moment is enough. Let's gently look at today.",
        "Today is a fine day to take it easy.",
      ],
      yesterdayOverloaded: "Yesterday felt heavy. How is today?",
      longGap:
        "It's good to see you again. No pressure — let's just gently look at today.",
      checkedInToday: [
        "Today's record is already saved. That's plenty.",
        "You're all set for today. Rest easy.",
      ],
    },
  },

  checkin: {
    stopHere: "That's enough for today",
    questions: {
      body: {
        text: "How does your body feel today?",
        options: {
          okay: "Okay",
          normal: "So-so",
          overloaded: "Overloaded",
        },
      },
      gate: {
        text: "Want to record a little more?",
        hint: "Stopping here still counts as a complete record.",
        more: "A little more",
        stop: "That's it for today",
      },
      sleep: {
        text: "How was your sleep last night?",
        options: {
          enough: "Enough",
          short: "A bit short",
          barely: "Barely slept",
        },
      },
      fatigue: {
        text: "How tired are you right now?",
        options: { low: "Low", medium: "Medium", high: "High" },
      },
      stress: {
        text: "How is your stress level?",
        options: { low: "Low", medium: "Medium", high: "High" },
      },
      medication: {
        text: "Shall we note your medication check?",
        options: {
          done: "Done",
          not_yet: "Not yet",
          not_applicable: "Not applicable",
        },
      },
      unusual: {
        text: "Did anything unusual happen today?",
        options: { none: "Nothing", yes: "Yes" },
      },
    },
    modeQuestions: {
      worker_schedule: {
        text: "Is today's schedule heavy?",
        options: { light: "Light", normal: "Normal", heavy: "Heavy" },
      },
      worker_energy: {
        text: "Did work take a lot of your energy today?",
        options: { little: "Not much", some: "A little", much: "A lot" },
      },
      worker_drain: {
        text: "What drained you most today?",
        options: {
          sleep: "Sleep",
          work_stress: "Work stress",
          commute: "Commute",
          people: "People",
          unsure: "Not sure",
        },
      },
      parent_night: {
        text: "Did you wake up often last night?",
        options: { no: "No", some: "A little", much: "A lot" },
      },
      parent_solo: {
        text: "Is your solo caregiving time long today?",
        options: { short: "Short", normal: "Normal", long: "Long" },
      },
      parent_fatigue: {
        text: "How heavy does caregiving feel right now?",
        options: { low: "Low", medium: "Medium", high: "High" },
      },
      student_school: {
        text: "How does school feel today?",
        options: { okay: "Okay", normal: "So-so", heavy: "Heavy" },
      },
      student_drain: {
        text: "Did anything at school drain your energy?",
        options: { no: "No", some: "A little", much: "A lot" },
      },
      student_screen: {
        text: "Tonight, which feels closer — screens or sleep?",
        options: {
          more_screen: "More screens",
          less_screen: "Less screens",
          sleep: "Sleep",
        },
      },
    },
    complete: {
      viewToday: "View today's record",
      addEventDetail: "Add details about the unusual event",
      breatheSuggestion:
        "Today felt a little heavy. Taking a moment to breathe might help.",
      breatheLink: "1-minute breathing",
      oneGoodThing:
        "If one thing stayed with you today, want to note it down?",
      oneGoodThingPlaceholder: "One line is plenty (optional)",
      oneGoodThingSave: "Note it down",
      oneGoodThingSaved: "Safely kept.",
    },
    responses: {
      okay: [
        "Sounds like an okay day. I've noted that feeling.",
        "Nice. I'll keep today's rhythm just as it is.",
        "A light day. Those matter too.",
        "Got it. We'll keep today simple.",
        "I've written down today's okay-ness.",
      ],
      normal: [
        "An ordinary day is a perfectly good day.",
        "I've marked today as a steady day.",
        "That's plenty. I'll keep it safe.",
        "Got it. I'll record today just as it is.",
        "An ordinary day is a rhythm of its own.",
      ],
      overloaded: [
        "I'll mark today as a low-energy day.",
        "A heavy day. Just showing up here is enough.",
        "Today is a fine day to take it easy.",
        "Got it. I'll note today as a day closer to rest.",
        "You made a record even on a hard day. Well done.",
      ],
      heavyLoad: [
        "Today might be a day to listen a little more to your body.",
        "A tiring day. Maybe rest a little earlier tonight.",
        "I've noted today's weight. Tomorrow can wait for tomorrow.",
        "Looking at a hard day is itself a form of care.",
        "I've marked today as a slightly heavy day.",
      ],
      generic: [
        "That's plenty. Well done.",
        "Write more only when you feel like it.",
        "Today's record is safely kept.",
        "Short is fine. A record is a record.",
        "I've marked today as a lighter day.",
        "One tap is enough. Thank you.",
        "See you again tomorrow, gently.",
      ],
    },
  },

  today: {
    title: "Today's record",
    empty: "No record yet today. Now is fine — and skipping is fine too.",
    goCheckin: "Check in today",
    fields: {
      bodyState: "Body",
      sleep: "Sleep",
      fatigue: "Fatigue",
      stress: "Stress",
      medication: "Medication check",
      unusualEvent: "Unusual event",
      mainDrain: "Today's question",
      note: "Note",
    },
    eventsTitle: "Today's unusual events",
    eventDetail: "Details",
  },

  summary: {
    title: "7-day rhythm",
    earlyHint:
      "Even three days of records start to show your rhythm. Slowly, one day at a time is plenty.",
    selfCare: (n: number) =>
      `This week, you checked in with yourself ${n} ${n === 1 ? "time" : "times"}.`,
    lines: {
      overloaded: (n: number) =>
        `There ${n === 1 ? "was" : "were"} ${n} overloaded ${n === 1 ? "day" : "days"}.`,
      shortSleep: (n: number) =>
        `There ${n === 1 ? "was" : "were"} ${n} short-sleep ${n === 1 ? "day" : "days"}.`,
      highFatigue: (n: number) =>
        `There ${n === 1 ? "was" : "were"} ${n} high-fatigue ${n === 1 ? "day" : "days"}.`,
      highStress: (n: number) =>
        `There ${n === 1 ? "was" : "were"} ${n} high-stress ${n === 1 ? "day" : "days"}.`,
      medication: (n: number) =>
        `Medication was checked on ${n} ${n === 1 ? "day" : "days"}.`,
      events: (n: number) =>
        `There ${n === 1 ? "was" : "were"} ${n} unusual-event ${n === 1 ? "record" : "records"}.`,
      selfCare: (n: number) =>
        `You did ${n} small ${n === 1 ? "act" : "acts"} of care.`,
    },
    sideBySideNote:
      "You can see whether these records appeared on the same days.",
    timelineRows: {
      checkin: "Check-in",
      overloaded: "Overloaded",
      shortSleep: "Short sleep",
      event: "Unusual event",
    },
  },

  event: {
    title: "Unusual event",
    recordNow: "Record it now",
    recordedAt: (date: string, time: string) =>
      `Recorded at ${time} on ${date}.`,
    savedNote: "This alone is a complete record. Everything below is optional.",
    duration: {
      label: "Roughly how long did it last?",
      options: {
        moment: "A moment",
        minutes: "A few minutes",
        long: "Quite a while",
        unsure: "Not sure",
      },
    },
    before: {
      label: "What were you doing just before?",
      options: {
        resting: "Resting",
        working: "Working / studying",
        moving: "On the move",
        unsure: "Don't remember",
      },
    },
    after: {
      label: "How did you feel afterwards?",
      options: {
        okay: "Okay",
        tired: "A bit tired",
        rest: "Needed to rest",
      },
    },
    notePlaceholder: "One short note (optional)",
    saveDetails: "Save as is",
    editTitle: "Edit unusual event",
  },

  breathe: {
    title: "Catch your breath",
    intro: "One minute is plenty. Get comfortable and start whenever you like.",
    start: "Start",
    inhale: "Breathe in slowly",
    exhale: "Breathe out slowly",
    done: "Well done. That's enough breathing for today.",
    again: "Once more",
    note: "It's okay to stop anytime.",
  },

  records: {
    title: "Records",
    range7: "Last 7 days",
    range30: "Last 30 days",
    rangeCustom: "Custom",
    from: "From",
    to: "To",
    empty:
      "No records in this period yet. As records build up, you can review them here at a glance before an appointment or a talk.",
    checkinLabel: "Check-in",
    eventLabel: "Unusual event",
    copyText: "Copy as text",
    copied: "Copied",
    print: "Printable view",
    exportTitle: (from: string, to: string) =>
      `Softly records (${from} – ${to})`,
    periodSummary: "Period summary",
    periodCheckins: (n: number) =>
      `You checked in with yourself ${n} ${n === 1 ? "time" : "times"} in this period.`,
    printedAt: (date: string) =>
      `Printed ${date} · Softly personal records`,
  },

  moments: {
    title: "Memory drawer",
    intro:
      "The one-liners you noted after check-ins are collected here.",
    empty:
      "The drawer is still empty. Note one line after a check-in, and you'll build up sentences of your own to revisit on hard days.",
    calendarLegend: "Days you left a record",
  },

  safety: {
    title: "Safety card",
    intro: "A personal note you can show to someone when needed.",
    disclaimer:
      "This card is a personal note written by the user, not medical advice.",
    fields: {
      emergencyContactName: "Emergency contact name",
      emergencyContactPhone: "Emergency contact phone",
      medicationNotes: "Medication notes",
      clinicNotes: "Clinic notes",
      whatHelps: "What helps me",
      whatNotToDo: "Please don't do this",
      additionalNotes: "Additional notes",
    },
    emptyView:
      "Nothing written yet. Take your time and note only what you need.",
    startEdit: "Start writing",
  },

  settings: {
    title: "Settings",
    mode: "Your kind of day",
    moment: "Check-in moment",
    language: "Language",
    languages: { ko: "한국어", en: "English" },
    exportJson: "Export data (JSON)",
    exportDone: "Copied",
    importJson: "Import data (JSON)",
    importConfirm: (c: number, e: number) =>
      `Import ${c} check-in${c === 1 ? "" : "s"} and ${e} unusual-event record${e === 1 ? "" : "s"}? The records on this device will be replaced.`,
    importYes: "Yes, import",
    importDone: "Data imported.",
    importError:
      "Couldn't read the file. Please check that it's a JSON file exported from Softly.",
    clearData: "Clear all records",
    clearConfirm:
      "Clear all records? This only affects this device and cannot be undone.",
    clearYes: "Yes, clear everything",
    clearDone: "All records have been cleared.",
    fullDisclaimer:
      "Softly is a wellness check-in and personal record app. It does not provide medical advice, diagnosis, treatment, prevention, or prediction. If you have health concerns, please consult a medical professional. In an emergency, contact your local emergency services.",
  },
};
