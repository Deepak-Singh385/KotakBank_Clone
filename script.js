'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Kotak  App

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Deepak Singh',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-05-08T14:11:59.604Z',
    '2025-04-29T17:01:17.194Z',
    '2025-05-03T23:36:17.929Z',
    '2025-05-05T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'hi-IN', // de-DE
};

const account2 = {
  owner: 'Roshni Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-02-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-06-25T18:49:59.371Z',
    '2025-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Omkar Mane',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-02-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-06-25T18:49:59.371Z',
    '2025-07-26T12:01:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};

const account4 = {
  owner: 'Ajit Yadav',
  movements: [430, -1000, 1000, 700, 50, 90, -120],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-02-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-06-25T18:49:59.371Z',
    '2025-07-26T12:01:20.894Z',
  ],
  currency: 'CAD',
  locale: 'en-CA',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementsDAte = function (date, locale) {
  const calcDayPass = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calcDayPass(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combineMovsDates = acc.movements.map(function (mov, i) {
    return { movement: mov, movementDate: acc.movementsDates.at(i) };
  });

  if (sort)
    combineMovsDates.sort(function (a, b) {
      return a.movement - b.movement;
    });
  combineMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movementDate);
    const displayDate = formatMovementsDAte(date, acc.locale);
    const formattedMov = formatCurr(movement, acc.local, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (aa, mov) {
    return aa + mov;
  }, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (cacc) {
  const incomes = cacc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);
  labelSumIn.textContent = formatCurr(incomes, cacc.locale, cacc.currency);

  const outcomes = cacc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (mov, a) {
      return mov - a;
    }, 0);
  labelSumOut.textContent = formatCurr(
    Math.abs(outcomes),
    cacc.locale,
    cacc.currency
  );

  const interest = cacc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (a) {
      return (a * cacc.interestRate) / 100;
    })
    .filter(function (int, i, j) {
      // console.log(j);
      return int >= 1;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  labelSumInterest.textContent = formatCurr(
    interest,
    cacc.locale,
    cacc.currency
  );
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

createUserName(accounts);
// console.log(accounts);
// console.log(accounts);
const updateUI = function (a) {
  //Display movements
  displayMovements(a);
  //Display balance
  calcDisplayBalance(a);
  //Display Summary
  calcDisplaySummary(a);
};

const startLogoutTimer = function () {
  const tick = function () {
    const minute = String(Math.trunc(timer / 60)).padStart(2, 0);
    const second = String(timer % 60).padStart(2, 0);

    labelTimer.textContent = `${minute}:${second}`;

    if (timer === 0) {
      clearInterval(time);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    timer--;
  };
  let timer = 120;

  tick();
  const time = setInterval(tick, 1000);

  return time;
};
//Event handler
let currentAcc, timer;

// Fake ALways Logged In
// currentAcc = account1;
// updateUI(currentAcc);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcc = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAcc);

  if (currentAcc?.pin === +inputLoginPin.value) {
    //Display UI and Message
    labelWelcome.textContent = `Good to see you,${
      currentAcc.owner.split(' ')[0]
    }🎉`;
    containerApp.style.opacity = 100;

    //Create Current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAcc.locale,
      options
    ).format(now);
    // const days = `${now.getDate()}`.padStart(2, 0);
    // const months = `${now.getMonth()}`.padStart(2, 0);
    // const years = now.getFullYear();
    // const hours = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${days}/${months}/${years},${hours}:${minute}`;

    //Clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAcc);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAcc.balance >= amount &&
    receiverAcc?.username !== currentAcc.username
  ) {
    //Doing the Transfer
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add Transfer date
    currentAcc.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAcc);

    //Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAcc.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    setTimeout(function () {
      //Giving the Loan
      currentAcc.movements.push(amount);

      //Giving the Loan Date
      currentAcc.movementsDates.push(new Date().toISOString());

      updateUI(currentAcc);

      //Reset Timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.username &&
    +inputClosePin.value === currentAcc.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAcc.username;
    });
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
});

//Footer
const footer = document.getElementById('footer');

// Reusable modal logic
function setupModal(linkId, modalId) {
  const link = document.getElementById(linkId);
  const modal = document.getElementById(modalId);
  const closeBtn = modal.querySelector('.close-btn');

  link.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

setupModal('privacyLink', 'privacyModal');
setupModal('termsLink', 'termsModal');
setupModal('contactLink', 'contactModal');
