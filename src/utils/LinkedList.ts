class LinkedNode<T> {
    value: T;
    next: LinkedNode<T> | null = null;
    prev: LinkedNode<T> | null = null;
    constructor(value: T) {
        this.value = value;
    }
}


export class LinkedList<T> {
    // 头指针
    private head: LinkedNode<T> | null = null;
    // 尾指针
    private tail: LinkedNode<T> | null = null;
    // 链表长度
    private length: number = 0;
    constructor(source: T[] = []) {
        source.forEach(item => {
            this.append(item)
        })
    }
    append(value: T): void {
        const newNode = new LinkedNode(value);
        // 如果当前尾节点为null，则说明当前链表为空，将头指针和尾指针指向新节点
        if (this.tail === null) {
            //  头节点 = 尾节点 = 新节点
            this.head = this.tail = newNode
            // 头节点的next = 头节点
            this.head.next = this.head
            // 尾节点的prev = 尾节点
            this.tail.prev = this.tail
            // 如果当前尾节点不为null，则说明当前链表不为空
        } else {
            // 新节点的prev指向尾节点
            newNode.prev = this.tail;
            // 将尾节点指向新节点 实现头尾相连
            newNode.next = this.head;
            // 将尾节点的next指向新节点
            this.tail.next = newNode;
            // 将尾指针指向新节点
            this.tail = newNode;
        }
        this.length++
    }
    unshift(value: T): void {
        if (!this.head) {
            this.append(value)
        } else {
            const newNode = new LinkedNode(value);
            newNode.next = this.head;
            newNode.prev = this.tail;
            this.head.prev = newNode;
            this.head = newNode;
            this.length++
        }
    }
    remove(index: number) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        // 要移除的目标节点
        let target: LinkedNode<T> | null = null;
        if (index < this.length / 2) {
            target = this.head
            // 从前往后找直到 index
            for (let i = 0; i < index; i++) {
                target = target!.next
            }
        } else {
            // 从后往前找直到 index
            target = this.tail
            for (let i = this.length - 1; i > index; i--) {
                target = target!.prev
            }
        }
        // 若果目标节点的上一个节点不为null，则将上一个节点的next指向当前节点的next
        if (target!.prev) {
            target!.prev.next = target!.next
        } else {
            // 如果目标节点的上一个节点为null，则说明目标节点为头节点，将头指针指向当前节点的next
            this.head = target!.next
        }

    }
    [Symbol.iterator]() {
        let current = this.head
        let firstPass = true
        return {
            next: () => {
                if (!current || (!firstPass && current === this.tail)) {
                    return { done: true, value: null }
                }
                const value = current.value
                current = current.next
                firstPass = false
                return {
                    done: false,
                    value
                }


            }
        }
    }

}