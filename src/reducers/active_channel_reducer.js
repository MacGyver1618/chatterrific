var placeholder = {
  name: "talvivaara",
  users: [
    {
      name: "Joni",
      key: 12
    },
    {
      name: "Kati",
      key: 13
    }
  ],
  messages: [
    {
      user: "Joni",
      timestamp: "18.20.00",
      message: "Moi!",
      key: 1
    },
    {
      user: "Kati",
      timestamp: "18.20.05",
      message: "no moi (:",
      key: 2
    }
  ]
}

export default (state = placeholder, action) => state
