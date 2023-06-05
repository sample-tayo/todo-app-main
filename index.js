'use strict';
// darkmode-lightmode toggle
const icon = document.querySelector('#icon');
icon.addEventListener('click', toggleDarkMode);
const body = document.body;

function toggleDarkMode() {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    icon.src = '/images/icon-moon.svg';
  } else {
    icon.src = '/images/icon-sun.svg';
  }
}

// Declare an empty array to store items
const itemList = [];

// to-do js class declaration
const inputField = document.querySelector('input[type="text"]');
const input = inputField.textContent;

// place holder function
//  The function changes the placeholder text of an input field when it is focused and blurred.
const placeHolderContent = function placeHolderContent() {
  inputField.addEventListener('focus', function () {
    inputField.placeholder = 'Currently Typing';
  });
  inputField.addEventListener('blur', function () {
    inputField.placeholder = 'Create a new todo';
  });
};
placeHolderContent();

// Creating elements and declearing their classes
const inputCheckbox = document.querySelector('#checkbox');
const toDoCheckbox = document.querySelector('.checkbox');
const parentContainer = document.querySelector('.todo-items');
const unOrderedListedItems = document.querySelector('.items-container');
const itemsLeft = document.querySelector('.items-details li:first-child');

//  function to create element items
function elementCreation() {
  const Item = document.createElement('li');
  Item.classList.add('items');
  Item.id = 'parent-hover';

  const checkbox1 = document.createElement('input');
  checkbox1.type = 'checkbox';
  checkbox1.classList.add('checkbox');

  const paragraph1 = document.createElement('p');
  paragraph1.textContent = inputField.value.trim();
  checkbox1.addEventListener('change', function () {
    if (checkbox1.checked) {
      paragraph1.style.textDecoration = 'line-through';
      paragraph1.style.color = 'var(--Dark-Grayish-Blue)';
    } else {
      paragraph1.style.textDecoration = 'none';
      paragraph1.style.color = ' ';
    }
  });

  const deleteImage1 = document.createElement('img');
  deleteImage1.src = '/images/icon-cross.svg';
  deleteImage1.alt = 'delete';
  deleteImage1.classList.add('delete');

  deleteImage1.addEventListener('click', function () {
    Item.remove(); // Remove the li element when delete button is

    // Remove the item from the itemList array
    const index = itemList.indexOf(Item);
    if (index > -1) {
      itemList.splice(index, 1);
      console.log(itemList, 'item deleted');
      itemsLeft.textContent = `${itemList.length} items left`;
    }
  });

  Item.appendChild(checkbox1);
  Item.appendChild(paragraph1);
  Item.appendChild(deleteImage1);
  unOrderedListedItems.prepend(Item);
  parentContainer.appendChild(unOrderedListedItems);

  // Push the created item to the array
  itemList.push(Item);
}

console.log(itemList);

//  eventlistener add to the input field and when enter button is clicked, the fuction to create element is called
inputField.addEventListener('keydown', function (event) {
  const inputValue = inputField.value.trim();
  if (event.key === 'Enter') {
    if (inputValue !== '') {
      elementCreation();
      inputField.value = '';
      console.log(`${itemList.length} items left`);
      itemsLeft.textContent = `${itemList.length} items left`;
    }
  }
});

const activeItems = document.querySelector('.items-details li:nth-child(3)');
const completedItems = document.querySelector('.items-details li:nth-child(4)');
const clearCompletedItems = document.querySelector(
  '.items-details li:nth-child(5)'
);
const allItems = document.querySelector('.items-details li:nth-child(2)');

// applying display none to items checked when active is clicked
activeItems.addEventListener('click', function () {
  const items = unOrderedListedItems.querySelectorAll('.items');

  items.forEach(function (item) {
    const checkbox = item.querySelector('.checkbox');
    if (checkbox.checked) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  });
});
//  displaying all items when all is clicked
allItems.addEventListener('click', function () {
  const items = unOrderedListedItems.querySelectorAll('.items');

  items.forEach(function (item) {
    const checkbox = item.querySelector('.checkbox');
    if (item.classList.contains('hidden')) {
      item.classList.remove('hidden');
    }
  });
});

completedItems.addEventListener('click', function () {
  const items = unOrderedListedItems.querySelectorAll('.items');

  items.forEach(function (item) {
    const checkbox = item.querySelector('.checkbox');
    if (!checkbox.checked) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  });
});
