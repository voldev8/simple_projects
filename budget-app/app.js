/*
--to-do list--
*** add event handler
* get input values
** add the new item to our data structure
*add the new item to the UI
**calculate budget
*update the UI
- *UI module **Data module ***controller module -

--to-do list2--
add event handler
delete the item from our data structure
delete the item to the ui
re-calculate the budget
update the ui

--to-do list3--
calculate percentages
update percentages in ui
display the current month and year
number formatting
improve input field ux
*/
//module one
const budgetController = (() => {
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }
    calcPercentage(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
        this.percentage = -1;
      }
    }
    getPercentage() {
      return this.percentage;
    }
  }

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }
  const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((item) => (sum += item.value));
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem(type, des, val) {
      let newItem, id;
      //create new id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }
      //create new item based on inc or exp type
      if (type === 'exp') {
        newItem = new Expense(id, des, val);
      } else if (type === 'inc') {
        newItem = new Income(id, des, val);
      }
      //push it into our data structure
      data.allItems[type].push(newItem);
      //return the new element
      return newItem;
    },

    deleteItem(type, id) {
      let ids, index;
      //map returns brand new array
      ids = data.allItems[type].map((item) => {
        return item.id;
      });

      index = ids.indexOf(id);
      if (index !== -1) data.allItems[type].splice(index, 1);
    },

    calculateBudget() {
      //calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      //calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spend
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages() {
      data.allItems.exp.forEach((item) => item.calcPercentage(data.totals.inc));
    },

    getPercentages() {
      return data.allItems.exp.map((item) => item.getPercentage());
    },

    getBudget() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
    testing() {
      console.log(data);
    },
  };
})();

//module two
const uiController = (() => {
  const domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    removeButton: 'item__delete--btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  const formatNumber = (num, type) => {
    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];
    if (int.length > 3 && int.length <= 6) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  //returns a node list (each element in the list is called node)
  const nodeListForEach = (list, callback) => {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getInput() {
      return {
        type: document.querySelector(domStrings.inputType).value, //type will be inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseFloat(document.querySelector(domStrings.inputValue).value),
      };
    },

    addListItem(obj, type) {
      let html, newHtml, element;
      //create html string with placeholder text
      if (type === 'inc') {
        element = domStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = domStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      //insert the html into dom
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem(selectorId) {
      const el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
    },

    clearFields() {
      let fields;
      fields = document.querySelectorAll(
        domStrings.inputDescription + ', ' + domStrings.inputValue
      );
      fieldsArr = [...fields];
      fieldsArr.forEach((el) => (el.value = ''));
      fieldsArr[0].focus();
    },

    displayBudget(obj) {
      obj.budget > 0 ? (type = 'inc') : (type = 'exp');
      document.querySelector(domStrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(domStrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        'inc'
      );
      document.querySelector(
        domStrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, 'exp');
      if (obj.percentage > 0) {
        document.querySelector(domStrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(domStrings.percentageLabel).textContent = '--';
      }
    },

    displayPercentages(percentages) {
      const fields = document.querySelectorAll(domStrings.expensesPercLabel);

      nodeListForEach(fields, (current, index) => {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '--';
        }
      });
    },

    displayDate() {
      let now, months, month, year;
      now = new Date();
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(domStrings.dateLabel).textContent =
        year + ', ' + months[month];
    },

    changedType() {
      const fields = document.querySelectorAll(
        domStrings.inputType +
          ',' +
          domStrings.inputDescription +
          ',' +
          domStrings.inputValue
      );

      nodeListForEach(fields, (node) => node.classList.toggle('red-focus'));
      document.querySelector(domStrings.inputButton).classList.toggle('red');
    },

    getDomStrings() {
      return domStrings;
    },
  };
})();

//module three global
const controller = ((budgetCtrl, uiCtrl) => {
  const setupEventListeners = () => {
    const dom = uiController.getDomStrings();
    document
      .querySelector(dom.inputButton)
      .addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(dom.container)
      .addEventListener('click', ctrlDeleteItem);

    document
      .querySelector(dom.inputType)
      .addEventListener('change', uiCtrl.changedType);
  };

  const updateBudget = () => {
    //1. calculate the budget
    budgetCtrl.calculateBudget();

    //2.return the budget
    const budget = budgetCtrl.getBudget();

    //3. display the budget on ui
    uiCtrl.displayBudget(budget);
  };

  const updatePercentages = () => {
    //calculate percentages
    budgetCtrl.calculatePercentages();
    //read percentages from the budget controller
    const percentages = budgetCtrl.getPercentages();
    //update the ui with the new percentages
    uiCtrl.displayPercentages(percentages);
  };

  const ctrlAddItem = () => {
    let input, newItem;
    //1. get field input data
    input = uiCtrl.getInput();
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      //2.add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3.add item to the ui
      uiCtrl.addListItem(newItem, input.type);

      //4. clear the fields
      uiCtrl.clearFields();

      //5.calculate and update budget
      updateBudget();

      //6. calculate and update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = (e) => {
    let itemId, splitId, type, id;
    //get the parentNodes id
    itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      //parentNodes id will be in this format = inc-1
      splitId = itemId.split('-');
      type = splitId[0];
      id = parseInt(splitId[1]);

      //1. delete the item from the data structure
      budgetCtrl.deleteItem(type, id);
      //2. delete the item from the ui
      uiCtrl.deleteListItem(itemId);
      //3. update and show the new budget
      updateBudget();
    }
  };

  return {
    init() {
      console.log('app started');
      uiCtrl.displayDate();
      uiCtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, uiController);

controller.init();
