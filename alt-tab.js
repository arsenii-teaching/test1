export const initAltTab = () => {
  const altTab = {
    score: 0,
    timeLeft: 15,
    playing: false,
    timerId: null,
    teacherProgress: 0,
    scoreEl: document.getElementById('alt-tab-score'),
    meterEl: document.getElementById('alt-tab-meter'),
    timeEl: document.getElementById('alt-tab-time'),
    messageEl: document.getElementById('alt-tab-message'),
    teacherEl: document.getElementById('teacher-avatar'),
    button: document.getElementById('alt-tab-action'),
    start: document.getElementById('alt-tab-start'),
    reset: document.getElementById('alt-tab-reset')
  };

  if (!altTab.start || !altTab.button || !altTab.reset || !altTab.scoreEl || !altTab.meterEl || !altTab.timeEl || !altTab.messageEl || !altTab.teacherEl) {
    return;
  }

  const renderAltTab = () => {
    const progress = Math.min(100, (altTab.score / 12) * 100);
    altTab.scoreEl.textContent = String(altTab.score);
    altTab.meterEl.style.width = `${progress}%`;
    altTab.timeEl.textContent = `${altTab.timeLeft}s`;
    altTab.teacherEl.style.left = `${Math.min(88, altTab.teacherProgress)}%`;
  };

  const stopAltTabTimer = () => {
    if (altTab.timerId) {
      clearInterval(altTab.timerId);
      altTab.timerId = null;
    }
  };

  const startAltTabGame = () => {
    stopAltTabTimer();
    altTab.score = 0;
    altTab.timeLeft = 15;
    altTab.teacherProgress = 0;
    altTab.playing = true;
    altTab.messageEl.textContent = 'Focus mode started. The teacher is walking over. React!';
    renderAltTab();

    altTab.timerId = setInterval(() => {
      if (!altTab.playing) return;

      altTab.timeLeft -= 1;
      altTab.teacherProgress += 6 + Math.random() * 8;
      renderAltTab();

      if (altTab.teacherProgress >= 72) {
        stopAltTabTimer();
        altTab.playing = false;
        altTab.messageEl.textContent = 'The teacher caught you scrolling. Try again and keep the code open!';
        return;
      }

      if (altTab.timeLeft <= 0) {
        stopAltTabTimer();
        altTab.playing = false;

        if (altTab.score >= 8) {
          altTab.messageEl.textContent = 'You win! You closed the distraction before the teacher arrived.';
        } else {
          altTab.messageEl.textContent = 'You got distracted. Try again and smash that Alt+Tab habit.';
        }
      }
    }, 1000);
  };

  const handleAltTabFocus = () => {
    if (!altTab.playing) return;

    altTab.score += 1;
    altTab.teacherProgress = Math.max(0, altTab.teacherProgress - 18);
    altTab.messageEl.textContent = 'Nice. You snapped back to coding before the teacher got too close.';
    renderAltTab();

    if (altTab.score >= 8) {
      stopAltTabTimer();
      altTab.playing = false;
      altTab.messageEl.textContent = 'Perfect focus! The teacher never reached your desk.';
    }
  };

  altTab.start.addEventListener('click', startAltTabGame);
  altTab.button.addEventListener('click', handleAltTabFocus);
  altTab.reset.addEventListener('click', () => {
    stopAltTabTimer();
    altTab.score = 0;
    altTab.timeLeft = 15;
    altTab.teacherProgress = 0;
    altTab.playing = false;
    altTab.messageEl.textContent = 'Press Start and stay focused.';
    renderAltTab();
  });

  renderAltTab();
};
