# Link to frontend : https://github.com/ayush-0110/frontask

# Feelingz: game built around emotions

## This is an interactive quiz website, which is centered around the theme of : EMOTIONS.

In this, user has to firstly register, then login. After logging in, user has to play in 5 successive rounds. each round has a different and intriguing challenge, one wrong answer and pffttt.... re-spawned from the first level.
### If a user attempts to reload the page or if he logs in after leaving the game in the middle of a level, the game resumes from where the user left it last time. The state(current level,current score,time and high score) of a user is always saved.

In this, various soft skills assessed are:
 - Critical thinking
 - Creativity
 - Attention to detail
 - Perseverance
 - Adaptability

## Technical information:

Frontend is based on ReactJs. Backend is in Nodejs. Database: Mysql. Have also used ExpressJs,concurrently,express-session etc. Deployed database on Amazon RDS

## Setting up:
Clone the repo, run yarn install in the frontend i.e. treasure-app. Then, navigate to backend directory i.e. treasure-backend and run npm install. Ensure MongoDB is installed and running(Refer to mongodb guide for the OS of your system)

Run yarn start.

P.S. : Just because I used 'Concurrently' package and added some scripts, one just has to run yarn start and both frontend and backend get fired up, simultaneously.

## Features:
1. Admin Panel with leaderboard and statistics.
2. Appealing design.
3. Login system
4. Asynchoronous loading components.
5. Assessing various soft skills.
6. Time elapsed is tracked, updated and best time is also stored.
7. If a user reloads the page or signs-in again, he starts from where he left earlier.

## Levels:
- Level 1: A riddle. Three chances are given to a user for correct answer, score decreases by 15 for each wrong attempt. User gets +100 for correct submission in first go.
- Level 2: Involves critical thinking and observation, user has to draw some inference from a link. +100 for correct answer.
- Level 3: Attention to detail, Perseverance are assessed. User has to watch a video and answer a question. +100 for correct answer.
- Level 4: jigsaw puzzle. Here time taken is also tracked and scores are awarded accordingly. Solving within 1.5 minutes gives 100 points, points decrease by -10 every 15 seconds.
- Level 5: A random trivia question to assess user's critical thinking and logic building. +100 for correct answer.

## Images:
## Login:

![Screenshot from 2023-04-28 01-22-40](https://user-images.githubusercontent.com/85434037/234979395-f66531ff-e5dc-4dfb-bc7a-475067e625de.png)
## Registered successfully :
![Screenshot from 2023-04-28 01-22-59](https://user-images.githubusercontent.com/85434037/234979578-3a539697-f655-4821-afa9-ce50b36bf3af.png)

## login success:
![Screenshot from 2023-04-28 01-23-30](https://user-images.githubusercontent.com/85434037/234979668-238fbd9e-f92b-465f-9e0b-4648f8c78fab.png)

## Loading quiz:
![Screenshot from 2023-04-28 01-23-32](https://user-images.githubusercontent.com/85434037/234979732-6df61aec-abd3-4ef1-803f-bb89d086ff7b.png)

## Level 1:
![Screenshot from 2023-04-28 01-23-42](https://user-images.githubusercontent.com/85434037/234979798-94d659ce-09fc-4b4f-8b14-367970360ee0.png)

## Level 2:
![Screenshot from 2023-04-28 01-24-10](https://user-images.githubusercontent.com/85434037/234979891-9be6674e-31a9-40fd-80fe-285532ee7fe7.png)
![Screenshot from 2023-04-28 01-24-16](https://user-images.githubusercontent.com/85434037/234979902-e88ad11b-ffe4-408d-a585-4658a1d4b51d.png)

## Level 3:
![Screenshot from 2023-04-28 01-24-29](https://user-images.githubusercontent.com/85434037/234979942-95122f73-54a2-49da-b2ab-5e6430b548df.png)

## Level 4:

![Screenshot from 2023-04-28 01-26-49](https://user-images.githubusercontent.com/85434037/234979970-79a917ea-d505-49f7-a2cc-c2e8197bd116.png)

## Level 5:
![Screenshot from 2023-04-28 01-27-26](https://user-images.githubusercontent.com/85434037/234980031-3a13a2c4-0202-42f6-822d-7f04d4036a90.png)

## Won:
![Screenshot from 2023-04-28 01-27-46](https://user-images.githubusercontent.com/85434037/234980117-bd141872-90d7-4bd7-ac25-79d798db969a.png)

## Lost:
![Screenshot from 2023-04-28 01-24-47](https://user-images.githubusercontent.com/85434037/234980185-daba3cac-be32-4090-a21f-9f668f9ae74a.png)

## Admin Panel:
![Screenshot from 2023-05-16 11-19-10](https://github.com/ayush-0110/backtask/assets/85434037/2bb37756-e169-4557-a694-95bc027d01f2)




