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

    
});