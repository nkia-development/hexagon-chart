export default function getDummyData(DUMMY_DATA_SIZE: number) {
  const types = [
    {
      type: "SERVER",
      color: "#D4E2FF",
      stroke: "#709CF9",
      icon: "",
    },
    {
      type: "NETWORK",
      color: "#DEE9FF",
      stroke: "#709CF9",
      icon: "",
    },
    {
      type: "DBMS",
      color: "#EDF3FF",
      stroke: "#709CF9",
      icon: "",
    },
  ];

  const alarms = [
    {
      type: "DOWN",
      color: "#D6DADB",
      stroke: "#3E4142",
      hexAlarmStrokeBlink: true,
    },
    {
      type: "UP",
      color: "#FFFFFF",
      stroke: "#5C8DFF",
    },
    {
      type: "UNKNOWN",
      color: "#FFFFFF",
      stroke: "#F5B800",
      hexAlarmStrokeDasharray: "4 4",
      icon: "/suggested-warning-f.svg",
    },
  ];

  const list = [];

  for (let i = 0; i < DUMMY_DATA_SIZE; i++) {
    const el = getRandomElement(types);
    const al = getRandomElement(alarms);
    list.push({
      text: el.type,
      alarm: al.type,
      icon: al.icon ?? "",
      hexColor: el.color,
      hexStroke: el.stroke,
      hexAlarmColor: al.color,
      hexAlarmStroke: al.stroke,
      hexAlarmStrokeBlink: al.hexAlarmStrokeBlink ?? false,
      hexAlarmStrokeDasharray: al.hexAlarmStrokeDasharray ?? "",
      toolTip: [{ key: "type", value: el.type }],
    });
  }

  return list;
}

function getRandomElement(arr: any[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
