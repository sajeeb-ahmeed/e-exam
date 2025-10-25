export const examData = {
  examTitle: "Web Design & JavaScript Final Exam",
  parts: [
    {
      part: 1,
      type: "MCQ",
      marks: 30,
      questions: [
        { id: 1, question: "HTML tag for link?", options: ["<a>", "<link>", "<href>"], answer: "<a>" },
        { id: 2, question: "CSS property for color?", options: ["color", "background", "font"], answer: "color" },
        { id: 3, question: "JS data type for true/false?", options: ["Boolean", "String", "Number"], answer: "Boolean" },
        { id: 4, question: "Bootstrap class for button?", options: ["btn", "button", "btn-primary"], answer: "btn" },
        { id: 5, question: "HTML5 semantic tag for navigation?", options: ["<nav>", "<menu>", "<section>"], answer: "<nav>" },
        { id: 6, question: "CSS selector for ID?", options: ["#", ".", "*"], answer: "#" },
        { id: 7, question: "JS operator for equality?", options: ["===", "=", "!="], answer: "===" },
        { id: 8, question: "Bootstrap grid has how many columns?", options: ["12", "10", "6"], answer: "12" },
        { id: 9, question: "CSS box-model includes?", options: ["margin, border, padding, content", "color, font, layout", "display"], answer: "margin, border, padding, content" },
        { id: 10, question: "HTML tag for image?", options: ["<img>", "<image>", "<picture>"], answer: "<img>" }
      ]
    },
    {
      part: 2,
      type: "Short Answer",
      marks: 20,
      questions: [
        { id: 1, question: "Define a JavaScript variable." },
        { id: 2, question: "Explain CSS Flexbox." },
        { id: 3, question: "What is semantic HTML?" },
        { id: 4, question: "Explain the difference between id and class in HTML." }
      ]
    },
    {
      part: 3,
      type: "Coding",
      marks: 30,
      questions: [
        { id: 1, question: "Write a JS function to sum two numbers." },
        { id: 2, question: "Write HTML+CSS to create a 3-column responsive layout." },
        { id: 3, question: "Write JS function to check if a number is prime." }
      ]
    },
    {
      part: 4,
      type: "Mini Project",
      marks: 20,
      questions: [
        { id: 1, question: "Create a responsive webpage with navbar, cards, and form." }
      ]
    }
  ]
};
