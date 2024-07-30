document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const itemList = document.getElementById('itemList');

    // Load items from localStorage
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.forEach(item => addItemToList(item));
    };

    // Save items to localStorage
    const saveItems = () => {
        const items = [];
        itemList.querySelectorAll('li').forEach(li => {
            items.push({ text: li.textContent, purchased: li.classList.contains('purchased') });
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    };

    // Add item to list
    const addItemToList = (item) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        li.addEventListener('click', () => {
            li.classList.toggle('purchased');
            saveItems();
        });
        itemList.appendChild(li);
    };

    // Add button click event
    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            addItemToList({ text: itemText, purchased: false });
            itemInput.value = '';
            saveItems();
        }
    });

    // Clear button click event
    clearButton.addEventListener('click', () => {
        itemList.innerHTML = '';
        localStorage.removeItem('shoppingList');
    });

    // Load items when page loads
    loadItems();
});
