// پیدا کردن عناصر صفحه
const startButton = document.getElementById("startButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const missionScreen = document.getElementById("missionScreen");
const enterGameButton = document.getElementById("enterGameButton");
const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");

const nextQuestionButton = document.getElementById("nextQuestionButton");
const answerOptions = document.getElementById("answerOptions");
const feedback = document.getElementById("feedback");

const replayButton = document.getElementById("replayButton");
const exitButton = document.getElementById("exitButton");
const exitMessage = document.getElementById("exitMessage");

const questions = [
    {
        first: "۳/۸",
        second: "۵/۸",
        answer: "less",
        explanation: "مخرج دو کسر برابر است. پس صورت‌ها را مقایسه می‌کنیم: ۵ از ۳ بزرگ‌تر است."
    },
    {
        first: "۷/۱۰",
        second: "۴/۱۰",
        answer: "greater",
        explanation: "مخرج‌ها برابرند. چون ۷ از ۴ بزرگ‌تر است، کسر اول بزرگ‌تر است."
    },
    {
        first: "۲/۹",
        second: "۶/۹",
        answer: "less",
        explanation: "وقتی مخرج‌ها برابرند، کسری که صورت بزرگ‌تری دارد بزرگ‌تر است."
    },
    {
        first: "۲/۳",
        second: "۲/۵",
        answer: "greater",
        explanation: "صورت‌ها برابرند. در این حالت هرچه مخرج کوچک‌تر باشد، کسر بزرگ‌تر است."
    },
    {
        first: "۳/۴",
        second: "۳/۷",
        answer: "greater",
        explanation: "صورت‌ها برابرند و ۴ از ۷ کوچک‌تر است؛ پس ۳/۴ بزرگ‌تر است."
    },
    {
        first: "۴/۹",
        second: "۴/۵",
        answer: "less",
        explanation: "صورت‌ها برابرند. چون ۵ مخرج کوچک‌تری است، کسر ۴/۵ بزرگ‌تر است."
    },
    {
        first: "۳/۴",
        second: "۲/۳",
        answer: "greater",
        explanation: "با مخرج مشترک ۱۲، کسرها ۹/۱۲ و ۸/۱۲ می‌شوند؛ پس ۳/۴ بزرگ‌تر است."
    },
    {
        first: "۵/۶",
        second: "۷/۹",
        answer: "greater",
        explanation: "با مخرج مشترک ۱۸، کسرها ۱۵/۱۸ و ۱۴/۱۸ می‌شوند؛ پس ۵/۶ بزرگ‌تر است."
    },
    {
        first: "۲/۵",
        second: "۴/۱۰",
        answer: "equal",
        explanation: "اگر صورت و مخرج ۲/۵ را در ۲ ضرب کنیم، ۴/۱۰ به دست می‌آید؛ پس دو کسر برابرند."
    },
    {
        first: "۵/۸",
        second: "۳/۴",
        answer: "less",
        explanation: "با مخرج مشترک ۸، کسر ۳/۴ برابر ۶/۸ است؛ پس ۵/۸ کوچک‌تر است."
    }
];

// وضعیت بازی
let currentQuestion = 0;
let score = 0;
let attempts = 0;
let questionAnswered = false;

// نام سرزمین‌ها
function getStageName(index) {
    if (index < 3) {
        return "🌳 جنگل کسرها";
    }

    if (index < 6) {
        return "⛰️ کوهستان کسرها";
    }

    return "🕯️ غار اسرارآمیز کسرها";
}

// به‌روزرسانی نوار پیشرفت
function updateProgress(value) {
    const percentage = (value / questions.length) * 100;

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressTrack").setAttribute(
        "aria-valuenow",
        value
    );
}

// شروع مأموریت
startButton.addEventListener("click", function() {
    welcomeScreen.hidden = true;
    missionScreen.hidden = false;
});

// ورود به سؤال‌ها
enterGameButton.addEventListener("click", function() {
    missionScreen.hidden = true;
    questionScreen.hidden = false;

    showQuestion();
});

// نمایش سؤال
function showQuestion() {
    const question = questions[currentQuestion];

    attempts = 0;
    questionAnswered = false;

    document.getElementById("questionNumber").textContent =
        (currentQuestion + 1).toLocaleString("fa-IR");

    document.getElementById("currentScore").textContent =
        score.toLocaleString("fa-IR");

    document.getElementById("stageTitle").textContent =
        getStageName(currentQuestion);

    document.getElementById("fractionQuestion").textContent =
        question.first + "　　 " + question.second;

    feedback.textContent = "";
    nextQuestionButton.hidden = true;

    updateProgress(currentQuestion);

    // ساخت گزینه‌ها
    let options = [
        {
            value: "greater",
            text: question.first + " بزرگ‌تر است"
        },
        {
            value: "less",
            text: question.second + " بزرگ‌تر است"
        },
        {
            value: "equal",
            text: "دو کسر برابرند"
        }
    ];

    // جابه‌جایی تصادفی گزینه‌ها
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    answerOptions.innerHTML = "";

    options.forEach(function(option) {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.dataset.answer = option.value;
        button.textContent = option.text;

        answerOptions.appendChild(button);
    });
}

// متن پاسخ صحیح
function getCorrectAnswerText(answer) {
    const question = questions[currentQuestion];

    if (answer === "greater") {
        return question.first + " بزرگ‌تر است";
    }

    if (answer === "less") {
        return question.second + " بزرگ‌تر است";
    }

    return "دو کسر برابرند";
}

// پایان پاسخ‌گویی به سؤال
function finishQuestion() {
    questionAnswered = true;

    const buttons = answerOptions.querySelectorAll("button");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    nextQuestionButton.hidden = false;
    updateProgress(currentQuestion + 1);
}

// بررسی پاسخ دانش‌آموز
answerOptions.addEventListener("click", function(event) {
    const button = event.target.closest(".answer-button");

    if (!button || questionAnswered) {
        return;
    }

    const selectedAnswer = button.dataset.answer;
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {

        if (attempts === 0) {
            score += 10;

            feedback.textContent =
                "آفرین! پاسخ درست است. ۱۰ امتیاز گرفتی! 🌟";
        } else {
            score += 5;

            feedback.textContent =
                "آفرین! این بار درست پاسخ دادی. ۵ امتیاز گرفتی! ⭐";
        }

        feedback.textContent +=
            "\n📘 نکته آموزشی: " +
            questions[currentQuestion].explanation;

        finishQuestion();

    } else {

        attempts++;

        if (attempts === 1) {
            feedback.textContent =
                "نزدیک بود! دوباره فکر کن. 💡";
        } else {
            feedback.textContent =
                "پاسخ درست: " +
                getCorrectAnswerText(correctAnswer) +
                "\n📘 نکته آموزشی: " +
                questions[currentQuestion].explanation;

            finishQuestion();
        }
    }

    document.getElementById("currentScore").textContent =
        score.toLocaleString("fa-IR");
});

// نمایش نتیجه نهایی
function showResult() {
    questionScreen.hidden = true;
    resultScreen.hidden = false;

    document.getElementById("finalScore").textContent =
        score.toLocaleString("fa-IR");

    let title = "";
    let message = "";

    if (score >= 90) {
        title = "قهرمان سرزمین کسرها 🏆";
        message = "فوق‌العاده بود! تو قهرمان واقعی این سرزمین هستی.";
    } else if (score >= 75) {
        title = "ماجراجوی دانا 🌟";
        message = "آفرین! دانش و دقت تو بسیار ارزشمند است.";
    } else if (score >= 50) {
        title = "کاوشگر پرتلاش 🌳";
        message = "تلاش خوبی داشتی! با تمرین بیشتر موفق‌تر می‌شوی.";
    } else {
        title = "تازه‌وارد سرزمین کسرها 🌱";
        message = "نگران نباش! هر قهرمانی از اولین قدم شروع می‌کند.";
    }

    document.getElementById("finalTitle").textContent = title;
    document.getElementById("finalMessage").textContent = message;

    updateProgress(10);
}

// رفتن به سؤال بعدی
nextQuestionButton.addEventListener("click", function() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    showQuestion();
});

// شروع دوباره بازی
replayButton.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    attempts = 0;
    questionAnswered = false;

    resultScreen.hidden = true;
    missionScreen.hidden = true;
    questionScreen.hidden = true;

    welcomeScreen.hidden = false;

    nextQuestionButton.hidden = true;
    feedback.textContent = "";
    exitMessage.hidden = true;

    replayButton.hidden = false;
    exitButton.hidden = false;

    updateProgress(0);
});

// پایان بازی
exitButton.addEventListener("click", function() {
    exitMessage.hidden = false;
    replayButton.hidden = true;
    exitButton.hidden = true;
});