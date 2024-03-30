import * as https from 'https';

export function renderTemplate(username: string, code: number): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const verCode = code.toString().split('');
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const date = `${day} ${months[month]}, ${year}`;

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email template</title>
  <style>
    @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap);
    *{
      font-family: "Poppins", sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body{
      background: linear-gradient(90deg,#4b6cb7, #182848);
    }
    .all{
      width: 100%;
    }
    .head{
      width: 100%;
      padding: 1rem;
      align-items: center;
      justify-content: space-between !important;
      display: flex;
    }
    .head span{
      font-size: 18px;
      color: black;
    }
    .logo{
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      font-size: 18px;
      color:white;
    }
    .logo img{
      width: 48px;
      height: 48px;
      margin-right: 5px;
    }
    .body{
      width: 100%;
    }
    .icon{
      width: auto;
      height: auto;
      display: inline-block;
      padding: 25px;
      border-radius: 100%;
      background: #bbcbf2;
      margin: 0 auto;
    }
    .icon img{
      max-width: 120px;
      max-height: 120px;
      object-fit: cover;
    }
    .content{
      max-width: 600px;
      width: 100%;
      padding: 20px;
      margin: 5px auto;
      border-radius: 10px;
      background: white;
      text-align: center;
    }
    .content h1{
      font-size: 22px;
      font-weight: 600;
      margin: 10px 0; 
    }
    .content p{
      font-size: 17px;
      padding: 10px 5px;
      margin: 5px;
    }
    .code{
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .code .numb{
      padding: 7px 12px;
      font-size: 18px;
      color: #3f68d0;
      background: #d5def4;
      border-radius: 5px;
      margin-right:3px;
    }
    @media screen and (max-width:640px) {
      .content{
        width: 100% !important;
        padding: 10px !important;
      }
      .head{
        color:black;
      }
    }
  </style>
</head>
<body>
  <div class="all">
    <div class="head">
      <a href="#" class="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/3669/3669967.png" alt="logo">
        <span style="margin-top:12px;">BravoBlog</span>
      </a>
      <span style="margin-left:auto;">${date}</span>
    </div>
    <div class="body">
      <div class="content">
        <div class="icon">
          <img src="https://cdn-icons-png.flaticon.com/512/6690/6690078.png" alt="">
        </div>
        <h1>Your reset password code</h1>
        <p>Hey <b>${username}</b>, Thank you for using my website BravoBlog. Don't share this code with others. The code is valid for <b>10 minutes</b>. Your code is:</p>
        <div class="code">
          ${
            verCode.map((item)=>(
              `<div class="numb">
              ${item}
            </div>`
            )).join("")
          }
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
