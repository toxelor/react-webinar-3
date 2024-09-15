/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */

  getUniqueCode = () => {
    const codes = []
    this.state.list.map((item) => !codes.includes(item.code) && codes.push(item.code))
    let newCode = this.state.nextCode
    while (codes.includes(newCode)) {
      newCode++
    }
    this.setState({
      ...this.state,
      nextCode: newCode,
    });
  }
  addItem() {
    this.getUniqueCode()
    this.setState({
      ...this.state,
      //nextCode: this.state.nextCode <= this.state.list.length ? this.state.list.length + 1 : this.state.nextCode + 1,
      list: [...this.state.list, {code: this.state.nextCode, title: 'Новая запись', selectedCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.getUniqueCode()
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          !item.selected && item.selectedCount++;
          item.selected = !item.selected;
          console.log(item.selectedCount)
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
