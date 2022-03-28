export default class Board {
    constructor (board_size) {
        this.sz = board_size;
        this.board = new Array(board_size);
        for (let i = 0; i < board_size; i++) {
            this.board[i] = new Array(board_size).fill(0);
        }

        this.createNode();
        this.createNode();
    }

    static newNodeNumber() {
        return (Math.random() < 0.9) ? 2 : 4;
    }

    selectRandomPos() {
        return [Math.floor(Math.random() * this.sz), Math.floor(Math.random() * this.sz)];
    }

    selectEmptyRandomPos() {
        while (true) {
            const [y, x] = this.selectRandomPos();
            if (this.board[y][x] === 0) {
                return [y, x];
            }
        }
    }

    createNode() {
        const [y, x] = this.selectEmptyRandomPos();
        this.board[y][x] = Board.newNodeNumber();
    }

    isFull() {
        for (let y = 0; y < this.sz; ++y) {
            for (let x = 0; x < this.sz; ++x) {
                if (this.board[y][x] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    max() {
        let result = 0;
        for (let y = 0; y < this.sz; ++y) {
            for (let x = 0; x < this.sz; ++x) {
                if (this.board[y][x] > result) {
                    result = this.board[y][x];
                }
            }
        }
        return result;
    }

    getNodes() {
        let result = [];

        for (let y = 0; y < this.sz; ++y) {
            for (let x = 0; x < this.sz; ++x) {
                if (this.board[y][x] !== 0) {
                    result.push({ y, x, 'value':this.board[y][x] });
                }
            }
        }

        return result;
    }

    pushUp() {
        let moved = false;
        for (let x = 0; x < this.sz; ++x) {
            for (let target_y = 1; target_y < this.sz; ++target_y) {
                for (let dest_y = target_y - 1; dest_y >= 0; --dest_y) {
                    if (this.board[dest_y][x] !== 0) {
                        break;
                    }
                    
                    moved = true;
                    this.board[dest_y][x] = this.board[dest_y + 1][x];
                    this.board[dest_y + 1][x] = 0;
                }
            }
        }
        return moved;
    }

    pushDown() {
        let moved = false;
        for (let x = 0; x < this.sz; ++x) {
            for (let target_y = this.sz - 2; target_y >= 0; --target_y) {
                for (let dest_y = target_y + 1; dest_y < this.sz; ++dest_y) {
                    if (this.board[dest_y][x] !== 0) {
                        break;
                    }

                    moved = true;
                    this.board[dest_y][x] = this.board[dest_y - 1][x];
                    this.board[dest_y - 1][x] = 0;
                }
            }
        }
        return moved;
    }

    pushLeft() {
        let moved = false;
        for (let y = 0;y < this.sz; ++y) {
            for (let target_x = 1; target_x < this.sz; ++target_x) {
                for (let dest_x = target_x - 1; dest_x >= 0; --dest_x) {
                    if (this.board[y][dest_x] !== 0) {
                        break;
                    }

                    moved = true;
                    this.board[y][dest_x] = this.board[y][dest_x + 1];
                    this.board[y][dest_x + 1] = 0;
                }
            }
        }
        return moved;
    }

    pushRight() {
        let moved = false;
        for (let y = 0;y < this.sz; ++y) {
            for (let target_x = this.sz - 2; target_x >= 0; --target_x) {
                for (let dest_x = target_x + 1; dest_x < this.sz; ++dest_x) {
                    if (this.board[y][dest_x] !== 0) {
                        break;
                    }

                    moved = true;
                    this.board[y][dest_x] = this.board[y][dest_x - 1];
                    this.board[y][dest_x - 1] = 0;
                }
            }
        }
        return moved;
    }

    up() {
        let moved = this.pushUp();

        for (let x = 0; x < this.sz; ++x) {
            for (let y = 0; y < this.sz - 1; ++y) {
                if (this.board[y][x] === this.board[y + 1][x]) {
                    this.board[y][x] *= 2;
                    this.board[y + 1][x] = 0;
                    moved = true;
                }
            }
        }

        moved |= this.pushUp();
        return moved;
    }

    down() {
        let moved = this.pushDown();

        for (let x = 0; x < this.sz; ++x) {
            for (let y = this.sz - 1; y > 0; --y) {
                if (this.board[y][x] === this.board[y - 1][x]) {
                    this.board[y][x] *= 2;
                    this.board[y - 1][x] = 0;
                    moved = true;
                }
            }
        }

        moved |= this.pushDown();
        return moved;
    }

    left() {
        let moved = this.pushLeft();

        for (let y = 0; y < this.sz; ++y) {
            for (let x = 0; x < this.sz - 1; ++x) {
                if (this.board[y][x] === this.board[y][x + 1]) {
                    this.board[y][x] *= 2;
                    this.board[y][x + 1] = 0;
                    moved = true;
                }
            }
        }

        moved |= this.pushLeft();
        return moved;
    }

    right() {
        let moved = this.pushRight();

        for (let y = 0; y < this.sz; ++y) {
            for (let x = this.sz - 1; x > 0; --x) {
                if (this.board[y][x] === this.board[y][x - 1]) {
                    this.board[y][x] *= 2;
                    this.board[y][x - 1] = 0;
                    moved = true;
                }
            }
        }

        moved |= this.pushRight();
        return moved;
    }
}