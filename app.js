/**
 * ============================================================
 *  DSMUN — Model United Nations Delegate Companion App
 *  Main Application Logic (app.js)
 * ============================================================
 *  Pure vanilla JS · No imports · Single IIFE
 * ============================================================
 */
(function () {
  'use strict';

  /* ──────────────────────────────────────────────
   *  DATA
   * ────────────────────────────────────────────── */

  // --- Quiz Data (10 THIMUN RoP scenarios) ---
  const quizData = [
    {
      scenario:
        "During a speech, a delegate stands and says 'Point of Information!' to ask the speaker a question.",
      question: 'Is this procedurally correct?',
      options: [
        'Yes, Points of Information can interrupt a speech',
        'No, Points of Information cannot interrupt a speech',
        'Only if the Chair allows it',
        'Only during voting procedures',
      ],
      correct: 1,
      explanation:
        'Points of Information CANNOT interrupt a speech. The delegate must wait until the speaker yields to Points of Information or until the speech is finished.',
    },
    {
      scenario:
        'A delegate cannot hear the speaker and raises their placard.',
      question: 'What type of point should they raise?',
      options: [
        'Point of Information',
        'Point of Order',
        'Point of Personal Privilege',
        'Motion to Adjourn',
      ],
      correct: 2,
      explanation:
        'Point of Personal Privilege is used for audibility issues. This is the ONLY point that can interrupt a speech — and only if the delegate cannot hear.',
    },
    {
      scenario:
        'A delegate notices the Chair has skipped a required vote on an amendment before moving to the next clause.',
      question: 'What should the delegate raise?',
      options: [
        'Point of Information',
        'Point of Order',
        'Point of Personal Privilege',
        'Motion to Table the Debate',
      ],
      correct: 1,
      explanation:
        'Point of Order is used when there is a procedural error. The Chair has made a procedural mistake by skipping the vote.',
    },
    {
      scenario:
        'During voting procedures, a delegate wants to pass a note to another delegation.',
      question: 'Is this allowed?',
      options: [
        'Yes, note-passing is always allowed',
        'Only with Chair permission',
        'No, all communication is suspended during voting',
        'Only between co-submitters',
      ],
      correct: 2,
      explanation:
        'During voting procedures, ALL points are out of order and all communication (note-passing, talking) is prohibited until voting ends.',
    },
    {
      scenario:
        "A delegate says: 'I think this resolution is fundamentally flawed.'",
      question: 'What is wrong with this statement?',
      options: [
        'Nothing, it is a valid opinion',
        "The delegate used first person ('I think') instead of third person",
        'The delegate was too harsh',
        'Delegates cannot criticize resolutions',
      ],
      correct: 1,
      explanation:
        "Delegates must ALWAYS speak in third person. The correct form would be: 'The delegate of [Country] believes this resolution is fundamentally flawed.'",
    },
    {
      scenario:
        'A delegate wants to make changes to a resolution that is currently being debated.',
      question: 'What is the correct procedure?',
      options: [
        'Ask the main submitter to change it',
        'Raise a Point of Order',
        'Propose an amendment',
        'Submit a new resolution',
      ],
      correct: 2,
      explanation:
        'To change a resolution during debate, a delegate must propose a formal amendment. The amendment is then debated and voted on separately.',
    },
    {
      scenario:
        'A delegate rises to speak but is not wearing their blazer/jacket.',
      question: 'What should happen?',
      options: [
        'They can speak normally',
        'The Chair should ask them to put on their jacket before speaking',
        'They receive a warning',
        'They are removed from the committee',
      ],
      correct: 1,
      explanation:
        'In THIMUN procedure, a delegate must have their jacket/blazer on anytime they stand to speak. The Chair should remind them of this dress code requirement.',
    },
    {
      scenario:
        'After a particularly moving speech, several delegates begin clapping.',
      question: 'Is clapping in order?',
      options: [
        'Yes, always encouraged',
        "It depends on the Chair's ruling",
        'No, clapping is never allowed',
        'Only after voting results',
      ],
      correct: 1,
      explanation:
        "Clapping is at the Chair's discretion. The Chair may say 'Clapping is in order' or 'Clapping is not in order' to maintain decorum.",
    },
    {
      scenario:
        "A resolution has sub-clauses: 'a. monitoring diamond trades'. The delegate only listed one sub-item.",
      question: 'Is this correct formatting?',
      options: [
        'Yes, any number of sub-clauses is fine',
        'No, if you use sub-clauses, you need at least two (a. requires b.)',
        'Sub-clauses are not allowed',
        'Only operative clauses can have sub-clauses',
      ],
      correct: 1,
      explanation:
        "If you use sub-clauses, you must have at least two. A list with only 'a.' and nothing else is incorrect formatting — 'a.' requires at least 'b.'",
    },
    {
      scenario:
        "The debate time has elapsed. A delegate stands and says 'Motion to extend debate time by 5 minutes.'",
      question: 'What happens next?',
      options: [
        'The Chair automatically grants the extension',
        'The motion is voted on by the House',
        'The Chair decides without a vote',
        'Extensions are not allowed',
      ],
      correct: 1,
      explanation:
        "A motion to extend debate time requires a vote. The Chair will ask 'Will all those in favour of extending debate time please raise their placards?' The House decides.",
    },
  ];

  // --- Country data (30 common MUN countries) ---
  const countries = [
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'Iran', flag: '🇮🇷' },
    { name: 'Iraq', flag: '🇮🇶' },
    { name: 'Israel', flag: '🇮🇱' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Pakistan', flag: '🇵🇰' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'South Korea', flag: '🇰🇷' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Türkiye', flag: '🇹🇷' },
    { name: 'Ukraine', flag: '🇺🇦' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Venezuela', flag: '🇻🇪' },
  ];

  /* ──────────────────────────────────────────────
   *  STATE
   * ────────────────────────────────────────────── */

  // Quiz
  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  // Timer
  let timerSeconds = 90;
  let timerInterval = null;
  let timerRunning = false;
  let timerInitialSeconds = 90;

  /* ──────────────────────────────────────────────
   *  1. NAVIGATION
   * ────────────────────────────────────────────── */

  /**
   * Show a specific page by its ID and hide every other .page element.
   * Also updates the bottom navigation bar highlight.
   */
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(function (page) {
      page.classList.remove('active');
    });

    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
    }

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Keep bottom nav in sync
    updateNav(pageId);
  }

  /**
   * Map page IDs → bottom-nav item indices and set the .active class
   * on the correct .nav-item button.
   */
  function updateNav(pageId) {
    // Map of page IDs to the index of their corresponding nav item.
    // Pages that don't map to a specific nav item default to 0 (home / portal).
    const navMap = {
      'portal-page': 0,
      'speech-guide-page': 1,
      'resolution-builder-page': 2,
      'resolution-guide-page': 2,
      'quiz-page': 3,
      'timer-page': 4,
      'language-guide-page': 0,
      'student-officer-guide-page': 0,
      'flow-of-debate-page': 0,
      'chair-sim-page': 0,
    };

    const navItems = document.querySelectorAll('.nav-item');
    const activeIndex =
      navMap[pageId] !== undefined ? navMap[pageId] : 0;

    navItems.forEach(function (item, i) {
      item.classList.toggle('active', i === activeIndex);
    });
  }

  /**
   * Bind navigation clicks: .nav-item buttons, .feature-card elements,
   * and all .back-btn buttons.
   */
  function bindNavigation() {
    // Bottom nav items — each should have a data-page attribute
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const pageId = this.dataset.page;
        if (pageId) showPage(pageId);
      });
    });

    // Feature cards on the portal page
    document.querySelectorAll('.feature-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const pageId = this.dataset.page;
        if (pageId) showPage(pageId);
      });
    });

    // Back buttons → return to portal
    document.querySelectorAll('.back-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showPage('portal-page');
      });
    });
  }

  /* ──────────────────────────────────────────────
   *  2. ACCORDION
   * ────────────────────────────────────────────── */

  /**
   * Toggle an accordion section open / closed.
   * When opening a section, close the other accordions in the same
   * parent .section container to keep the UI tidy.
   */
  function toggleAccordion(header) {
    const content = header.nextElementSibling;
    if (!content || !content.classList.contains('accordion-content')) return;

    const isOpening = !header.classList.contains('active');

    // Close siblings within the same parent .section
    if (isOpening) {
      const section = header.closest('.section') || header.parentElement;
      section.querySelectorAll('.accordion-header.active').forEach(function (h) {
        h.classList.remove('active');
        const c = h.nextElementSibling;
        if (c) c.classList.remove('active');
      });
    }

    header.classList.toggle('active', isOpening);
    content.classList.toggle('active', isOpening);
  }

  function bindAccordion() {
    document.querySelectorAll('.accordion-header').forEach(function (header) {
      header.addEventListener('click', function () {
        toggleAccordion(this);
      });
    });
  }

  /* ──────────────────────────────────────────────
   *  3. SPEECH TABS
   * ────────────────────────────────────────────── */

  /**
   * Switch between speech-guide tabs (e.g. "opening", "closing", etc.).
   */
  function openSpeechTab(tabName, btnElement) {
    const page = document.getElementById('speech-guide-page');
    if (!page) return;

    // Hide every tab content panel
    page.querySelectorAll('.speech-content').forEach(function (el) {
      el.classList.remove('active');
    });

    // De-activate every tab button
    page.querySelectorAll('.speech-tab-btn').forEach(function (btn) {
      btn.classList.remove('active');
    });

    // Activate the target panel
    const target = page.querySelector(
      '.speech-content[data-tab="' + tabName + '"], #speech-' + tabName
    );
    if (target) target.classList.add('active');

    // Activate the clicked button
    if (btnElement) btnElement.classList.add('active');
  }

  function bindSpeechTabs() {
    document.querySelectorAll('.speech-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const tabName = this.dataset.tab;
        if (tabName) openSpeechTab(tabName, this);
      });
    });
  }

  /* ──────────────────────────────────────────────
   *  4. TEXT-TO-SPEECH
   * ────────────────────────────────────────────── */

  /**
   * Speak the given text using the Web Speech Synthesis API.
   * Cancels any currently playing speech first.
   * @param {string} text  - The text to speak.
   * @param {number} rate  - Speech rate (default 1).
   */
  function speakText(text, rate) {
    if (typeof rate === 'undefined') rate = 1;
    if (!window.speechSynthesis) return;

    // Cancel anything currently playing
    window.speechSynthesis.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }

  /** Stop any ongoing speech synthesis. */
  function stopSpeech() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function bindSpeakButtons() {
    document.querySelectorAll('.speak-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = this.dataset.text || '';
        var rate = parseFloat(this.dataset.rate) || 1;
        if (text) {
          speakText(text, rate);
        }
      });
    });

    // Speech Studio FOR/AGAINST TTS buttons
    var forBtn = document.getElementById('speak-for-btn');
    var againstBtn = document.getElementById('speak-against-btn');
    var stopBtn = document.getElementById('stop-speech-btn');

    function getActiveSpeechText(type) {
      var page = document.getElementById('speech-guide-page');
      if (!page) return '';
      var activeContent = page.querySelector('.speech-content.active');
      if (!activeContent) return '';
      var box = activeContent.querySelector(type === 'for' ? '.speech-for p' : '.speech-against p');
      return box ? box.textContent : '';
    }

    if (forBtn) {
      forBtn.addEventListener('click', function () {
        var text = getActiveSpeechText('for');
        if (text) {
          speakText(text, 0.9);
          if (stopBtn) stopBtn.style.display = 'inline-block';
        }
      });
    }

    if (againstBtn) {
      againstBtn.addEventListener('click', function () {
        var text = getActiveSpeechText('against');
        if (text) {
          speakText(text, 0.9);
          if (stopBtn) stopBtn.style.display = 'inline-block';
        }
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', function () {
        stopSpeech();
        this.style.display = 'none';
      });
    }
  }

  /* ──────────────────────────────────────────────
   *  5. RESOLUTION BUILDER
   * ────────────────────────────────────────────── */

  /** Assemble the full resolution preview from inputs. */
  function updateResoPreview() {
    var forum = (val('#reso-forum') || '').trim();
    var question = (val('#reso-question') || '').trim();
    var submitter = (val('#reso-submitter') || '').trim();
    var coSubmitters = (val('#reso-cosubmitters') || '').trim();
    var preamble = (val('#reso-preamble-text') || '').trim();
    var operative = (val('#reso-operative-text') || '').trim();

    var text =
      'FORUM: ' + forum + '\n' +
      'QUESTION OF: ' + question + '\n' +
      'SUBMITTED BY: ' + submitter + '\n' +
      'CO-SUBMITTERS: ' + coSubmitters + '\n\n' +
      'THE ' + forum.toUpperCase() + ',\n' +
      preamble + '\n' +
      operative;

    var preview = document.getElementById('reso-preview');
    if (preview) preview.textContent = text;

    return text;
  }

  /**
   * Validate the resolution and display pass/fail items
   * inside #syntax-results.
   */
  function validateResolution() {
    var results = [];

    var forum = (val('#reso-forum') || '').trim();
    var question = (val('#reso-question') || '').trim();
    var submitter = (val('#reso-submitter') || '').trim();
    var coSubmitters = (val('#reso-cosubmitters') || '').trim();
    var preamble = (val('#reso-preamble-text') || '').trim();
    var operative = (val('#reso-operative-text') || '').trim();

    // 1. Forum not empty
    results.push({
      pass: forum.length > 0,
      message: forum.length > 0
        ? 'Forum is specified.'
        : 'Forum is missing.',
    });

    // 2. Question not empty
    results.push({
      pass: question.length > 0,
      message: question.length > 0
        ? 'Question is specified.'
        : 'Question is missing.',
    });

    // 3. Submitter not empty
    results.push({
      pass: submitter.length > 0,
      message: submitter.length > 0
        ? 'Submitter is specified.'
        : 'Submitter is missing.',
    });

    // 4. Co-submitters alphabetical order
    if (coSubmitters.length > 0) {
      var subs = coSubmitters.split(',').map(function (s) {
        return s.trim();
      });
      var sorted = subs.slice().sort(function (a, b) {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
      });
      var isAlpha = subs.every(function (s, i) {
        return s === sorted[i];
      });
      results.push({
        pass: isAlpha,
        message: isAlpha
          ? 'Co-submitters are in alphabetical order.'
          : 'Co-submitters are NOT in alphabetical order.',
      });
    } else {
      results.push({
        pass: true,
        message: 'No co-submitters listed (optional).',
      });
    }

    // 5. Preamble lines end with comma
    if (preamble.length > 0) {
      var pLines = preamble
        .split('\n')
        .map(function (l) { return l.trim(); })
        .filter(function (l) { return l.length > 0; });
      var preambleOk = pLines.every(function (line) {
        var last = line.charAt(line.length - 1);
        return last === ',';
      });
      results.push({
        pass: preambleOk,
        message: preambleOk
          ? 'All preambulatory clauses end with a comma.'
          : 'Some preambulatory clauses do NOT end with a comma.',
      });
    } else {
      results.push({
        pass: false,
        message: 'Preamble is empty.',
      });
    }

    // 6. Operative lines end with semicolon, last ends with period
    if (operative.length > 0) {
      var oLines = operative
        .split('\n')
        .map(function (l) { return l.trim(); })
        .filter(function (l) { return l.length > 0; });
      if (oLines.length === 0) {
        results.push({ pass: false, message: 'Operative text has no content lines.' });
      } else {
        var allButLast = oLines.slice(0, -1);
        var lastLine = oLines[oLines.length - 1];
        var semiOk = allButLast.every(function (line) {
          return line.charAt(line.length - 1) === ';';
        });
        var periodOk = lastLine.charAt(lastLine.length - 1) === '.';
        var operativeOk = semiOk && periodOk;
        results.push({
          pass: operativeOk,
          message: operativeOk
            ? 'Operative clauses end correctly (semicolons; last with period).'
            : 'Operative clause punctuation is incorrect. Lines should end with ";" except the last which ends with "."',
        });
      }
    } else {
      results.push({
        pass: false,
        message: 'Operative text is empty.',
      });
    }

    // Render results
    var container = document.getElementById('syntax-results');
    if (container) {
      container.innerHTML = results
        .map(function (r) {
          var cls = r.pass ? 'syntax-item pass' : 'syntax-item fail';
          var icon = r.pass ? '✅' : '❌';
          return '<div class="' + cls + '">' + icon + ' ' + r.message + '</div>';
        })
        .join('');
    }

    return results;
  }

  /**
   * Insert a clause phrase at the cursor position of the correct textarea.
   * @param {string} clause - The clause phrase (e.g. "Deeply concerned,").
   * @param {string} type   - "preamble" or "operative".
   */
  function insertClause(clause, type) {
    var targetId =
      type === 'preamble' ? '#reso-preamble-text' : '#reso-operative-text';
    var textarea = document.querySelector(targetId);
    if (!textarea) return;

    // Build formatted text: italic placeholder for preamble, underline for operative
    var formatted;
    if (type === 'preamble') {
      formatted = '_' + clause + '_';   // italic placeholder
    } else {
      formatted = '__' + clause + '__'; // underline placeholder
    }

    // Insert at cursor (or append)
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var before = textarea.value.substring(0, start);
    var after = textarea.value.substring(end);
    textarea.value = before + formatted + ' ' + after;

    // Move cursor after the inserted text
    var newPos = start + formatted.length + 1;
    textarea.selectionStart = newPos;
    textarea.selectionEnd = newPos;
    textarea.focus();

    // Trigger preview update
    updateResoPreview();
    validateResolution();
  }

  function bindResolutionBuilder() {
    // Live preview on any input change
    var inputIds = [
      '#reso-forum',
      '#reso-question',
      '#reso-submitter',
      '#reso-cosubmitters',
      '#reso-preamble-text',
      '#reso-operative-text',
    ];

    inputIds.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) {
        el.addEventListener('input', function () {
          updateResoPreview();
          validateResolution();
        });
      }
    });

    // Clause chips
    document.querySelectorAll('.clause-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var clause = this.dataset.clause;
        var type = this.dataset.type; // "preamble" or "operative"
        if (clause && type) insertClause(clause, type);
      });
    });

    // Copy button
    var copyBtn = document.getElementById('reso-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var preview = document.getElementById('reso-preview');
        var text = preview ? preview.textContent : '';
        if (navigator.clipboard && text) {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.textContent = 'Copied!';
            setTimeout(function () {
              copyBtn.textContent = 'Copy Resolution';
            }, 1500);
          });
        }
      });
    }

    // Export button
    var exportBtn = document.getElementById('reso-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        var preview = document.getElementById('reso-preview');
        var text = preview ? preview.textContent : '';
        if (!text) return;

        var blob = new Blob([text], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resolution.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Initial preview render
    updateResoPreview();
    validateResolution();
  }

  /* ──────────────────────────────────────────────
   *  6. ROP QUIZ
   * ────────────────────────────────────────────── */

  /**
   * Render the current quiz question, progress bar, and score.
   * Uses event delegation so dynamically created buttons work.
   */
  function renderQuiz() {
    var container = document.getElementById('quiz-container');
    if (!container) return;

    answered = false;
    var q = quizData[currentQuestion];
    var progress = ((currentQuestion) / quizData.length) * 100;

    var html =
      '<div class="quiz-progress"><div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div></div>' +
      '<div class="quiz-score">Score: ' + score + ' / ' + quizData.length + '</div>' +
      '<div class="quiz-question-count">Question ' + (currentQuestion + 1) + ' of ' + quizData.length + '</div>' +
      '<div class="scenario-box">' +
        '<p class="scenario-label">📋 Scenario</p>' +
        '<p>' + q.scenario + '</p>' +
      '</div>' +
      '<p class="quiz-question">' + q.question + '</p>' +
      '<div class="quiz-options">';

    q.options.forEach(function (opt, i) {
      html += '<button class="quiz-option" data-index="' + i + '">' + opt + '</button>';
    });

    html +=
      '</div>' +
      '<div class="quiz-explanation" id="quiz-explanation">' +
        '<p>' + q.explanation + '</p>' +
      '</div>' +
      '<button class="quiz-next-btn" id="quiz-next-btn">Next Question →</button>';

    container.innerHTML = html;
  }

  /**
   * Handle answer selection.
   */
  function selectAnswer(index) {
    if (answered) return;
    answered = true;

    var q = quizData[currentQuestion];
    var options = document.querySelectorAll('.quiz-option');

    options.forEach(function (opt, i) {
      opt.classList.add('disabled');
      if (i === q.correct) {
        opt.classList.add('correct');
      }
      if (i === index && index !== q.correct) {
        opt.classList.add('wrong');
      }
    });

    if (index === q.correct) {
      score++;
      // Update live score display
      var scoreEl = document.querySelector('.quiz-score');
      if (scoreEl) scoreEl.textContent = 'Score: ' + score + ' / ' + quizData.length;
    }

    // Show explanation & next button
    var explanation = document.getElementById('quiz-explanation');
    if (explanation) explanation.classList.add('visible');
    var nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.classList.add('visible');
  }

  /** Advance to next question or show results. */
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= quizData.length) {
      showQuizResults();
    } else {
      renderQuiz();
    }
  }

  /** Show the final quiz results screen. */
  function showQuizResults() {
    var container = document.getElementById('quiz-container');
    if (!container) return;

    var pct = Math.round((score / quizData.length) * 100);
    var message;
    if (pct === 100) {
      message = '🏆 Perfect score! You\'re a THIMUN procedure expert!';
    } else if (pct >= 80) {
      message = '🌟 Excellent! You have a strong grasp of procedure.';
    } else if (pct >= 60) {
      message = '👍 Good effort! Review a few more rules and you\'ll be ready.';
    } else if (pct >= 40) {
      message = '📚 Keep studying! Read through the Rules of Procedure again.';
    } else {
      message = '💪 Don\'t give up! Practice makes perfect — review the guide and try again.';
    }

    container.innerHTML =
      '<div class="quiz-results">' +
        '<div class="score-circle">' +
          '<span class="score-number">' + score + '</span>' +
          '<span class="score-total">/ ' + quizData.length + '</span>' +
        '</div>' +
        '<p class="score-pct">' + pct + '%</p>' +
        '<p class="score-message">' + message + '</p>' +
        '<button class="quiz-restart-btn" id="quiz-restart-btn">🔄 Restart Quiz</button>' +
      '</div>';
  }

  /** Reset quiz state and start over. */
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    renderQuiz();
  }

  /**
   * Use event delegation on the quiz container so dynamically
   * rendered buttons always work.
   */
  function bindQuiz() {
    var container = document.getElementById('quiz-container');
    if (!container) return;

    container.addEventListener('click', function (e) {
      var target = e.target;

      // Option click
      if (target.classList.contains('quiz-option')) {
        var index = parseInt(target.dataset.index, 10);
        if (!isNaN(index)) selectAnswer(index);
        return;
      }

      // Next button
      if (target.id === 'quiz-next-btn') {
        nextQuestion();
        return;
      }

      // Restart button
      if (target.id === 'quiz-restart-btn') {
        restartQuiz();
      }
    });

    // Initial render
    renderQuiz();
  }

  /* ──────────────────────────────────────────────
   *  7. DEBATE TIMER
   * ────────────────────────────────────────────── */

  /** Format seconds as MM:SS and render into #timer-display. */
  function renderTimer() {
    var display = document.getElementById('timer-display');
    if (!display) return;

    var mins = Math.floor(timerSeconds / 60);
    var secs = timerSeconds % 60;
    display.textContent =
      (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

    // Visual urgency classes
    display.classList.remove('warning', 'danger');
    if (timerSeconds < 10) {
      display.classList.add('danger');
    } else if (timerSeconds < 30) {
      display.classList.add('warning');
    }
  }

  /** Start the countdown timer. */
  function startTimer() {
    if (timerRunning) return;
    timerRunning = true;

    timerInterval = setInterval(function () {
      if (timerSeconds <= 0) {
        pauseTimer();
        playBeep();
        return;
      }
      timerSeconds--;
      renderTimer();
    }, 1000);

    // Update button text
    var btn = document.getElementById('timer-start');
    if (btn) btn.textContent = '⏸ Pause';
  }

  /** Pause the countdown timer. */
  function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;

    var btn = document.getElementById('timer-start');
    if (btn) btn.textContent = '▶ Start';
  }

  /**
   * Reset the timer to a given number of seconds.
   * @param {number} seconds - Duration to reset to.
   */
  function resetTimer(seconds) {
    pauseTimer();
    if (typeof seconds === 'number' && seconds > 0) {
      timerInitialSeconds = seconds;
    }
    timerSeconds = timerInitialSeconds;
    renderTimer();
  }

  /**
   * Play a short beep using the Web Audio API.
   * 800 Hz oscillator for 200 ms.
   */
  function playBeep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2); // 200 ms

      // Clean up
      osc.onended = function () {
        ctx.close();
      };
    } catch (e) {
      // AudioContext not supported — silently fail
    }
  }

  function bindTimer() {
    // Start / Pause toggle
    var startBtn = document.getElementById('timer-start');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        if (timerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    // Reset
    var resetBtn = document.getElementById('timer-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        resetTimer();
      });
    }

    // Presets (60s, 90s, 120s)
    document.querySelectorAll('.timer-preset').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var secs = parseInt(this.dataset.seconds, 10);
        if (!isNaN(secs) && secs > 0) {
          resetTimer(secs);
        }

        // Highlight active preset
        document.querySelectorAll('.timer-preset').forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');
      });
    });

    // Initial render
    renderTimer();
  }

  /* ──────────────────────────────────────────────
   *  8. VIRTUAL PLACARD
   * ────────────────────────────────────────────── */

  function initPlacard() {
    var select = document.getElementById('country-select');
    var flagEl = document.getElementById('placard-flag');
    var nameEl = document.getElementById('placard-country');
    var container = document.getElementById('placard-container');
    var statusEl = document.getElementById('placard-status');

    if (!select) return;

    // Populate dropdown
    select.innerHTML = '<option value="">— Select Country —</option>';
    countries.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.flag + '  ' + c.name;
      select.appendChild(opt);
    });

    // On country change
    select.addEventListener('change', function () {
      var selected = countries.find(function (c) {
        return c.name === select.value;
      });
      if (selected) {
        if (flagEl) flagEl.textContent = selected.flag;
        if (nameEl) nameEl.textContent = selected.name;
      } else {
        if (flagEl) flagEl.textContent = '🏳️';
        if (nameEl) nameEl.textContent = 'Your Country';
      }
    });

    // Toggle raised state
    if (container) {
      container.addEventListener('click', function () {
        var isRaised = container.classList.toggle('raised');
        if (statusEl) {
          statusEl.textContent = isRaised
            ? 'PLACARD RAISED'
            : 'Tap to raise placard';
        }
      });
    }
  }

  /* ──────────────────────────────────────────────
   *  9. SPLASH SCREEN
   * ────────────────────────────────────────────── */

  function hideSplash() {
    setTimeout(function () {
      var splash = document.getElementById('splash');
      if (splash) splash.classList.add('hidden');
    }, 1500);
  }

  /* ──────────────────────────────────────────────
   *  HELPERS
   * ────────────────────────────────────────────── */

  /** Shorthand: get the .value of a DOM element by selector. */
  function val(selector) {
    var el = document.querySelector(selector);
    return el ? el.value : '';
  }

  /* ──────────────────────────────────────────────
   *  10. INITIALIZATION
   * ────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    // Splash
    hideSplash();

    // Default page
    showPage('portal-page');

    // Bind all event listeners
    bindNavigation();
    bindAccordion();
    bindSpeechTabs();
    bindSpeakButtons();
    bindResolutionBuilder();
    bindQuiz();
    bindTimer();
    initPlacard();
  });
})();
