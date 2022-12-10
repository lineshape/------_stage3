let enemys = [];
let score = 0;

let hammer_img;

let blood_img;
let blood_List = [];

let choi;
let choi_clicked = 0;

let timer = undefined;
let new_timer = undefined;

let kyosu;
let youjeong;

let sound;

const choi_dialogs = [
  '',
  '',
  '교수님은 날 싫어하는게 분명해',
  '솔직히 없어졌으면 좋겠어',
  '왜 승아한테만 잘 해주시지?',
  '승아는 왜 날 불쌍하게 여겨? 내가 불쌍해?',
  '그들도 날 죽이려고 하고 있는게 분명해',
  '내가 먼저 움직여서 나쁠 건 없잖아',
  '그건 정당방위 아니야?',
];

function preload() {
  hammer_img = loadImage('assets/hammer.png');
  blood_img = loadImage('assets/blood.png');
  sound = loadSound('assets/망치 1.mp3');
}

function setup() {
  createCanvas(400, 400);
  choi = new Me(0, 250, 100, 100);

  // 3초마다 적을 추가하는 코드
  timer = setInterval(plus_enemy, 2000);
}

function draw() {
  noCursor();

  // 최민식을 두번 클릭했을 때 정의
  if (choi_clicked >= 2) {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    if (!new_timer) {
      new_timer = setInterval(plus_hidden_enemy, 2000);
    }

    background(150);
    text(choi_dialogs[choi_clicked], 30, 200);
  } else {
    background(220);
  }

  // 클리어 했을 때 처리
  if (score >= 10) {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    text('충분히 죽였어. 다음은 1010을 입력해.', 30, 100);
  }

  // 최민식을 보여줌
  choi.show();

  // 최민식을 클릭했을 때
  if (choi.click()) {
    choi_clicked += 1;
  }

  // 상단 점수 보여주는 텍스트
  text('죽인 인간 : ' + score, 300, 50);

  // 적을 보여주는 루프
  for (let i = 0; i < enemys.length; i++) {
    enemys[i].show();
  }

  for (let i = 0; i < enemys.length; i++) {
    enemys[i].move(-3, 0);
  }

  // 적을 클릭했을 때 적을 지우고 점수를 올림
  for (let i = 0; i < enemys.length; i++) {
    if (enemys[i].click()) {
      blood_plus(mouseX, mouseY);
      setTimeout(() => blood_List.shift(), 3000);

      score += 1;
      enemys[i].cought();
    }
  }

  // 마우스에 따라다니는 망치
  image(hammer_img, mouseX - 20, mouseY, 50, 50);

  // 핏자국
  for (let i = 0; i < blood_List.length; i++) {
    image(blood_img, blood_List[i][0], blood_List[i][1], 50, 50);
  }
}

// 적을 하나씩 추가 함
function plus_enemy() {
  enemys.push(new Enemy(400, 300, 100, 100, false));
}

// 교수님과 최유정을 추가함
function plus_hidden_enemy() {
  enemys.push(new Enemy(400, 300, 100, 100, true));
}

function blood_plus(mouseX, mouseY) {
  blood_List.push([mouseX, mouseY]);
}
