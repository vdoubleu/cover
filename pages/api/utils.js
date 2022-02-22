import sgMail from '@sendgrid/mail';

function mailFormatter(data) {
  let outputString = "";
  const startTime = data["startTime"].slice(0, -3);
  const endTime = data["endTime"].slice(0, -3);
  outputString += `Time: ${startTime}-${endTime}\n\n`;

  const store = data["store"];

  for (let i = 0; i < store.length; i++) {
    const currSection = store[i];
    const name = currSection["name"] === "Other" ? "" : (currSection["name"] + " ");

    const block = Object.keys(currSection).map((room, index) => {
      if (room !== "name") {
        const adjustedStudent = currSection[room] === 1 ? "student" : "students";
        return `${name}${room}: ${currSection[room]} ${adjustedStudent}`;
      }
    }).reduce((acc, curr) => {
      if (curr) {
        return (acc ? acc : "") + curr + "\n";
      }
    }, "");

    outputString += block + "\n";
  }

  return outputString;
}

function sendMail(APIKey, succFun, failFun, toEmail, data) {
  console.log(data);

  sgMail.setApiKey(APIKey);

  const formatedData = mailFormatter(data);

  const msg = {
    to: toEmail,
    from: 'victorwang2001@gmail.com',
    subject: 'Coverage Report',
    text: formatedData
  };

  sgMail.send(msg).then(() => {
    succFun();
  }).catch(err => {
    failFun(err);
  });

}

export {
  sendMail
};
