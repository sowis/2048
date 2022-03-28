import Board from './2048.js';

const nodeColors = [
    '#FFF8D3', '#FFF1D4', '#FFE9D4', '#FFE2D4', '#FFDBD4',
    '#FFD4D4', '#FFD4E2', '#FFD4F1', '#FFD4FF', '#F1D4FF', 
    '#E2D4FF'
];

export default class BoardDoc {
    constructor(sz, width, $parent) {
        this.sz = sz;
        this.boardWidth = width;
        this.nodeWidth = width / sz;

        this.board = new Board(sz);
        this.$board = document.createElement('div');
        this.$board.setAttribute('class', 'board');
        this.$board.style.width = width + 'px';
        this.$board.style.height = width + 'px';

        this.$childrens = this.createChildrens();
        this.appendChildrens(this.$childrens);

        $parent.appendChild(this.$board);
    }

    createChildrens () {
        const $childrens = [];
        for (const child of this.board.getNodes()) {
            let $child = document.createElement('div', {class:'node'});
            const [y, x] = this.getPos(child.y, child.x);
            $child.style.position = 'absolute';
            $child.style.top = y + 'px';
            $child.style.left = x + 'px';
            $child.style.width = this.nodeWidth + 'px';
            $child.style.height = this.nodeWidth + 'px';
            $child.style.backgroundColor = nodeColors[Math.log2(child.value) - 1];
            $child.setAttribute('class', 'node');
            $child.innerHTML = `<p>${child.value}</p>`;

            $childrens.push($child);
        }

        return $childrens;
    }

    appendChildrens($childrens) {
        for (const $child of $childrens) {
            this.$board.appendChild($child);
        }
    }

    getPos(y, x) {
        return [this.nodeWidth * y, this.nodeWidth * x];
    }

    evtfunc(e) {
        switch (e.key) {
        case 'ArrowLeft':
            this.pressLeft();
            break;

        case 'ArrowDown':
            this.pressDown();
            break;

        case 'ArrowUp' :
            this.pressUp();
            break;

        case 'ArrowRight':
            this.pressRight();
        }
    }

    pressLeft() {
        if (this.board.left() === false) {
            if (this.board.isFull()) {
                this.$board.dispatchEvent(new CustomEvent('die'));
            }

            return;
        }

        if (this.board.isFull()) {
            this.$board.dispatchEvent(new CustomEvent('die'));
            return;
        }

        if (this.board.max() === 2048) {
            this.$board.dispatchEvent(new CustomEvent('clear'));
            return;
        }

        for (let $child of this.$childrens) {
            this.$board.removeChild($child);
        }

        this.board.createNode();
        this.$childrens = this.createChildrens();
        this.appendChildrens(this.$childrens);
    }

    pressRight() {
        if (this.board.right() === false) {
            if (this.board.isFull()) {
                this.$board.dispatchEvent(new CustomEvent('die'));
            }

            return;
        }

        if (this.board.isFull()) {
            this.$board.dispatchEvent(new CustomEvent('die'));
            return;
        }

        if (this.board.max() === 2048) {
            this.$board.dispatchEvent(new CustomEvent('clear'));
            return;
        }

        this.board.createNode();
        for (let $child of this.$childrens) {
            this.$board.removeChild($child);
        }

        this.$childrens = this.createChildrens();
        this.appendChildrens(this.$childrens);
    }

    pressUp() {
        if (this.board.up() === false) {
            if (this.board.isFull()) {
                this.$board.dispatchEvent(new CustomEvent('die'));
            }

            return;
        }

        if (this.board.isFull()) {
            this.$board.dispatchEvent(new CustomEvent('die'));
            return;
        }

        if (this.board.max() === 2048) {
            this.$board.dispatchEvent(new CustomEvent('clear'));
            return;
        }

        this.board.createNode();
        for (let $child of this.$childrens) {
            this.$board.removeChild($child);
        }

        this.$childrens = this.createChildrens();
        this.appendChildrens(this.$childrens);
    }

    pressDown() {
        if (this.board.down() === false) {
            if (this.board.isFull()) {
                this.$board.dispatchEvent(new CustomEvent('die'));
            }

            return;
        }

        if (this.board.isFull()) {
            this.$board.dispatchEvent(new CustomEvent('die'));
            return;
        }

        if (this.board.max() === 2048) {
            this.$board.dispatchEvent(new CustomEvent('clear'));
            return;
        }

        this.board.createNode();
        for (let $child of this.$childrens) {
            this.$board.removeChild($child);
        }

        this.$childrens = this.createChildrens();
        this.appendChildrens(this.$childrens);
    }
}