// Google reviews of Cloud4Green Technologies, shown on /customers.
//
// Each review:
//   name   — reviewer name as it appears on Google
//   course — the training the review is about (not the reviewer's job title)
//   text   — the review, lightly edited for length and clarity

export const GOOGLE_PLACE = {
  name: "Cloud4Green Technologies",
  // Overall score and count from the listing — update when they change.
  rating: 4.7,
  reviewCount: 195,
};

/** Filter row on /customers. `match` decides which reviews a chip shows,
 *  so a review about two trainings (VMware and Azure) lands under both. */
export const REVIEW_TRACKS = [
  { label: "All", match: () => true },
  { label: "AWS", match: (c) => /AWS/.test(c) },
  { label: "Microsoft Azure", match: (c) => /Azure/.test(c) },
  { label: "VMware & virtualization", match: (c) => /VMware|Virtualization/.test(c) },
  { label: "Cloud & technical", match: (c) => /^(Cloud Training|Technical Training)$/.test(c) },
];

export const googleReviews = [
  {
    name: "Shivaram Raju",
    course: "Cloud & Virtualization Training",
    text: "The classes and practical training were well structured. Starting from the basics, Bhaskar helped me build a strong foundation and gain hands-on experience through ongoing projects.",
  },
  {
    name: "Murali Dharan",
    course: "Microsoft Azure Training",
    text: "Before coming to Cloud4Green, I didn't have much knowledge of Azure. The practical training helped me become confident in what I learned. I would recommend Cloud4Green to my friends.",
  },
  {
    name: "Abdul Razik",
    course: "VMware & Microsoft Azure Training",
    text: "I have taken three training programmes with Bhaskar: VMware, Advanced VMware, and Microsoft Azure. He is a fantastic trainer, with exceptional theory classes and hands-on labs.",
  },
  {
    name: "Anand S",
    course: "AWS Training",
    text: "Bhaskar explained each concept wonderfully using simple examples. His presentation style and the many opportunities to ask questions made the AWS course easy to understand.",
  },
  {
    name: "Vivek Reddy",
    course: "Microsoft Azure Training",
    text: "The training provided in-depth Azure knowledge with hands-on practice and practical scenarios encountered in real situations. Worth joining for people with minimal cloud knowledge.",
  },
  {
    name: "Sai Lella",
    course: "Technical Training",
    text: "Bhaskar is very knowledgeable and trained us using real-world examples. The course structure and demonstrations were very well planned.",
  },
  {
    name: "Sirish Chevuru",
    course: "AWS Training",
    text: "Bhaskar's in-depth AWS knowledge builds confidence in switching to new roles. There are many valuable takeaways once you finish the course.",
  },
  {
    name: "anand ramu",
    course: "AWS Training",
    text: "The excellent AWS training helped me learn a lot and become more confident in performing the day-to-day tasks required for our operations.",
  },
  {
    name: "nousherhan ismail",
    course: "Microsoft Azure Training",
    text: "An excellent starting point for anyone new to cloud services. Most of the Azure teaching uses practical scenarios and easy examples.",
  },
  {
    name: "manikanteshwar rao",
    course: "AWS Training",
    text: "Excellent coaching with live demonstrations and practice. Bhaskar has in-depth AWS knowledge and explains it in simple language that is easy to understand.",
  },
  {
    name: "Sneee SHR",
    course: "AWS Training",
    text: "The hands-on sessions gave me a detailed understanding of AWS. Learning links and videos were also provided. A good place for beginners to learn quickly and easily.",
  },
  {
    name: "Satish Kumar",
    course: "Microsoft Azure Training",
    text: "The Azure training covered most of the topics required for certification. Bhaskar was polite, professional, and patient, and cleared all our doubts in time.",
  },
  {
    name: "sujata priyadarshini",
    course: "Cloud Training",
    text: "The training gives you confidence to move into cloud. I really appreciate Bhaskar's patience and the way he cleared all our doubts.",
  },
  {
    name: "Abbas Khoja",
    course: "AWS Cloud Architecture Training",
    text: "I learned AWS end to end and enjoyed gaining knowledge from Bhaskar. He cleared all my doubts and made AWS easy to learn.",
  },
  {
    name: "Surya tejakaushik",
    course: "AWS Training",
    text: "I learned a lot of new things about AWS. The live lab training was one of the highlights, and the four-week course was a good experience.",
  },
  {
    name: "shubhada chourey",
    course: "AWS Training",
    text: "You receive personal attention, with modules and practical exercises covered in class. Individual help is provided whenever you face doubts or challenges.",
  },
  {
    name: "pottiapti venkata",
    course: "Microsoft Azure Training",
    text: "An awesome learning experience. The Azure training was interactive, with daily practical sessions that helped me gain much more insight into Azure.",
  },
  {
    name: "sunil kumar kashyap",
    course: "AWS Training",
    text: "Bhaskar teaches AWS from scratch in a very simple way. Even beginners in IT can understand easily. I personally learned a lot from him.",
  },
  {
    name: "sathiyan dorairaj",
    course: "VMware Training",
    text: "Bhaskar has in-depth VMware knowledge. He is very patient and explains concepts in an easily understandable way.",
  },
  {
    name: "Rajashekhar SH",
    course: "Microsoft Azure Training",
    text: "Whenever we needed more clarity on a topic, we could speak with the trainers after class, and they would explain it again.",
  },
  {
    name: "Kishan l babu",
    course: "AWS Training",
    text: "Cloud4Green offers classroom and online sessions that you can join from anywhere. Recorded sessions are also available to access at any time.",
  },
  {
    name: "Abhishek C T",
    course: "AWS Training",
    text: "I learned many things at Cloud4Green and gained real-time experience through hands-on AWS practice. Bhaskar has very good experience in cloud computing.",
  },
  {
    name: "Sriram Sm",
    course: "AWS Solutions Architect Training",
    text: "I took the AWS Solutions Architect course offline. Both the practical and theoretical topics were taught clearly.",
  },
  {
    name: "Vinay D",
    course: "AWS Training",
    text: "Cloud4Green focuses on practical knowledge, which helped me develop a deeper understanding of AWS concepts.",
  },
  {
    name: "Arun Prasanna",
    course: "Microsoft Azure Training",
    text: "It was an excellent Azure training programme. Bhaskar's cloud computing experience and the pace he set from the beginning helped me understand the concepts.",
  },
  {
    name: "teja sree Donthi",
    course: "AWS Training",
    text: "A good course for beginners who want to start with the basics, learning AWS through real-time scenarios and hands-on experience.",
  },
  {
    name: "Bhagya Lakshmi",
    course: "Technical Training",
    text: "A friendly trainer who explains everything in detail. The training included real-time lab practice, and our doubts were cleared whenever we asked.",
  },
  {
    name: "Dilip John Meera",
    course: "Cloud & Virtualization Training",
    text: "Cloud4Green is a really good place to learn virtualization and cloud-based technical courses. The training sessions are good, with the option to attend online.",
  },
  {
    name: "Viswanadham Allada",
    course: "AWS Training",
    text: "Bhaskar patiently listened to our questions and clarified all our doubts on time. He also has very good presentation skills.",
  },
  {
    name: "anusha nair",
    course: "Microsoft Azure Training",
    text: "The practical sessions made me confident. I highly recommend this institute to anyone who wants to work in or learn more about the cloud domain.",
  },
];
