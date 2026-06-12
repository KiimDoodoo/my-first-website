export const ko = {
  common: {
    appName: "소프틀리",
    back: "뒤로",
    skip: "건너뛰기",
    save: "저장하기",
    cancel: "취소",
    edit: "수정하기",
    done: "완료",
    home: "홈으로",
    close: "닫기",
    confirm: "확인",
    recordDisclaimer:
      "이 기록은 스스로를 돌아보기 위한 개인 기록이며, 의료 조언이 아닙니다.",
  },

  landing: {
    subtitle: "하루 한 번, 한 번의 탭으로 쓰는\n가장 가벼운 다이어리",
    description:
      "작은 친구가 매일 한두 가지만 물어봐요. 탭 몇 번이면 오늘의 일기가 완성되고, 기록한 날엔 달력에 새싹이 자라요. 쌓인 기록은 필요할 때 믿는 사람에게 보여줄 수 있는 차분한 정리가 돼요.",
    note: "이 기록은 스스로를 돌아보기 위한 것이지, 의료 조언이 아니에요.",
    start: "시작하기",
  },

  onboarding: {
    question: "Softly가 어떤 하루를 함께하면 좋을까요?",
    hint: "언제든 설정에서 바꿀 수 있어요.",
    momentQuestion: "언제 들여다보면 좋을까요?",
    momentHint: "기존 습관에 붙여두면 잊지 않고 떠올리기 쉬워요.",
    moments: {
      night: "잠들기 전에",
      morning: "아침을 시작할 때",
      medication: "약을 챙길 때",
      anytime: "정해두지 않을래요",
    },
    modes: {
      worker: {
        label: "일하는 하루",
        desc: "일과 휴식 사이의 리듬을 함께 봐요.",
      },
      parent: {
        label: "돌보는 하루",
        desc: "누군가를 돌보는 하루의 무게를 함께 봐요.",
      },
      student: {
        label: "배우는 하루",
        desc: "배움과 쉼 사이의 리듬을 함께 봐요.",
      },
    },
  },

  home: {
    checkinCta: "오늘 체크인하기",
    checkinDone: "오늘 기록을 남겼어요",
    viewToday: "오늘 기록 보기",
    redoCheckin: "오늘 기록 고치기",
    unusualEventButton: "특이한 일이 있었어요",
    medCard: "오늘 약은 챙기셨어요? 체크만 해두면 돼요.",
    medCardDismiss: "나중에요",
    nav: {
      breathe: "숨 고르기",
      moments: "마음 서랍",
      summary: "7일 리듬",
      records: "기록 보기",
      safety: "안심 카드",
      settings: "설정",
    },
    momentLines: {
      night: "잠들기 전, 오늘을 가볍게 돌아봐요.",
      morning: "하루를 시작하며, 잠깐 나를 들여다봐요.",
      medication: "약 챙기는 김에, 오늘도 가볍게 체크해요.",
      anytime: "",
    },
    weekRow: {
      title: "이번 주 페이지",
    },
    selfCare: {
      title: "오늘의 작은 돌봄",
      hint: "해도 좋고, 안 해도 괜찮아요.",
      items: {
        water: "물 한 잔",
        walk: "잠깐 걷기",
        window: "창밖 보기",
      },
    },
    greetings: {
      default: [
        "안녕하세요. 오늘 하루는 어땠어요?",
        "오늘도 만나서 반가워요.",
        "잠깐이면 충분해요. 오늘을 가볍게 들여다봐요.",
        "오늘은 조금 가볍게 보내도 좋은 날이에요.",
      ],
      yesterdayOverloaded: "어제는 무거운 하루였죠. 오늘은 어때요?",
      longGap:
        "다시 만나서 반가워요. 부담 갖지 말고, 오늘 하루만 가볍게 들여다봐요.",
      checkedInToday: [
        "오늘 기록은 이미 남겨뒀어요. 이만큼이면 충분해요.",
        "오늘 할 일은 다 했어요. 편하게 쉬어요.",
      ],
    },
  },

  checkin: {
    stopHere: "여기까지만 할게요",
    questions: {
      body: {
        text: "오늘 몸은 어떤가요?",
        options: {
          okay: "괜찮아요",
          normal: "보통이에요",
          overloaded: "버거워요",
        },
      },
      gate: {
        text: "조금 더 기록해볼까요?",
        hint: "여기서 멈춰도 오늘 기록은 완성이에요.",
        more: "조금 더 할게요",
        stop: "오늘은 여기까지",
      },
      sleep: {
        text: "어젯밤 잠은 어땠나요?",
        options: {
          enough: "충분했어요",
          short: "부족했어요",
          barely: "거의 못 잤어요",
        },
      },
      fatigue: {
        text: "지금 피로는 어느 정도인가요?",
        options: { low: "낮아요", medium: "중간이에요", high: "높아요" },
      },
      stress: {
        text: "스트레스는 어느 정도인가요?",
        options: { low: "낮아요", medium: "중간이에요", high: "높아요" },
      },
      medication: {
        text: "오늘 복약 체크, 같이 해둘까요?",
        options: {
          done: "했어요",
          not_yet: "아직이요",
          not_applicable: "해당 없어요",
        },
      },
      unusual: {
        text: "오늘 특이한 일이 있었나요?",
        options: { none: "없었어요", yes: "있었어요" },
      },
    },
    modeQuestions: {
      worker_schedule: {
        text: "오늘 일정이 무거운가요?",
        options: { light: "가벼움", normal: "보통", heavy: "무거움" },
      },
      worker_energy: {
        text: "오늘 일이 에너지를 많이 가져갔나요?",
        options: { little: "별로", some: "조금", much: "많이" },
      },
      worker_drain: {
        text: "오늘 가장 힘 빠지게 한 건?",
        options: {
          sleep: "수면",
          work_stress: "업무 스트레스",
          commute: "통근",
          people: "사람",
          unsure: "잘 모르겠음",
        },
      },
      parent_night: {
        text: "어젯밤 잠이 자주 깼나요?",
        options: { no: "아니요", some: "조금", much: "많이" },
      },
      parent_solo: {
        text: "오늘 혼자 돌보는 시간이 긴가요?",
        options: { short: "짧음", normal: "보통", long: "긺" },
      },
      parent_fatigue: {
        text: "돌봄 피로감은 어느 정도인가요?",
        options: { low: "낮음", medium: "중간", high: "높음" },
      },
      student_school: {
        text: "오늘 학교는 어떻게 느껴지나요?",
        options: { okay: "괜찮음", normal: "보통", heavy: "무거움" },
      },
      student_drain: {
        text: "학교에서 에너지를 뺏긴 일이 있었나요?",
        options: { no: "아니요", some: "조금", much: "많이" },
      },
      student_screen: {
        text: "오늘 밤은 스크린과 잠 중 어느 쪽에 가까울까요?",
        options: {
          more_screen: "스크린 많이",
          less_screen: "스크린 줄이기",
          sleep: "잠",
        },
      },
    },
    complete: {
      todayPage: "오늘의 페이지",
      stickerPrompt: "오늘 페이지에 스티커 하나 붙여볼까요?",
      viewToday: "오늘 기록 보기",
      addEventDetail: "특이한 일 자세히 남기기",
      breatheSuggestion: "오늘은 조금 무거웠네요. 잠깐 숨을 고르고 가도 좋아요.",
      breatheLink: "1분 숨 고르기",
      oneGoodThing: "오늘 마음에 남는 한 가지가 있다면, 적어둘래요?",
      oneGoodThingPlaceholder: "한 줄이면 충분해요 (선택)",
      oneGoodThingSave: "적어두기",
      oneGoodThingSaved: "잘 담아뒀어요.",
    },
    responses: {
      okay: [
        "괜찮은 날이네요. 이 느낌, 기록해뒀어요.",
        "좋아요. 오늘의 리듬을 그대로 담아둘게요.",
        "가벼운 하루네요. 이런 날도 소중해요.",
        "알겠어요. 오늘은 단순하게 갈게요.",
        "오늘의 괜찮음을 잘 적어뒀어요.",
      ],
      normal: [
        "보통인 날도 충분히 좋은 날이에요.",
        "오늘을 무던한 날로 기록해뒀어요.",
        "그 정도면 충분해요. 잘 담아둘게요.",
        "알겠어요. 오늘은 있는 그대로 적어둘게요.",
        "평범한 하루도 하나의 리듬이에요.",
      ],
      overloaded: [
        "오늘을 에너지가 낮은 날로 기록해둘게요.",
        "무거운 하루였네요. 여기까지 와준 것만으로 충분해요.",
        "오늘은 조금 가볍게 보내도 좋은 날이에요.",
        "알겠어요. 오늘은 쉼에 가까운 날로 적어둘게요.",
        "버거운 날에도 기록을 남겼어요. 잘했어요.",
      ],
      heavyLoad: [
        "오늘은 몸이 보내는 신호를 조금 더 들어줘도 좋아요.",
        "지친 날이네요. 오늘 밤은 조금 일찍 쉬어봐요.",
        "오늘의 무게를 기록해뒀어요. 내일은 내일에게 맡겨요.",
        "힘든 하루를 들여다본 것 자체가 돌봄이에요.",
        "오늘을 조금 무거운 날로 표시해뒀어요.",
      ],
      generic: [
        "이만큼이면 충분해요. 잘했어요.",
        "더 쓰고 싶을 때만 더 써도 돼요.",
        "오늘의 기록, 잘 받아뒀어요.",
        "짧아도 괜찮아요. 기록은 기록이에요.",
        "오늘을 조금 가벼운 날로 표시해뒀어요.",
        "한 번의 탭이면 충분해요. 고마워요.",
        "내일 또 가볍게 만나요.",
      ],
    },
  },

  today: {
    title: "오늘 기록",
    empty: "오늘은 아직 기록이 없어요. 지금 해도 되고, 안 해도 괜찮아요.",
    goCheckin: "오늘 체크인하기",
    fields: {
      bodyState: "몸 상태",
      sleep: "수면",
      fatigue: "피로",
      stress: "스트레스",
      medication: "복약 체크",
      unusualEvent: "특이한 일",
      mainDrain: "오늘의 질문",
      note: "메모",
    },
    eventsTitle: "오늘의 특이한 일",
    eventDetail: "자세히",
  },

  summary: {
    title: "7일 리듬",
    earlyHint:
      "기록이 3일만 모여도 나의 리듬이 보이기 시작해요. 천천히, 하루씩이면 충분해요.",
    selfCare: (n: number) => `이번 주, 나를 ${n}번 들여다봤어요.`,
    lines: {
      overloaded: (n: number) => `버거운 날이 ${n}번 있었어요.`,
      shortSleep: (n: number) => `짧은 수면이 ${n}일 있었어요.`,
      highFatigue: (n: number) => `피로가 높은 날이 ${n}번 있었어요.`,
      highStress: (n: number) => `스트레스가 높은 날이 ${n}번 있었어요.`,
      medication: (n: number) => `복약을 체크한 날이 ${n}일 있었어요.`,
      events: (n: number) => `특이한 일 기록이 ${n}건 있었어요.`,
      selfCare: (n: number) => `작은 돌봄을 ${n}번 챙겼어요.`,
    },
    sideBySideNote: "이 기록들이 같은 날에 함께 나타났는지 함께 볼 수 있어요.",
    timelineRows: {
      checkin: "체크인",
      overloaded: "버거운 날",
      shortSleep: "짧은 수면",
      event: "특이한 일",
    },
  },

  event: {
    title: "특이한 일 기록",
    recordNow: "지금으로 기록하기",
    recordedAt: (date: string, time: string) =>
      `${date} ${time}에 기록해뒀어요.`,
    savedNote: "이것만으로도 완성된 기록이에요. 아래는 모두 선택이에요.",
    duration: {
      label: "대략 얼마나 지속됐나요?",
      options: {
        moment: "잠깐",
        minutes: "몇 분 정도",
        long: "꽤 길게",
        unsure: "잘 모르겠음",
      },
    },
    before: {
      label: "직전에 뭘 하고 있었나요?",
      options: {
        resting: "쉬는 중",
        working: "일·공부 중",
        moving: "이동 중",
        unsure: "잘 기억 안 남",
      },
    },
    after: {
      label: "그 후 상태는 어땠나요?",
      options: {
        okay: "괜찮았어요",
        tired: "좀 피곤했어요",
        rest: "쉬어야 했어요",
      },
    },
    notePlaceholder: "한 줄 메모 (선택)",
    saveDetails: "이대로 저장하기",
    editTitle: "특이한 일 수정",
  },

  breathe: {
    title: "숨 고르기",
    intro: "1분이면 충분해요. 편한 자세로, 시작하고 싶을 때 시작해요.",
    start: "시작하기",
    inhale: "천천히 들이쉬어요",
    exhale: "천천히 내쉬어요",
    done: "잘했어요. 오늘의 호흡은 이걸로 충분해요.",
    again: "한 번 더",
    note: "언제든 멈춰도 괜찮아요.",
  },

  records: {
    title: "기록 보기",
    range7: "최근 7일",
    range30: "최근 30일",
    rangeCustom: "직접 선택",
    from: "시작일",
    to: "종료일",
    empty:
      "아직 이 기간에는 기록이 없어요. 기록이 쌓이면 중요한 대화나 상담 전에 이곳에서 한눈에 모아 볼 수 있어요.",
    checkinLabel: "체크인",
    eventLabel: "특이한 일",
    copyText: "텍스트로 복사하기",
    copied: "복사했어요",
    print: "인쇄용 화면 보기",
    exportTitle: (from: string, to: string) => `소프틀리 기록 (${from} ~ ${to})`,
    periodSummary: "기간 요약",
    periodCheckins: (n: number) => `이 기간에 나를 ${n}번 들여다봤어요.`,
    printedAt: (date: string) => `${date} 출력 · Softly(소프틀리) 개인 기록`,
  },

  moments: {
    title: "마음 서랍",
    intro: "체크인 끝에 적어둔 '마음에 남는 한 가지'들이 여기 모여요.",
    empty:
      "아직 서랍이 비어 있어요. 체크인 끝에 한 줄을 적어두면, 힘든 날 꺼내 볼 수 있는 나만의 문장들이 쌓여요.",
    calendarLegend: "기록을 남긴 날이에요",
  },

  safety: {
    title: "안심 카드",
    intro: "필요할 때 다른 사람에게 보여줄 수 있는 나의 메모예요.",
    disclaimer:
      "이 카드는 사용자가 직접 작성한 개인 메모이며, 의료 조언이 아닙니다.",
    fields: {
      emergencyContactName: "비상 연락처 이름",
      emergencyContactPhone: "비상 연락처 전화번호",
      medicationNotes: "복용 중인 약 메모",
      clinicNotes: "다니는 병원 메모",
      whatHelps: "이런 게 도움이 돼요",
      whatNotToDo: "이건 하지 말아주세요",
      additionalNotes: "추가 메모",
    },
    emptyView: "아직 작성한 내용이 없어요. 천천히, 필요한 것만 적어두면 돼요.",
    startEdit: "작성하기",
  },

  settings: {
    title: "설정",
    mode: "함께하는 하루",
    moment: "들여다보는 시간",
    theme: "테마",
    themes: {
      sage: "세이지",
      warm: "웜 베이지",
      lavender: "안개 라벤더",
      forest: "깊은 숲",
    },
    language: "언어",
    languages: { ko: "한국어", en: "English" },
    exportJson: "데이터 내보내기 (JSON)",
    exportDone: "복사했어요",
    importJson: "데이터 가져오기 (JSON)",
    importConfirm: (c: number, e: number) =>
      `체크인 ${c}개, 특이한 일 ${e}건을 가져올까요? 지금 이 기기의 기록은 가져온 데이터로 바뀌어요.`,
    importYes: "네, 가져올게요",
    importDone: "데이터를 가져왔어요.",
    importError:
      "파일을 읽지 못했어요. Softly에서 내보낸 JSON 파일인지 확인해 주세요.",
    clearData: "모든 기록 지우기",
    clearConfirm:
      "정말 모든 기록을 지울까요? 이 기기에서만 지워지고, 되돌릴 수 없어요.",
    clearYes: "네, 지울게요",
    clearDone: "모든 기록을 지웠어요.",
    fullDisclaimer:
      "Softly는 웰니스 체크인 및 개인 기록 앱입니다. 의료 조언, 진단, 치료, 예방, 예측을 제공하지 않습니다. 건강에 대한 우려가 있다면 의료 전문가와 상담하세요. 응급 상황에서는 지역 응급 서비스에 연락하세요.",
  },
};

export type Dict = typeof ko;
