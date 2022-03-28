import BoardDoc from './2048doc.js';

const board = new BoardDoc(4, 600, document.body);

const eventfunc = board.evtfunc.bind(board);
addEventListener('keydown', eventfunc);

board.$board.addEventListener('die', () => {
    removeEventListener('keydown', eventfunc);
    document.body.removeChild(board.$board);
    document.body.removeChild(document.getElementById('title'));
    document.getElementById('end_message').style.display = 'block';
});

board.$board.addEventListener('clear', () => {
    removeEventListener('keydown', eventfunc);
    document.body.removeChild(board.$board);
    document.body.removeChild(document.getElementById('title'));
    document.getElementById('clear_message').style.display = 'block';
});