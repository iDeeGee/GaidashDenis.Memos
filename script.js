document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');

    loadNotes();

    addNoteBtn.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNoteToDOM(noteText);
            saveNote(noteText);
            noteInput.value = '';
        }
    });

    function addNoteToDOM(text, isNew = true) {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.innerHTML = `
            <span>${text}</span>
            <div>
                <button class="edit">Редактировать</button>
                <button class="delete">Удалить</button>
            </div>
        `;
        if (isNew) {
            notesContainer.appendChild(noteEl);
        } else {
            notesContainer.insertBefore(noteEl, notesContainer.firstChild);
        }

        noteEl.querySelector('.delete').addEventListener('click', function() {
            noteEl.remove();
            deleteNote(text);
        });

        noteEl.querySelector('.edit').addEventListener('click', function() {
            const newText = prompt("Редактировать заметку:", text);
            if (newText && newText.trim() !== text) {
                noteEl.querySelector('span').textContent = newText;
                updateNote(text, newText.trim());
            }
        });
    }

    function saveNote(text) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(text);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function deleteNote(text) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== text);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function updateNote(oldText, newText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const index = notes.indexOf(oldText);
        if (index !== -1) {
            notes[index] = newText;
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }

    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNoteToDOM(note, false));
    }
});